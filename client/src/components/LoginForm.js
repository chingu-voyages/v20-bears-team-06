import React from "react";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import { GET_ME } from "../graphql/Queries";
import { LOGIN_MUTATION } from "../graphql/Mutations";
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
import { TextInputField } from "./fields/TextInputField";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    [theme.breakpoints.up("md")]: {
      height: theme.spacing(4),
    },
  },
}));

export const LoginForm = ({ isLoggedIn, setLoggedIn }) => {
  const [login] = useMutation(LOGIN_MUTATION);
  const client = useApolloClient();

  const classes = useStyles();
  let history = useHistory();
  console.log(history);
  const { data } = useQuery(GET_ME);

  function returnHome() {
    const link = <Link to={'/'} />;
    link.style.display='hidden';
    link.click();

    //history.push("/");
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
            Sign in
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email address").required(),
              password: Yup.string().required("Please Enter your password"),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              setTimeout(async () => {
                try {
                  const response = await login({
                    variables: {
                      email: values.email,
                      password: values.password,
                    },
                  });
                  if (response && response.data && !response.data.login) {
                    setFieldError(
                      "password",
                      "Incorrect email and/or password"
                    );
                    return;
                  }
                  if (response && response.data && response.data.login) {
                    setLoggedIn(true);
                    client.writeData({
                      data: { me: response.data.login },
                    });
                    returnHome();
                  }
                } catch (e) {
                  console.log("error with login", e);
                }
              }, 400);
            }}
          >
            <Form className={classes.form} noValidate>
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="email@email.com"
                variant="outlined"
                autoFocus
                fullWidth
                id="email"
                as={TextInputField}
              />
              <Field
                className={classes.input}
                size="small"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                as={TextInputField}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </Container>
    );
  }
};
