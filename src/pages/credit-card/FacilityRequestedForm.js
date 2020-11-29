import React from "react";
import FormElements from "../../components/form/FormElements";
import { additionalInformation } from "./formConfigs";

const FacilityRequestedForm = ({ handleChange, customerType, values, disabled }) => {
  const removeBankStatementFromForm = additionalInformation.filter(
    (item) => item.name !== "bank-statement"
  );

  const renderForm = (formConfig) => (
    <>
      {formConfig.map((element) => (
        <FormElements
          key={element.name}
          name={element.name}
          value={values[element.name] || ''}
          type={element.type}
          label={element.label}
          size={element.size || 4}
          options={element.options}
          defaultOption={element.defaultOption}
          handleChange={handleChange}
          disabled={disabled}
        />
      ))}
    </>
  );
  return (
    <div className="page-section">
      <header className="h6 mt-4">Facility Details</header>
      <div className="form-row">
        {customerType === "staff"
          ? renderForm(removeBankStatementFromForm)
          : renderForm(additionalInformation)}
      </div>
    </div>
  );
};

export default FacilityRequestedForm;
