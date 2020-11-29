import React, { Component } from "react";
import { Link } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import { cardService } from "../../services/cards";
import CreditCardAltTable from "./CreditCardAltTable";

export class CreditCardsAlternateAccounts extends Component {
  state = {
    searchedList: [],
    cardaccount: "",
    altaccount: "",
    custname: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSearch = async () => {
    const { custname, altaccount, cardaccount } = this.state;

    const res = await this.findAlternateAccountsCC(
      cardaccount,
      altaccount,
      custname
    );
  };

  render() {
    const { searchedList, custname, altaccount, cardaccount } = this.state;

    return (
      <div>
        <ContentHeader title="Credit Cards Alternate Account" />
        <div className="card">
          <div className="card-body">
            {/*  */}
            <div className="row">
              <div className="col">
                <div className="">
                  <Link to="/cards/credit-cards/alternate-accounts/add">
                    <button className="btn btn-primary btn-light btn-sm mb-3">
                      {" "}
                      <i className="fas fa-plus"></i> Add
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="cardaccount">Card Account</label>
                <input
                  htmlFor="cardaccount"
                  type="text"
                  value={cardaccount}
                  className="form-control"
                  name="cardaccount"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="altaccount">Alternate Account</label>
                <input
                  htmlFor="altaccount"
                  type="text"
                  value={altaccount}
                  className="form-control"
                  name="altaccount"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="custname">Customer Name</label>
                <input
                  htmlFor="custname"
                  type="text"
                  value={custname}
                  className="form-control"
                  name="custname"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <div className="mt-1">
                  <button
                    className="btn btn-primary mt-4"
                    onClick={this.onSearch}
                  >
                    {" "}
                    <i className="fas fa-search"></i>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {searchedList.length > 0 && searchedList && (
          <CreditCardAltTable
            handleDataReload={this.onDataReload}
            searchedList={searchedList}
            {...this.props}
          />
        )}
        {/* {searchedList.length === 0 && searchedList && (
          <div>
            <div className="card-body">
              <p>No Match</p>
            </div>
          </div>
        )} */}
      </div>
    );
  }

  onDataReload = () => {
    this.onSearch();
  }

  findAlternateAccountsCC = async (cardaccount, altaccount, custname) => {
    const resp = await cardService.findCardAlternateAccounts(
      cardaccount,
      altaccount,
      custname
    );

    if (resp && resp.data) {
      this.setState({
        searchedList: resp.data,
      });
    }
  };
}
//

export default CreditCardsAlternateAccounts;
