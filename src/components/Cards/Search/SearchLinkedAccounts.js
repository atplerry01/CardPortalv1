import React, { Component } from "react";

export class SearchLinkedAccounts extends Component {
  render() {
    const { searchLinked } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Linked Accounts </h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Branch Name</th>
                <th>CIF</th>
                <th>Account Name</th>
                <th>Account Number</th>
                <th> Sol</th>
                <th>Schemecode</th>
              </tr>
            </thead>
            <tbody>
              {searchLinked?.linkedAccountDetails &&
                searchLinked.linkedAccountDetails.map((linked, index) => (
                  <tr key={index} className="clickable-row">
                    <td>{index + 1}</td>
                    <td className="clickable-name">
                      {linked.accountBranchName}
                    </td>
                    <td>{linked.accountCIF}</td>
                    <td>{linked.accountName}</td>
                    <td>{linked.accountNumber}</td>

                    <td>{linked.accountSol}</td>
                    <td>{linked.schemeCode}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SearchLinkedAccounts;
