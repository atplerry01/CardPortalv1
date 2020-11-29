import React, { Component } from 'react';
import { roleService } from '../../../services/auth';

export default class CmpRolePackageDetailTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            
        };
    }

    handleRemoveRole = (e, entity) => {
        e.preventDefault();

        this.props.handleRemoveRole(entity);

    }

    render() {

        const list = () => {
            if (this.props.data && this.props.data.moduleRoles) {
                return this.props.data.moduleRoles.map((entity, index) => {
                    return (
                        <tr key={entity.id}>
                            <td>{index + 1}</td>
                            <td>{entity.role}</td>
                            <td>{entity.module}</td>
                            <td>
                                <a href="#" onClick={(e) => { this.handleRemoveRole(e, entity) }}>
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    )
                })
            }
        }

        return (
            <div>
                {this.props.data && <h6>Selected Role: {this.props.data.name}</h6>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Role</th>
                            <th>Module</th>
                            <th>
                                <a href={`/cards/admin/role-access-management/${this.props.data && this.props.data.id !== undefined && this.props.data.id ? this.props.data.id : 'new'}`}>
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list()}
                    </tbody>

                </table>
            </div>
        )
    }

    removePackageRole = async (model) => {
        return await roleService.removePackageRole(model)
            .then(res => {
                console.log(res);
            })
    }

}
