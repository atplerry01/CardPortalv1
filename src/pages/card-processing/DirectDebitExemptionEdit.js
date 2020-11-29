import moment from "moment";
import React, { Component } from "react";
import ContentHeader from "../../components/ContentHeader";
import { cardService } from "../../services/cards";

export default class DirectDebitExemptionEdit extends Component {
  state = {
    cardAccountNo: "",
    reason: "",
    startDate: "",
    endDate: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async () => {
    const { cardAccountNo, reason, startDate, endDate } = this.state;
    const body = {
      cardAccountNo,
      reason,
      startDate,
      endDate,
    };

    const res = await this.addCreditCardExemption(body);

    this.props.history.push(`/cards/direct-debit-exemptions`);
  };

  render() {
    const { cardAccountNo, reason, startDate, endDate } = this.state;

    return (
      <div>
        <ContentHeader title="Add Credit Cards Exemption" />
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <label htmlFor="cardAccountNo">Card Account Number</label>
                <input
                  htmlFor="cardAccountNo"
                  type="text"
                  value={cardAccountNo}
                  className="form-control"
                  name="cardAccountNo"
                  required
                  onChange={this.onChange}
                />
              </div>

              <div className="col">
                <label htmlFor="custname">Reason</label>
                <input
                  htmlFor="reason"
                  type="text"
                  value={reason}
                  maxLength="30"
                  className="form-control"
                  name="reason"
                  required
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="startDate">Start Date</label>
                <input
                  htmlFor="startDate"
                  type="date"
                  value={startDate}
                  min={moment().format("YYYY-MM-DD")}
                  className="form-control"
                  name="startDate"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="endDate">End Date</label>
                <input
                  htmlFor="endDate"
                  type="date"
                  value={endDate}
                  min={moment().format("YYYY-MM-DD")}
                  className="form-control"
                  name="endDate"
                  required
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="mt-1">
                  <button
                    className="btn btn-primary mt-4"
                    onClick={this.onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  addCreditCardExemption = async (body) => {
    const resp = await cardService.addCreditCardExemption(body);
    //console.log("submit", resp, body);
  };
}

