import React, { Component } from "react";
import SelectInput from "../form/SelectInput";

export default class HotListReason extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    this.props.handleSubmit(this.state);
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { reasons } = this.props;
    const { hotlistReason, comment } = this.state;

    const dropCardProducts = () => {
      if (reasons) {
        return (
          <SelectInput
            label="Hotlist Reason"
            name="hotListReason"
            value={hotlistReason}
            onChange={this.handleChange}
            defaultOption="Select Hotlist Reason"
            options={reasons}
          />
        );
      }
    };

    return (
      <>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title"> Reason for Card Hotlist </h4>

            <div className="form-group">{dropCardProducts()}</div>

            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                name="comment"
                value={comment || ""}
                onChange={this.handleChange}
                placeholder="Comment your reason"
                required=""
              ></textarea>

              <div className="invalid-feedback">
                {" "}
                Your Account Number is required.{" "}
              </div>
            </div>

            <div className="el-example">
              <button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={this.handleSubmit.bind(this)}
                disabled={!this.state.comment && !this.state.hotlistReason}
              >
                Hotlist
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
