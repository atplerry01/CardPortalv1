import React from "react";
import { Button } from "react-bootstrap";
import Input from "../../components/form/Input";
import { additionalInformation } from "./formConfigs";

const GetOfferLetterForm = ({ currentStep, handleChange, values }) => {
  const entries = Object.entries(values);
  const convertedValues = [];
  entries.forEach((entity) => {
    convertedValues.push({ [entity[0]]: entity[1] });
  });

  const copy = additionalInformation.slice();

  const final = copy.map((entity) => {
    // if (entity.name === values[entity.name]) {
    //   // Object.assign(entity.name, values[entity.name])
    //   console.log(values[entity.name]);
    // }
    entity.name = values[entity.name];
    // console.log(values[entity.name]);
    return entity;
  });
  // const final = [...copy, ...convertedValues];
  console.log(final);
  return (
    <div className="account-verification">
      <div className="section-block">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title"> Offer Letter </h4>

                <div className="form-group">
                  <Input
                    label="Reference Number"
                    type="text"
                    className="form-control"
                    defaultValue="0345-74383ghj7sf"
                    name="reference-no"
                    placeholder="Enter reference number"
                    handleInputChange={handleChange}
                  />
                </div>
                <>
                  <Button
                    className="btn btn-primary"
                    style={{ marginRight: 10 }}
                  >
                    Get Offer Letter
                  </Button>
                </>
              </div>
            </div>
          </div>
          <div className="col-xl-8"></div>
        </div>
      </div>
    </div>
  );
};

export default GetOfferLetterForm;
