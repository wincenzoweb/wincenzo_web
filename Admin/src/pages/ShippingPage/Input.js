import React from "react";

export const Input = ({ type, placeholder, onChange, value }) => {
  const eachInput = {
    width: "20rem",
    border: "1px solid lightgray",
    padding: "0.8rem",
    marginBottom: "0.8rem"
  };
  return (
    <input
      style={eachInput}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
