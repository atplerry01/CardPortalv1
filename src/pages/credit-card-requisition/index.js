import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "react-bootstrap";
import ContentHeader from "../../components/ContentHeader";
import AccountNumberVerificationForm from "./AccountNumberVerificationForm";
import FacilityRequestedForm from "./FacilityRequestedForm";
import CustomerTypeForm from "./CustomerTypeForm";
import { accountNumberVerificationResponse } from "./formConfigs";
// import GetOfferLetterForm from "./GetOfferLetterForm";

const CreditCardRequisition = ({ history }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerType] = useState("corporate");
  const [totalSteps, setTotalStep] = useState(4);

  const [values, setValues] = useState({});

  useEffect(() => {
    if (customerType !== "staff") {
      setTotalStep(3);
    }
  }, [customerType]);

  const handleChange = ({ target }) => {
    if (target.type === "file") {
      setValues((values) => ({
        ...values,
        [target.name]: target.files,
      }));
    } else {
      setValues((values) => ({
        ...values,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = () => {
    history.push("/cards/credit-card-request/pending-requests");
    console.log(values, "values");
  };

  const previousStep = () => {
    let step = currentStep <= 1 ? 1 : currentStep - 1;
    setCurrentStep(step);
  };

  const nextStep = () => {
    let step = currentStep >= 3 ? totalSteps : currentStep + 1;
    setCurrentStep(step);
  };

  const renderPreviousBtn = () => {
    if (currentStep !== 1) {
      return (
        <Button
          className={currentStep > 1 ? "mr-4" : "mr-0"}
          onClick={previousStep}
        >
          Previous
        </Button>
      );
    }

    return null;
  };

  const renderSaveAndContinueBtn = () => {
    return (
      <Button onClick={currentStep === totalSteps ? handleSubmit : nextStep}>
        {currentStep === totalSteps ? "Submit" : "Save and Continue"}
      </Button>
    );
  };

  return (
    <>
      <ContentHeader
        title={
          currentStep === totalSteps
            ? "Credit Card Requisition(PREVIEW)"
            : "Credit Card Requisition"
        }
      />

      <CSSTransition
        in={currentStep === 1}
        timeout={{ appear: 1000, enter: 300, exit: 100 }}
        classNames={"animate"}
        appear={true}
        unmountOnExit={true}
      >
        <AccountNumberVerificationForm
          handleChange={handleChange}
          values={values}
          accountNumberVerificationResponse={accountNumberVerificationResponse}
        />
      </CSSTransition>

      <CSSTransition
        in={currentStep === 2}
        timeout={{ appear: 300, enter: 300, exit: 100 }}
        classNames={"animate"}
        unmountOnExit={true}
      >
        <CustomerTypeForm
          currentStep={currentStep}
          customerType={customerType}
          handleChange={handleChange}
          values={values}
        />
      </CSSTransition>

      {customerType === "retail" && (
        <CSSTransition
          in={currentStep === 3}
          timeout={{ appear: 1000, enter: 300, exit: 100 }}
          classNames={"animate"}
          unmountOnExit={true}
        >
          <FacilityRequestedForm
            handleChange={handleChange}
            customerType={customerType}
            values={values}
          />
        </CSSTransition>
      )}

      <CSSTransition
        in={currentStep === totalSteps}
        timeout={{ appear: 1000, enter: 300, exit: 100 }}
        classNames={"animate"}
        unmountOnExit={true}
      >
        {/* <GetOfferLetterForm handleChange={handleChange} values={values} /> */}
        <div>
          <AccountNumberVerificationForm values={values} disabled={true} />
          <CustomerTypeForm
            currentStep={currentStep}
            customerType={customerType}
            disabled={true}
            values={values}
          />
          {customerType === "retail" && (
            <FacilityRequestedForm
              disabled={true}
              customerType={customerType}
              values={values}
            />
          )}
        </div>
      </CSSTransition>

      <div className="mt-4 w-auto float-right">
        {renderPreviousBtn()}
        {renderSaveAndContinueBtn()}
      </div>
    </>
  );
};

export default CreditCardRequisition;
