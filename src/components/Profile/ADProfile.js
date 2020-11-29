

import React, { Component } from "react";

export default class ADProfile extends Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: {
        fullName: ''
      }
    };

  }

  // componentDidMount() {
  //   const { profile } = this.props;
  //   this.setState({ profileDetails: profile });
  // }

  render() {
    const { profile } = this.props;

    return (
      <div className="card-body">
        <h4 className="card-title"> User Details </h4>
        <form className="needs-validation" noValidate="">
          <div className="form-row">

            <div className="col-md-4 mb-4">
              <label htmlFor="firstName">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required=""
                value={profile ? profile.fullName : ""}
                disabled
              />
              <div className="invalid-feedback">
                {" "}
                Valid first name is required.{" "}
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <label htmlFor="firstName">Username</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required=""
                value={profile ? profile.userName : ""}
                disabled
              />
              <div className="invalid-feedback">
                {" "}
                Valid first name is required.{" "}
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <label htmlFor="firstName">Email</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required=""
                value={profile ? profile.email : ""}
                disabled
              />
              <div className="invalid-feedback">
                {" "}
                Valid first name is required.{" "}
              </div>
            </div>

          </div>
          <div className="form-row">
            <div className="col-md-2 mb-3">
              <label htmlFor="firstName">Branch</label>
              <input
                type="text"
                value={profile ? profile.branch : ""}
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

            <div className="col-md-10 mb-10">
              <label htmlFor="lastName">Department</label>
              <input
                type="text"
                value={profile ? profile.department : ""}
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
