import React from "react";
import FormElements from "../../components/form/FormElements";
import { accountDetails } from "./formConfigs";
const AccountDetailsForm = ({ currentStep, handleChange, values, disabled }) => {
  return (
    <>
      {/* {currentStep === 2 && ( */}
      <div className="account-details">
        <header className="h6 mt-4">Additional Details</header>

        <div className="form-row">
          {accountDetails.map((element) => (
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
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default AccountDetailsForm;
