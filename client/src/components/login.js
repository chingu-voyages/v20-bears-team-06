import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInputField } from "./fields/TextInputField";
import { useHistory } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
    }
  }
`;

export const Login = () => {
  const [login] = useMutation(LOGIN_MUTATION);
  let history = useHistory();

  return (
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
      onSubmit={(values, { setSubmitting, setStatus }) => {
        setTimeout(async () => {
          console.log(values);
          const response = await login({
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          if (response && response.data && !response.data.login) {
            setStatus({
              email: "invalid login",
            });
            console.log("error with login");
            return;
          }
          console.log(response);
          history.push("/");
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
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
