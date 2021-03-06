import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import { weirdRouter } from '../utils/weirdRouter';
//Redirect conditional for usage with submitForm
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { REGISTER_MUTATION } from "../graphql/Mutations";
import { LOGIN_MUTATION } from "../graphql/Mutations";

import { TextInputField } from "./fields/TextInputField";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("Please enter your first name")
    .min(2, "Please enter a first name between 2 and 25 characters")
    .max(25, "Please enter a first name between 2 and 25 characters"),
  lastName: Yup.string()
    .required("Please enter your last name")
    .min(2, "Please enter a last name between 2 and 25 characters")
    .max(25, "Please enter a last name between 2 and 25 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Please enter a valid password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please enter a valid password"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const RegistrationForm = ({ isLoggedIn, setLoggedIn }) => {
  //For Router, add reference for *confirmed = useState
  const [register] = useMutation(REGISTER_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);

  const classes = useStyles();
  let history = useHistory();

  function returnHome() {
    weirdRouter("/")
  }
  if (isLoggedIn) {
    console.log("redirecting");
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              setTimeout(async () => {
                try {
                  const response = await register({
                    variables: {
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.email,
                      password: values.password,
                    },
                  });
                  console.log(response);
                  const responseLogin = await login({
                    variables: {
                      email: values.email,
                      password: values.password,
                    },
                  });
                  console.log(responseLogin);
                  setLoggedIn(true);
                  returnHome();
                } catch (e) {
                  console.log(e);
                  if (
                    e.graphQLErrors &&
                    e.graphQLErrors[0].extensions.exception.validationErrors[0]
                      .constraints.IsEmailAlreadyExistConstraint
                  ) {
                    setFieldError(
                      "email",
                      e.graphQLErrors[0].extensions.exception
                        .validationErrors[0].constraints
                        .IsEmailAlreadyExistConstraint
                    );
                  } else {
                    setFieldError("confirmPassword", "Unable to Register User");
                  }

                  console.log("error with registration", JSON.stringify(e));
                }
              }, 400);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="john"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextInputField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="doe"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextInputField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="email@email.com"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextInputField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="password"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextInputField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="confirm password"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextInputField}
                    />
                  </Grid>
                </Grid>
                <Button
                  className={classes.submit}
                  disabled={isSubmitting}
                  variant="contained"
                  fullWidth
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link component={RouterLink} to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
};
