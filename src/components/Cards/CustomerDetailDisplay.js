import React, { Component } from "react";

export default class CustomerDetailDisplay extends Component {
  render() {
    const { customerDetails } = this.props;

    return (
      <div className="card-body">
        <h4 className="card-title"> Customer Details </h4>
        <form className="needs-validation" noValidate="">
          <div className="form-row">
            <div className="col-md-2 mb-3">
              <label htmlFor="firstName">Account CIF</label>
              <input
                type="text"
                value={customerDetails.cif || ""}
                className="form-control"
                id="firstName"
                required=""
                disabled
              />
              <div className="invalid-feedback">
                {" "}
                Valid first name is required.{" "}
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="lastName">Mobile Number</label>
              <input
                type="text"
                value={customerDetails.mobileNumber || ""}
                className="form-control"
                id="lastName"
                required=""
                disabled
              />
              <div className="invalid-feedback">
                {" "}
                Valid last name is required.{" "}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Address</label>
              <input
                type="text"
                value={customerDetails.address || ""}
                className="form-control"
                id="lastName"
                required=""
                disabled
              />
              <div className="invalid-feedback">
                {" "}
                Valid last name is required.{" "}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
