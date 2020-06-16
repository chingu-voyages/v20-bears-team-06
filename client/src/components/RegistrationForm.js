import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { gql } from "apollo-boost";

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
});

const REGISTER_MUTATION = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

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

export const RegistrationForm = () => {
  const [register, { data }] = useMutation(REGISTER_MUTATION);
  const classes = useStyles();
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
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              console.log(values);
              const response = await register({
                variables: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                },
              });
              console.log(response);
              setSubmitting(false);
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
                    as={TextInputField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="doe"
                    as={TextInputField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="email@email.com"
                    as={TextInputField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="password"
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
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
