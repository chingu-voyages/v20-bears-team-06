import React from "react";
import { Formik, Form } from "formik";
import { TextInputField } from "../components/fields/TextInputField";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";

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

const RegisterPage = () => {
  const [register, { data }] = useMutation(REGISTER_MUTATION);
  let history = useHistory();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required(),
        password: Yup.string().required("Please Enter your password"),
      })}
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
          history.push("/");
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <TextInputField
          label="First Name"
          name="firstName"
          type="text"
          placeholder="john"
        />
        <TextInputField
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="doe"
        />
        <TextInputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="email@email.com"
        />
        <TextInputField
          label="Password"
          name="password"
          type="password"
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default RegisterPage;
