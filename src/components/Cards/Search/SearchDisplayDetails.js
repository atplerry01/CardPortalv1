import React, { Component } from "react";

export default class SearchDisplayDetails extends Component {
  render() {
    const { searchDetail } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title"> Card Details </h4>
          <form className="needs-validation" noValidate="">
            <div className="form-row">
              <div className="col-md-8 mb-3">
                <label htmlFor="lastName">Card Name</label>
                <input
                  type="text"
                  value={searchDetail.name}
                  className="form-control"
                  id="lastName"
                  disabled
                  required=""
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="lastName">Card Product</label>
                <input
                  htmlFor="text"
                  value={searchDetail.cardProduct}
                  className="form-control"
                  id="lastName"
                  required=""
                  disabled
                />
              </div>

              <div className="col-md-6 mb-12">
                <label htmlFor="lastName">Masked Pan</label>
                <input
                  htmlFor="text"
                  value={searchDetail.maskedPAN}
                  className="form-control"
                  id="lastName"
                  required=""
                  disabled
                />
              </div>
              <div className="col-md-2 mb-12">
                <label htmlFor="lastName">Expiry Date</label>
                <input
                  htmlFor="text"
                  value={searchDetail.expiryDate}
                  className="form-control"
                  id="lastName"
                  required=""
                  disabled
                />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="lastName">Card Status</label>
                <input
                  htmlFor="text"
                  value={searchDetail.cardStatus}
                  className="form-control"
                  id="lastName"
                  required=""
                  disabled
                />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="lastName">Currency</label>
                <input
                  htmlFor="text"
                  value={searchDetail.currency}
                  className="form-control"
                  id="lastName"
                  required=""
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
