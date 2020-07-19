import React from "react";
import { FieldProps } from "formik";

export const InputField = (field, form, ...props) => {
  return (
    <div>
      <input {...field} {...props} />
    </div>
  );
};