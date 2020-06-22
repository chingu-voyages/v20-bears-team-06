import React from "react";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInputField } from "../components/fields/TextInputField";
import { useHistory } from "react-router-dom";
import "./loginpage.scss";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
