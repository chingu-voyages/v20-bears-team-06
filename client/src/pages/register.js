import React from "react";
import { Formik, Field } from "formik";
import { InputField } from "../components/fields/InputField";

export default () => {
  return (
    <div>
      <Formik
        onSubmit={(data) => {
          console.log(data);
        }}
        initialValues={{ email: "", firstName: "", lastName: "", password: "" }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="firstName"
              placeholder="firstName"
              component={InputField}
            />
            <Field
              name="lastName"
              placeholder="lastName"
              component={InputField}
            />
            <Field name="email" placeholder="email" component={InputField} />
            <Field
              name="password"
              placeholder="password"
              type="password"
              component={InputField}
            />
            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};
