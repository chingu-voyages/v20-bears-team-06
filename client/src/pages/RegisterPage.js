import React from "react";

import { RegistrationForm } from "../components/RegistrationForm";

const RegisterPage = ({ setLoggedIn, isLoggedIn }) => {
  return (
    <div className="register-page">
      <RegistrationForm setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default RegisterPage;
