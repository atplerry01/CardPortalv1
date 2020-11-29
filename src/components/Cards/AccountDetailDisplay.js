import React, { Component } from "react";
import { accountTypeFormatter } from "../../services/selector/account-type-formatter";

export default class AccountDetailDisplay extends Component {
  render() {
    const { accountDetail } = this.props;

    return (
      <div className="card-body">
        <h4 className="card-title"> Account Details </h4>
        <form className="needs-validation" noValidate="">
          <div className="form-row">
            <div className="col-md-8 mb-3">
              <label htmlFor="lastName">Account Name</label>
              <input type="text"
                value={accountDetail.accountName}
                className="form-control" id="lastName" disabled required="" />
              <div className="invalid-feedback">
                {" "}
                Valid last name is required.{" "}
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="lastName">Account Type</label>
              <input
                htmlFor="text"
                value={accountTypeFormatter(accountDetail.accountType)}
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



            <div className="col-md-6 mb-12">
              <label htmlFor="lastName">Account BranchName</label>
              <input
                htmlFor="text"
                value={accountDetail.accountBranchName}
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
            <div className="col-md-3 mb-12">
              <label htmlFor="lastName">Account Scheme Code</label>
              <input
                htmlFor="text"
                value={accountDetail.schemeCode}
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
            <div className="col-md-3 mb-3">
              <label htmlFor="lastName">Account Sol</label>
              <input
                htmlFor="text"
                value={accountDetail.accountSol}
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
