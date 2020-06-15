import React from "react";
import { Formik, Form, useField } from "formik";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { TextInputField } from "./fields/TextInputField";

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  /** ... * /
`;

const StyledErrorMessage = styled.div`
  /** ... * /
`;

const StyledLabel = styled.label`
 /** ...* /
`;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
export const RegisterForm = () => {
  return (
    <>
      <h1>Register</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string().email("Invalid email address").required(),
          password: Yup.string()
            .required("Please Enter your password")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <TextInputField
            label="First Name"
            name="firstName"
            type="text"
            placeholder="first name"
          />
          <TextInputField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="last name"
          />
          <TextInputField
            label="Email Address"
            name="email"
            type="email"
            TextInputField="email@email.com"
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
    </>
  );
};
