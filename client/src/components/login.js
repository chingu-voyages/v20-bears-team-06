import React from "react";
import { Formik } from "formik";
import EmailValidator from "email-validator";
import Yup from "yup";

export default class ValidatedLoginForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Validated Form Component</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log("Logging in", values);
              setSubmitting(false);
            }, 500);
          }}
        >
          <h1>Validated Login Form</h1>
        </Formik>
      </div>
    );
  }
}
