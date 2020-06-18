import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInputField } from "../components/fields/TextInputField";
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
