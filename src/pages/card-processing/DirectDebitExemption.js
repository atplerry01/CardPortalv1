
import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ContentHeader from "../../components/ContentHeader";
import { cardService } from "../../services/cards";

export class DirectDebitExemption extends Component {
  state = {
    getExemptions: [],
  };
  async componentDidMount() {
    await this.getCreditCardExemptions();
  }

  onDeleteClick = async (cardAccountNo) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "purple",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then(async (result) => {
      if (result.value) {
        // const route = this.props.history.push(
        //   `/cards/credit-cards/direct-debit/get-exemptions`
        // );
        await this.removeCreditCardExemption({ cardAccountNo });
      }
    });
  };


  render() {
    const { getExemptions } = this.state;
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <ContentHeader title="Credit Card Direct Debit Exemptions" />
            <div className="row">
              <div className="col-6">
                <div className="mb-1">
                  <Link to="/cards/direct-debit-exemptions/add">
                    <button className="btn btn-primary btn-light btn-sm mb-3">
                      {" "}
                      <i className="fas fa-plus "></i> Add
                    </button>
                  </Link>

                  {/* <span className="pl-1">
                    <Link to="/cards/credit-cards/direct-debit/remove-exemptions">
                      <button className="btn btn-primary btn-light btn-sm mb-3">
                        {" "}
                        <i className="fas fa-minus"></i> Remove
                      </button>
                    </Link>
                  </span> */}
                </div>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CardAccount Number</th>
                  <th>reason</th>
                  <th>startDate</th>
                  <th>endDate</th>
                </tr>
              </thead>
              <tbody>
                {getExemptions &&
                  getExemptions.map((exemptions, index) => (
                    <tr key={exemptions.id} className="clickable-row">
                      <td>{index + 1}</td>
                      <td className="clickable-name">
                        {exemptions.cardAccountNo}
                      </td>
                      <td>{exemptions.reason}</td>
                      <td>{moment(exemptions.startDate).format("L")}</td>
                      <td>{moment(exemptions.endDate).format("L")}</td>
                      <td
                        onClick={this.onDeleteClick.bind(
                          this,
                          exemptions.cardAccountNo
                        )}
                        style={{ cursor: "pointer" }}
                      >
                        Remove
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  getCreditCardExemptions = async () => {
    const resp = await cardService.getCreditCardExemptions();
    // console.log("exemptions", resp.data.data);
    if (resp && resp.data.data) {
      this.setState({
        getExemptions: resp.data.data,
      });
    }
  };
  removeCreditCardExemption = async (cardAccountNo) => {
    const resp = await cardService.removeCreditCardExemption(cardAccountNo);
    await this.getCreditCardExemptions();
    //console.log("remove", resp, cardAccountNo);
  };
}

export default DirectDebitExemption;
