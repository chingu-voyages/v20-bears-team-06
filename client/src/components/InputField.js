import React from "react";
import { FieldProps } from "formik";

export const InputField = (field, form, ...props) => {
  console.log(field);
  console.log(props);
  return (
    <div>
      <input {...field} {...props} />
    </div>
  );
};