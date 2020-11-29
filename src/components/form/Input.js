import React from "react";
import PropTypes from "prop-types";

const Input = ({
  size,
  label,
  value,
  disabled,
  type,
  error,
  name,
  handleInputChange,
  handleBlur,
  ...props
}) => {
  return (
    <div className={`col-md-${size}`} style={{ paddingBottom: 10 }}>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        disabled={disabled}
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        {...props}
      />
      <div className="invalid-feedback d-block">{error} </div>
    </div>
  );
};

Input.defaultProps = {
  handleBlur: () => {},
};

Input.propTypes = {
  handleBlur: PropTypes.func,
};

export default Input;
