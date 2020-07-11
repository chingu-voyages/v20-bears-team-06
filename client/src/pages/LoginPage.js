import React from "react";
import "./loginpage.scss";
import { LoginForm } from "../components/LoginForm";

const LoginPage = ({ setLoggedIn, isLoggedIn, setMeId }) => {
  return (
    <div className="login-page">
      <LoginForm setLoggedIn={setLoggedIn}  isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default LoginPage;
