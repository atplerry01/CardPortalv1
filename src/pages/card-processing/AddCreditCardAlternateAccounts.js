import React, { Component } from "react";
import Swal from "sweetalert2";
import ContentHeader from "../../components/ContentHeader";
import { cardService } from "../../services/cards";
import AddAccountList from "./AddAccountList";

export class AddCreditCardsAlternateAccounts extends Component {
  state = {
    cardAccountNo: "", //can edit
    cardAccountName: "",
    altAccountNo: "", // can edit
    altAccountName: "",
    validatedDetails: [],
    showValidateButton: false,
    showSubmitButton: false,
    searchedList: [],
    disabled: false,
    readFiles: [],
    onSubmitFileRes: false,
  };

  async componentDidMount() {
    if (this.props.match.params.id !== "Add") {

      const cardaccount = this.props.match.params.id;
      const accountDetails = sessionStorage.getItem("wm.cmp." + cardaccount) !== null ? JSON.parse(sessionStorage.getItem("wm.cmp." + cardaccount)) : {}

      this.setState({
        altAccountName: accountDetails.altAccountName,
        altAccountNo: accountDetails.altAccountNo,
        cardAccountName: accountDetails.cardAccountName,
        cardAccountNo: accountDetails.cardAccountNo,
        customerType: accountDetails.customerType,
      });


      // const altaccount = "";
      // const custname = "";

      // const res = await this.findAlternateAccountsCC(
      //   cardaccount,
      //   altaccount,
      //   custname
      // );
    }
  }

