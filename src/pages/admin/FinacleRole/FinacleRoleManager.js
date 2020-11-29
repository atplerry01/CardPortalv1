import React, { Component } from 'react';
import Swal from "sweetalert2";
import ContentHeader from '../../../components/ContentHeader';
import SelectInput from "../../../components/form/SelectInput";
import { roleService } from '../../../services/auth';
import { lookupRoleDropDown } from "../../../services/selector/role-selectors";
import { lookupDropDown } from "../../../services/selector/selectors";
import CmpFinacleModuleTable from './cmpFinacleModuleTable';

export default class FinacleRoleManager extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSearchable: false,
            showModal: false,
        };

        this.handleChange = this.handleChange.bind(this);

    }

    handleFinacleRoleLink = () => {

        const model = {
            finacleRole: this.state.finRoleId,
            rolePackageId: this.state.roleId
        }

        this.createLinkRole(model);
        
        this.getFinacleRoleMapping();
        this.getFinacleRoles();
        this.getRolePackages();
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    componentWillMount() {
        this.getFinacleRoleMapping();
        this.getFinacleRoles();
        this.getRolePackages();
    }

    render() {
        const { finacleRoleMapping, finRoleId, roleId } = this.state;

        const dropFinRole = () => {
            const { finacleRoles } = this.state;

            if (finacleRoles && finacleRoles.data) {
                const selRoles = lookupRoleDropDown(finacleRoles.data);

                if (selRoles) {
                    return (
                        <SelectInput
                            label="Finacle Roles"
                            name="finRoleId"
                            value={finRoleId}
                            onChange={this.handleChange}
                            defaultOption="Select Finacle Role"
                            options={selRoles}
                        />
                    );
                }
            }
        }

        const dropRole = () => {
            const { roles } = this.state;

            if (roles && roles.data) {
                const selRoles = lookupDropDown(roles.data);

                if (selRoles) {
                    return (
                        <SelectInput
                            label="Portal Roles"
                            name="roleId"
                            value={roleId}
                            onChange={this.handleChange}
                            defaultOption="Select Portal Role"
                            options={selRoles}
                        />
                    );
                }
            }


        }

        return (
            <>
                <ContentHeader title="Manage Finacle Role Mapping" />

                <div className="page-section">
                    <div className="section-block">
                        <div className="row">
                            <div className="col-xl-4">
                                <h6> Mapped Finacle Roles</h6>
                                <CmpFinacleModuleTable
                                    data={finacleRoleMapping}
                                    handleSelection={this.onHandleSelection}
                                />

                            </div>

                            <div className="col-xl-5">

                                <div className="row">
                                    <div className="col-xl-10">

                                        <div className="form-group">

                                            {dropFinRole()}

                                            {dropRole()}
                                           
                                        </div>

                                        <button
                                            className="btn btn-primary btn-block"
                                            type="submit"
                                            onClick={this.handleFinacleRoleLink}
                                        >
                                            Save Changes
                                        </button>



                                    </div>

                                </div>


                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }


    getFinacleRoleMapping = async () => {
        return await roleService.getFinacleRoleMapping()
            .then(res => {
                this.setState({ finacleRoleMapping: res.data });
            })
    }

    getFinacleRoles = async () => {
        return await roleService.getFinacleRoles()
            .then(res => {
                this.setState({ finacleRoles: res });
            })
    }
    
    getRolePackages = async () => {
        return await roleService.getRolePackages()
            .then(res => {
                this.setState({ roles: res });
            })
    }

    createLinkRole = async(model) => {
        return await roleService.linkFinacleRoleToPackage(model)
            .then(res => {
                // this.setState({ linkRoles: res });

                if (res.success) {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: res.data,
                        icon: "success"
                    }).then(result => {
                        if (result.value) {
                            // window.location = "cards/admin/role-access-management";
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

}
