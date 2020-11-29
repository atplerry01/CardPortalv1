import React from "react";
import SelectInput from "./SelectInput";
import Input from "./Input";

const FormElements = ({
  name,
  label,
  defaultOption,
  options,
  size,
  value,
  disabled,
  type,
  error,
  handleChange,
  ...props
}) => {
  const renderFormElement = () => {
    switch (type) {
      case "dropdown":
        return (
          <SelectInput
            name={name}
            label={label}
            value={value}
            defaultOption={defaultOption}
            error={error}
            options={options}
            onChange={handleChange}
            size={size}
            disabled={disabled}
          />
        );
      case "file":
        return (
          <Input
          label={label}
          type={type}
          name={name}
          id={name}
          className="form-control"
          disabled={disabled}
          error={error}
          handleInputChange={handleChange}
          size={size}
          accept=".jpeg, .pdf"
          {...props}
        />
        );
      default:
        return (
          <Input
            label={label}
            type={type}
            name={name}
            value={value}
            className="form-control"
            disabled={disabled}
            error={error}
            handleInputChange={handleChange}
            size={size}
            {...props}
          />
        );
    }
  };
  return <>{renderFormElement()}</>;
};

export default FormElements;
