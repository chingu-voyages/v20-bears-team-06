import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
export const TextInputField = ({ label, placeholder, type, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div className="text-input-field">
      <TextField
        size='small'
        placeholder={placeholder}
        label={label}
        type={type}
        {...field}
        {...props}
        helperText={errorText}
        error={!!errorText}
      />
    </div>
  );
};
