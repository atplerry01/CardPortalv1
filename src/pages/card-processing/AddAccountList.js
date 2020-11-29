import React, { Component } from "react";

export class AddAccountList extends Component {
  render() {
    const { readFiles, onValidateList, onSubmitFileRes, onSubmit } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">List of Accounts</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>cardAccountNo</th>
                <th>altAccountNo</th>
                <th>cardAccountName</th>
                <th>altAccountName</th>
              </tr>
            </thead>
            <tbody>
              {readFiles.map((linked, index) => (
                <tr key={index} className="clickable-row">
                  <td>{index + 1}</td>
                  <td className="clickable-name">{linked.cardAccountNo}</td>
                  <td>{linked.altAccountNo}</td>
                  <td>{linked.cardAccountName}</td>
                  <td>{linked.altAccountName}</td>
                </tr>
              ))}
            </tbody>

            {onSubmitFileRes ? (
              <div className="row">
                <div className="col-6">
                  <div className="mt-1">
                    <button className="btn btn-primary mt-4" onClick={onSubmit}>
                      submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-6">
                  <div className="mt-1">
                    <button
                      className="btn btn-primary mt-4"
                      onClick={onValidateList}
                    >
                      Validate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </table>
        </div>
      </div>
    );
  }
}

export default AddAccountList;
