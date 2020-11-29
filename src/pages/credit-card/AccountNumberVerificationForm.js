import React from "react";
import { Button } from "react-bootstrap";
import Input from "../../components/form/Input";

const AccountNumberVerificationForm = ({
  handleChange,
  values,
  // error,
  handleBlur,
  disabled,
  accountNumberVerificationResponse,
  verifyAccountNumber,
  isAccountNumberVerificationSuccessful,
}) => {
  return (
    <div className="account-verification">
      {!disabled ? (
        <div className="section-block">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title"> Card Profiling </h4>

                  <div className="form-group">
                    <Input
                      label="Account Number"
                      type="text"
                      className="form-control"
                      id="username"
                      name="accountNumber"
                      value={values.accountNumber || ""}
                      placeholder="Enter account number"
                      handleInputChange={handleChange}
                      disabled={disabled}
                      handleBlur={handleBlur}
                      // error={error.accountNumber}
                    />
                  </div>
                  <>
                    <Button
                      className="btn btn-primary"
                      style={{ marginRight: 10 }}
                      onClick={verifyAccountNumber}
                    >
                      Verify Account Number
                    </Button>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-group">
          <Input
            label="Account Number"
            type="text"
            className="form-control"
            id="username"
            name="accountNumber"
            value={values.accountNumber || ""}
            placeholder="Enter account number"
            handleInputChange={handleChange}
            disabled={disabled}
            size={4}
          />
        </div>
      )}

      {isAccountNumberVerificationSuccessful && (
        <>
          <header className="h6 mt-4">Account Details</header>
          <div className="form-row">
            {accountNumberVerificationResponse.map((element) => (
              <Input
                key={element.name}
                name={element.name}
                type={element.type}
                label={element.label}
                defaultValue={element.defaultValue}
                size={element.size || 4}
                disabled
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountNumberVerificationForm;
