
import React, { Component } from 'react';

export default class RoleTable extends Component {

    callRoleModal() {
        this.props.callRoleModal();
    }

    render() {
        const { roles } = this.props;
        const { processing } = this.props;

        const roleLists = () => {
            if (roles) {
                return roles.map((entity, indx) => {
                    return (
                        <tr key={indx}>
                            <td>{indx + 1}</td>
                            <td>{entity.name}</td>
                        </tr>
                    )
                })
            }
        }

        return (
            <div className="table-responsive">
                <div style={{ float: "right", fontSize: 24, fontWeight: "Bold", cursor: 'pointer' }}>
                    <span onClick={this.callRoleModal.bind(this)}>AddNew Role</span>
                </div>
                <table className="table table-striped">
                    <thead className="thead-">
                        <tr>
                            <th>
                                &nbsp;
                            </th>
                            <th style={{ width: '90%' }}> Role Name </th>
                        </tr>
                    </thead>

                    <tbody>
                        {roleLists()}
                    </tbody>
                </table>
            </div>
        )
    }
}
