import React, { Component } from 'react';
import Swal from "sweetalert2";
import ContentHeader from '../../../components/ContentHeader';
import { roleService } from '../../../services/auth';
import CmpTableWithCheckBox from "../Components/cmpTableWithCheckBox";

// CmpRolePackageDetailTable

export default class RolePackageManagerEdit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSearchable: false,
            showModal: false,
            hasDesc: false,
            isUpdate: false,
            selectedCheckedItems: [],
            tableHeader: [
                {
                    name: "module",
                    title: "Module",
                    isCurrency: false,
                    isDate: false,
                    isNumber: false
                },
                {
                    name: "role",
                    title: "Role",
                    isCurrency: false,
                    isDate: false,
                    isNumber: false
                }
            ]
        };

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        e.preventDefault();

        const { cardProducts, pendingRequests } = this.state;
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleCheckboxChange(itemObject) {
        const { checked, item } = itemObject;
        let { selectedCheckedItems } = this.state;

        selectedCheckedItems = selectedCheckedItems !== null ? selectedCheckedItems : [];

        if (checked) {
            const cc = selectedCheckedItems.length + 1;

            const checkedItems = [...selectedCheckedItems, item];

            this.setState({
                selectedCheckedItems: checkedItems
            });
            return;
        } else {
            const cc = selectedCheckedItems.length - 1;

        }

        const checkedItems = selectedCheckedItems.filter(obj => obj !== item);

        this.setState({
            selectedCheckedItems: checkedItems
        });
    }

    handleCheckboxAllClick(entity) {
        console.log(entity);
    }

    onNavButtonClick(entity) {
        console.log(entity);
    }

    onHandleSelection = (entity) => {
        this.getRolePackageDetail(entity.id);
    }

    async componentWillMount() {
        if (this.props.match.params && this.props.match.params.id && this.props.match.params.id !== 'new') {
            this.setState({ isUpdate: true });
            await this.getRolePackageDetail(this.props.match.params.id);
        }

        this.getModuleRoles();
    }

    handleCreateRolePackage = () => {

        this.setState({ showModal: true, createRolePage: true, modalTitle: 'Create Role' });

        this.model = {
            name: this.state.roleName,
            description: this.state.description,
            roles: this.state.selectedCheckedItems
        };

        if (this.props.match.params && this.props.match.params.id && this.props.match.params.id !== 'new') {
            // getRole Details

            let newItems = [];

            if (this.state.existingModule !== null) {
                newItems = this.model.roles.filter(b => !this.state.existingModule.some(a => a.module === b.module && a.role === b.role));
            } else {
                newItems = this.model.roles
            }


            this.model.roles = newItems;
            
            this.UpdateRolePackage(this.model);

        } else {
            this.createRolePackage(this.model);
        }

    }

    selectedModuleTable = () => {
        const list = () => {
            if (this.state.selectedCheckedItems !== null) {
                return this.state.selectedCheckedItems.map((entity, index) => {
                    return (
                        <tr className="selection" key={index}>
                            <td>{index + 1}</td>
                            <td>{entity.module}</td>
                            <td>{entity.role}</td>
                        </tr>
                    )
                })
            }
        };

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Module</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list()}
                    </tbody>

                </table>
            </div>
        )
    }

    render() {
        const { moduleRoles, tableHeader, selectedCheckedItems, roleName, description } = this.state;

        return (
            <>
                <ContentHeader title="Manage Role Access" />

                <div className="page-section">
                    <div className="section-block">
                        <div className="row">
                            <div className="col-xl-3" style={{ marginRight: 50 }}>
                                <div className="row">
                                    <div className="col-xl-12">

                                        <div className="form-group">

                                            <label htmlFor="roleName">
                                                Role Name
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="roleName"
                                                name="roleName"
                                                value={roleName || ''}
                                                onChange={this.handleChange}
                                                placeholder="Enter Role Name"
                                            />
                                        </div>

                                        {!this.state.isUpdate &&
                                            <div className="form-group">

                                                <label htmlFor="accountNumber">
                                                    Description
                                            </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    value={description || ''}
                                                    onChange={this.handleChange}
                                                    placeholder="Enter Description"
                                                />
                                            </div>
                                        }

                                        <div className="form-group">
                                            Selected Modules
                                            {this.selectedModuleTable()}
                                        </div>

                                        <button
                                            className="btn btn-primary btn-block"
                                            type="submit"
                                            onClick={this.handleCreateRolePackage}
                                        >
                                            {this.state.isUpdate ? 'Update Role' : 'Create Role'}
                                        </button>

                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-5">
                                <h5>Role Details</h5>

                                {tableHeader && moduleRoles &&
                                    <CmpTableWithCheckBox
                                        dataHeader={tableHeader}
                                        dataBody={moduleRoles}
                                        headerCheckBoxId="table2"
                                        selectedCheckedItems={selectedCheckedItems}
                                        handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                                        handleCheckboxAllClick={this.handleCheckboxAllClick.bind(this)}
                                        onNavClick={this.onNavButtonClick.bind(this)}
                                    />
                                }

                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }

    getRolePackages = async () => {
        return await roleService.getRolePackages()
            .then(res => {
                this.setState({ rolePackages: res.data });
            })
    }

    getRolePackageDetail = async (id) => {
        return await roleService.getRolePackageDetail(id)
            .then(res => {
                if (res.success) {
                    this.setState({
                        existingModule: res.data.moduleRoles,
                        selectedCheckedItems: res.data.moduleRoles,
                        rolePackageDetails: res.data,
                        roleName: res.data.name,
                        description: res.data.description
                    });

                }
            })
    }

    addPackageRole = async () => {
        return await roleService.addPackageRole()
            .then(res => {
                console.log(res);
            })
    }

    removePackageRole = async () => {
        return await roleService.removePackageRole()
            .then(res => {
                
                if (res.success) {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: res.data,
                        icon: "success"
                    }).then(result => {
                        if (result.value) {
                            window.location = "cards/admin/role-access-management";
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
            })
    }

    getModuleRoles = async () => {
        return await roleService.getModuleRoles()
            .then(res => {
                console.log(res);
                this.setState({ moduleRoles: res.data });
            })
    }

    createRolePackage = async (model) => {
        return await roleService.createRolePackage(model)
            .then(res => {

                if (res.success) {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: "Request Successfully Processed",
                        icon: "success"
                    }).then(result => {
                        if (result.value) {
                            window.location = "cards/admin/role-access-management";
                        }
                    });
                } else {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: "Request Failed",
                        icon: "error"
                    }).then(result => {
                        if (result.value) {
                            // window.location = "cards/issuance/debit-cards";
                        }
                    });
                }
            })
    }

    UpdateRolePackage = async (model) => {
        return await roleService.addPackageRole(model)
        .then(res => {
            console.log(res);
            // TODO: 
            if (res.success) {
                Swal.fire({
                    confirmButtonColor: "#800080",
                    text: "Request Successfully Processed",
                    icon: "success"
                }).then(result => {
                    if (result.value) {
                        window.location = "cards/admin/role-access-management";
                    }
                });
            } else {
                Swal.fire({
                    confirmButtonColor: "#800080",
                    text: "Request Failed",
                    icon: "error"
                }).then(result => {
                    if (result.value) {
                        // window.location = "cards/issuance/debit-cards";
                    }
                });
            }
        })
    }
}
