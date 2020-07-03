import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

export const TextAreaField = ({label, placeholder, type, ...props}) => {

    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return(
        <div className="text-input-field">
            <TextField
                placeholder = {placeholder}
                label = {label}
                type = {type}
                multiline
                {...field}
                {...props}
                helperText = {errorText}
                error={!!errorText}
             />
        </div>
    )
;}