import React from "react";

export const InputField = (field, form, ...props) => {
  return (
    <div>
      <input {...field} {...props} />
    </div>
  );
};
