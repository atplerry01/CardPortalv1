import React from "react";
import Input from "../../components/form/Input";
import FormElements from "../../components/form/FormElements";
import {
  customerType as customerTypeForm,
  additionalInformation,
} from "./formConfigs";
import AccountDetailsForm from "./AccountDetailsForm";
import FacilityRequestedForm from "./FacilityRequestedForm";

const CustomerTypeForm = ({
  currentStep,
  customerType,
  handleChange,
  values,
  disabled,
}) => {
  const renderHeaderTitle = () => {
    switch (customerType) {
      case "staff":
        return "Staff ID";
      case "corporate":
        return "Company Details";
      default:
        return "Income Details";
    }
  };
  return (
    <>
      <div className="page-section">
        <header className="h6 mt-4">{renderHeaderTitle()}</header>
        <div className="form-row">
          {customerTypeForm[customerType].map((element) => (
            <FormElements
              key={element.name}
              name={element.name}
              type={element.type}
              multiple={element.multiple}
              value={values[element.name] || ""}
              label={element.label}
              size={element.size || 4}
              options={element.options}
              defaultOption={element.defaultOption}
              handleChange={handleChange}
              disabled={disabled}
            />
          ))}
          {customerType === "retail" && (
            <AccountDetailsForm handleChange={handleChange} values={values} disabled={disabled} />
          )}
          {customerType !== "retail" && (
            <FacilityRequestedForm
              handleChange={handleChange}
              customerType={customerType}
              values={values}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerTypeForm;
