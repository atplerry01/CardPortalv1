import moment from "moment";
import React, { Component } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import ContentHeader from "../../../components/ContentHeader";
import { cardService } from "../../../services/cards";
import { columns, data } from "./data";

export class AuditLog extends Component {
  state = {
    auditLog: [],
    startDate: "",
    endDate: "",
    username: "",
    action: "",
    description: "",
    parameters: "",
    path: "",
    status: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async () => {
    const {
      auditLog,
      username,
      description,
      startDate,
      endDate,
      status,
      path,
      action,
      parameters,
    } = this.state;
    const body = {
      startDate,
      endDate,
      username,
      action,
      description,
      parameters,
      path,
      status,
    };

    const res = await this.getAuditLog(body);
  };
  
  render() {
    const {
      auditLog,
      username,
      description,
      startDate,
      endDate,
      status,
      path,
      action,
      parameters,
    } = this.state;

    const tableData = {
      columns,
      data: this.state.auditLog
    };

    return (
      <div className="main">
        <ContentHeader title="Audit Log" />

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <label htmlFor="startDate">Start Date</label>
                <input
                  htmlFor="startDate"
                  type="date"
                  value={startDate}
                  max={moment().format("YYYY-MM-DD")}
                  className="form-control"
                  name="startDate"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="endDate">End Date</label>
                <input
                  htmlFor="endDate"
                  type="date"
                  value={endDate}
                  max={moment().format("YYYY-MM-DD")}
                  className="form-control"
                  name="endDate"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="userName">Username</label>
                <input
                  htmlFor="userName"
                  type="text"
                  value={username}
                  className="form-control"
                  name="username"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="action">Action</label>
                <input
                  htmlFor="action"
                  type="text"
                  value={action}
                  className="form-control"
                  name="action"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="description">Description</label>
                <input
                  htmlFor="description"
                  type="text"
                  value={description}
                  className="form-control"
                  name="description"
                  onChange={this.onChange}
                />
              </div>
            </div>
            {/*  */}
            <div className="row">
              <div className="col">
                <label htmlFor="parameters">Parameters</label>
                <input
                  htmlFor="parameters"
                  type="text"
                  value={parameters}
                  className="form-control"
                  name="parameters"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="path">Path</label>
                <input
                  htmlFor="path"
                  type="text"
                  value={path}
                  className="form-control"
                  name="path"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <label htmlFor="lastName">Status</label>
                <input
                  htmlFor="status"
                  type="text"
                  value={status}
                  className="form-control"
                  name="status"
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                <div className="mt-1">
                  <button
                    className="btn btn-primary mt-4"
                    onClick={this.onSubmit}
                  >
                    {" "}
                    <i className="fas fa-search"></i>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.selectedItem && this.state.selectedItem.id &&
          <div>
            <h5>Selected Details</h5>
            <div className="row">
              
              <div className="col-3">
                <strong>Id: </strong>{this.state.selectedItem.id}
              </div>

              <div className="col-3">
                <strong>Action: </strong>{this.state.selectedItem.action}
              </div>

              <div className="col-3">
                <strong>Action Date: </strong>{this.state.selectedItem.actiondate}
              </div>

              <div className="col-3">
                <strong>Description: </strong>{this.state.selectedItem.description}
              </div>

            </div>

            <div className="row">
              <div className="col-3">
                <strong>Path: </strong>{this.state.selectedItem.path}
              </div>

              <div className="col-3">
                <strong>Status: </strong>{this.state.selectedItem.status}
              </div>

              <div className="col-3">
                <strong>Username: </strong>{this.state.selectedItem.username}
              </div>

            </div>

            <div className="row">
              <div className="col-12">
                <strong>Parameters: </strong>{this.state.selectedItem.parameters}
              </div>
            </div>

          </div>
        }

        {auditLog && auditLog.length > 0 &&
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={data}
              noHeader
              defaultSortField="id"
              defaultSortAsc={false}
              pagination
              highlightOnHover
              pointerOnHover={true}
              selectableRows={true}
              onRowClicked={(entity) => {
                console.log(entity);
                this.setState({ selectedItem: '', selectedItem: entity })
              }}
              onSelectedRowsChange={(entity) => {
                this.setState({ selectedItem: '', selectedItem: entity })
              }}
            />
          </DataTableExtensions>
        }

      </div>
    );
  }

  getAuditLog = async (items) => {
    const resp = await cardService.getAuditLog(items);

    if (resp && resp.data.data) {
      this.setState({
        auditLog: resp.data.data,
      });
    }
  };
}

export default AuditLog;