  onChangeHandlerForFile = (event) => {
    const csvjson = require("csvjson");
    const readFile = require("fs").readFile;
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const result = reader.result.slice(reader.result.indexOf(",") + 1);

      //alert(atob(result));
      this.setState({
        readFiles: csvjson.toObject(atob(result)),
      });
    };
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    const { cardAccountNo, altAccountNo } = this.state;
    if (cardAccountNo && altAccountNo) {
      this.setState({
        showValidateButton: true,
        showSubmitButton: false
      });
    }
  };

  onValidate = async () => {
    const { cardAccountNo, altAccountNo } = this.state;
    const body = {
      cardAccountNo,
      altAccountNo,
    };

    const res = await this.validateCC(cardAccountNo, altAccountNo);
  };

  onValidateList = async () => {
    const { readFiles } = this.state;
    const res = await this.validateCCList(readFiles);
  };

  onSubmit = async () => {
    const { cardAccountNo, cardAccountName, altAccountNo, altAccountName, customerType } = this.state;

    const body = [
      {
        cardAccountNo,
        cardAccountName,
        altAccountNo,
        altAccountName,
        customerType
      },
    ];

    const res = await this.addCardAccount(body);
  };

  onSubmitList = async () => {
    const { readFiles } = this.state;

    await this.addCardAccount(readFiles);
    this.props.history.push(`/cards/credit-cards/alternate-accounts`);
  };

  render() {
    const {
      cardAccountNo,
      cardAccountName,
      altAccountNo,
      altAccountName,
      showValidateButton,
      showSubmitButton,
      searchedList,
      validatedDetails,
      onSubmitFileRes,
      disabled,
      readFiles,
      customerType
    } = this.state;

    return (
      <div>
        <ContentHeader
          title={
            searchedList && searchedList.length > 0
              ? "Update Credit Cards Alternate Account"
              : "Add Credit Cards Alternate Account"
          }
        />

        <div className="card">
          <h6 className="pl-3 pt-3">
            {searchedList && searchedList.length > 0
              ? "Update Account"
              : "Add Account"}
          </h6>
          <div className="card-body">
            {/*  */}

            <div className="row">
              <div className="col">
                <label htmlFor="altaccount">Card Account Number</label>
                <input
                  htmlFor="altaccount"
                  type="text"
                  value={cardAccountNo}
                  className="form-control"
                  name="cardAccountNo"
                  onChange={this.onChange}
                  disabled={disabled}
                />
              </div>

              <div className="col">
                <label htmlFor="cardaccount">Card Account Name</label>
                <input
                  htmlFor="cardaccount"
                  type="text"
                  value={cardAccountName}
                  className="form-control"
                  name="cardAccountName"
                  onChange={this.onChange}
                  disabled={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="custname">Alternate Account Number</label>

                <input
                  htmlFor="custname"
                  type="text"
                  value={altAccountNo}
                  className="form-control"
                  name="altAccountNo"
                  onChange={this.onChange}
                  disabled={disabled}
                />
              </div>

              <div className="col">
                <label htmlFor="custname">Alternate Account Name</label>

                <input
                  htmlFor="custname"
                  type="text"
                  value={altAccountName}
                  className="form-control"
                  name="altAccountName"
                  onChange={this.onChange}
                  disabled={true}
                />
              </div>

              <div className="col">
                <label htmlFor="customerType">Customer Type</label>
                <input
                  htmlFor="customerType"
                  type="text"
                  value={customerType}
                  className="form-control"
                  name="customerType"
                  onChange={this.onChange}
                  disabled={true}
                />
              </div>

            </div>

            {this.state.hasValidated &&
              <div style={{ paddingTop: 10, color: 'green' }}>
                {this.state.validMessage}
              </div>
            }

            {this.state.hasError &&
              <div style={{ paddingTop: 10, color: 'red' }}>
                Error: {this.state.errorMessage}
              </div>
            }

            {showValidateButton && (
              <div className="row">
                <div className="col-6">
                  <div className="mt-1">
                    <button
                      className="btn btn-primary mt-4"
                      onClick={this.onValidate}
                    >
                      Validate
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showSubmitButton && (
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
            )}
          </div>
        </div>
        {/* Second Card */}
        {searchedList && searchedList.length > 0 ? null : (
          <>
            <div className="card">
              <h6 className="pl-3 pt-3">Add Multiple Accounts</h6>
              <div className="card-body">
                <div className="row">
                  <div className="col-6 ">
                    <input
                      id="csvFile"
                      type="file"
                      // name="user[image]"
                      onChange={this.onChangeHandlerForFile}
                      accept=".csv"
                    />
                  </div>
                </div>
              </div>
            </div>
            {readFiles.length > 0 && (
              <AddAccountList
                readFiles={readFiles}
                onValidateList={this.onValidateList}
                onSubmit={this.onSubmitList}
                onSubmitFileRes={onSubmitFileRes}
              />
            )}
          </>
        )}
        {/*  */}
      </div>
    );
  }

  validateCC = async (cardAccountNo, altAccountNo) => {
    const resp = await cardService.validateCreditCardRequest(
      cardAccountNo,
      altAccountNo
    );

    if (resp && resp.data.result === 'OK') {
      this.setState({
        validatedDetails: resp.data,

        cardAccountNo: resp.data.cardAccountNo,
        cardAccountName: resp.data.cardAccountName,
        altAccountNo: resp.data.altAccountNo,
        altAccountName: resp.data.altAccountName,
        customerType: resp.data.customerType,
        showSubmitButton: true,
        showValidateButton: false,
        hasError: false,
        hasValidated: true,
        validMessage: 'Validation Successful, Click Submit to continue'
      });
    } else {
      this.setState({
        showSubmitButton: false,
        showValidateButton: true,
        disabled: false,
        hasError: true,
        errorMessage: resp.data
      });
    }

  };

  validateCCList = async (body) => {
    const resp = await cardService.validateCreditCardListRequest(body);

    if (resp && resp.data && resp.success) {
      this.setState({
        readFiles: resp.data,
        onSubmitFileRes: resp.success,
      });
    }
  };

  addCardAccount = async (body) => {
    const resp = await cardService.addCardAccount(body)
      .then(res => {
        if (res.success) {
          Swal.fire({
            confirmButtonColor: "#800080",
            text: res.data,
            icon: "success"
          }).then(result => {
            if (result.value) {
              // window.location = "cards/admin/role-access-management";
              this.props.history.push(`/cards/credit-cards/alternate-accounts`)
            }
          });
        } else {
          Swal.fire({
            confirmButtonColor: "#800080",
            text: res.data,
            icon: "error"
          }).then(result => {
            if (result.value) {
              // window.location = "cards/issuance/debit-cards";
            }
          });
        }
      });
  };

  findAlternateAccountsCC = async (cardaccount, altaccount, custname) => {
    const resp = await cardService.findCardAlternateAccounts(
      cardaccount,
      altaccount,
      custname
    );
    // console.log("from detail", resp.data);
    if (resp && resp.data.length > 0) {
      this.setState({
        searchedList: resp.data,
        cardAccountNo: resp.data[0].cardAccountNo,
        cardAccountName: resp.data[0].cardAccountName,
        altAccountNo: resp.data[0].altAccountNo,
        altAccountName: resp.data[0].altAccountName,
        disabled: false,
      });
      // console.log(this.state.searchedList);
    }
  };
}

//

export default AddCreditCardsAlternateAccounts;
