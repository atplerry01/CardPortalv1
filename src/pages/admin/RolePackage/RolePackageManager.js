import React, { Component } from 'react';
// CmpRolePackageDetailTable
import Swal from "sweetalert2";
import ContentHeader from '../../../components/ContentHeader';
import { roleService } from '../../../services/auth';
import CmpRolePackageDetailTable from '../Components/cmpRolePackageDetailTable';
import CmpRolePackageTable from '../Components/cmpRolePackageTable';

export default class RolePackageManager extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSearchable: false,
            showModal: false,
        };
    }

    onHandleSelection = (entity) => {
        this.getRolePackageDetail(entity.id);
        window.scrollTo(0, 0);
    }

    componentWillMount() {
        this.getRolePackages();
        this.getModuleRoles();
    }

    handleCreateRolePackage = () => {
        this.props.history.push(`/cards/admin/role-access-management/new`);
    }

    submitClose = () => {

        this.setState({ showModal: false });

    }

    onRoleRemove = (entity) => {

        const { rolePackageDetails } = this.state;

        let initRole = new Array();
        let b = new Object();        
        initRole[0] = entity;

        const model = {
            name: rolePackageDetails.name,
            roles: initRole
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You can change the package name anytime",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Continue'
        }).then(async (result) => {
            if (result.value) {
                this.removePackageRole(model);
            }
        })
        
    }

    render() {
        const { rolePackages, rolePackageDetails, moduleRoles } = this.state;
        return (
            <>
                <ContentHeader title="Manage Role Access" />

                <div className="page-section">
                    <div className="section-block">
                        <div className="row">
                            <div className="col-xl-3">

                                <button
                                    className="btn btn-primary btn-block"
                                    type="submit"
                                    onClick={this.handleCreateRolePackage}
                                >
                                    Create Role
                                </button>

                                <CmpRolePackageTable
                                    data={rolePackages}
                                    handleSelection={this.onHandleSelection}
                                />
                            </div>

                            <div className="col-xl-6">
                                <h5>Role Details</h5>
                                <CmpRolePackageDetailTable data={rolePackageDetails} 
                                    handleRemoveRole = {this.onRoleRemove} />
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
                this.setState({ rolePackageDetails: res.data });
            })
    }

    addPackageRole = async () => {
        return await roleService.addPackageRole()
            .then(res => {
                console.log(res);
            })
    }

    removePackageRole = async (model) => {
        return await roleService.removePackageRole(model)
            .then(res => {
                if (res.success) {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: res.data,
                        icon: "success"
                    }).then(result => {
                        if (result.value) {
                            this.getRolePackageDetail(this.state.rolePackageDetails.id);
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
                this.setState({ moduleRoles: res.data });
            })
    }

}
