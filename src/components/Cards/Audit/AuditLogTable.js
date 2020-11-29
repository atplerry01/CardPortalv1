import React, { Component } from "react";
import moment from "moment";
import AuditLogModal from "./AuditLogModal";

export class AuditLogTable extends Component {
  render() {
    const { auditLog } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Action</th>
                <th>Description</th>
                <th>Parameters</th>
                <th> Path</th>
                <th>Success</th>
                <th>ActionDate</th>
              </tr>
            </thead>
            <tbody>
              {auditLog &&
                auditLog.map((al, index) => (
                  <tr key={al.id} className="clickable-row">
                    <td>{index + 1}</td>
                    <td className="clickable-name">{al.username}</td>
                    <td>{al.action}</td>
                    <td>{al.description}</td>

                    <td>
                      <AuditLogModal parameters={al.parameters} />
                    </td>

                    <td>{al.path}</td>
                    <td>{al.status}</td>
                    <td>{moment(al.actiondate).format("L")}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AuditLogTable;
