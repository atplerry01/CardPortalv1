import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import ContentHeader from '../../../components/ContentHeader';
import SelectInput from "../../../components/form/SelectInput";
import ADProfile from '../../../components/Profile/ADProfile';
import AppInfo from '../../../components/Profile/AppInfo';
import { authService } from '../../../services/auth/auth.service';
import { lookupDropDown } from "../../../services/selector/selectors";

export default class UserProfile extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isSearchable: false,
            showRoleBox: false,
            showModal: false,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submitClose = this.submitClose.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleUserQuery = this.handleUserQuery.bind(this);
        this.handleUserProfile = this.handleUserProfile.bind(this);
        this.onUpdateHandleAction = this.onUpdateHandleAction.bind(this);
        this.onDeleteHandleAction = this.onDeleteHandleAction.bind(this);
        this.onRoleModalCall = this.onRoleModalCall.bind(this);
    }


    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    submitClose = async () => {

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
                const { userProfile } = this.state;
                const res = await this.assignUserPackage(userProfile.userName, this.state.roleId);

                if (res.code !== "400") {
                    const userProfile2 = await this.getUserDetailQuery(userProfile.userName);
                    this.setState({ userProfile: userProfile2 });
                }

                if (res.success) {
                    Swal.fire(
                        'Updated!',
                        'Your request has been completed.',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Error!',
                        `${res.data.message}`,
                        'error'
                    )
                }

                this.close();

            }
        })
    }

    onRoleModalCall = () => {
        this.setState({ showModal: true });
    }

    onUpdateHandleAction = async (entity) => {
        const { userProfile } = this.state;

        Swal.fire({
            title: 'Are you sure?',
            text: "You can change the package name anytime",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
        }).then(async (result) => {
            if (result.value) {
                const res = await this.assignUserPackage(userProfile.userName, entity.id);

                if (res) {
                    Swal.fire(
                        'Updated!',
                        'Your package has been updated.',
                        'success'
                    )
                }
            }
        })

    }

    onDeleteHandleAction = async (entity) => {
        const { userProfile } = this.state;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {

            if (result.value) {
                const res = await this.deleteUserRole(userProfile.userName, entity.id);

                this.setState({ isCardTypeSelected: false });

                if (res.code !== "400") {
                    const userProfile2 = await this.getUserDetailQuery(userProfile.userName);
                    this.setState({ userProfile: userProfile2 });
                }

                if (res) {
                    Swal.fire(
                        'Deleted!',
                        'Your request has been completed.',
                        'success'
                    )
                }
            }
        })
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({ [name]: value });

        if (name === 'username') {
            this.setState({ isSearchable: true });
        }
    }

    handleUserQuery = async () => {
        // e.preventDefault();
        const { username } = this.state;

        const userProfile = await this.getUserDetailQuery(username);

        this.setState({ userProfile });

    }

    handleUserProfile = async (e) => {
        e.preventDefault();
        const { userProfile } = this.state;

        const model = {
            userName: userProfile.userName,
            fullName: userProfile.fullName,
            email: userProfile.email,
            branch: userProfile.branch ? userProfile.branch : 999,
            department: userProfile.department
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to create a new user profile",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!'
        }).then(async (result) => {

            if (result.value) {

                const createRes = await this.createUserProfile(model);
                
                if (createRes === 'User Creation Succesful') {
                    this.handleUserQuery();
                }

                if (createRes) {
                    Swal.fire(
                        'Created!',
                        'Your user profile has been created.',
                        'success'
                    )
                }
            }
        })
    }

    handleEnableUser = async () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to Enable user profile",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Enable it!'
        }).then(async (result) => {

            if (result.value) {
                const createRes = await this.enableUser(this.state.userProfile.userName);

                const userProfile2 = await this.getUserDetailQuery(this.state.userProfile.userName);
                this.setState({ userProfile: userProfile2 });

                if (createRes) {
                    Swal.fire(
                        'Created!',
                        'Your user profile has been Enabled.',
                        'success'
                    )
                }
            }
        })

    }

    handleDisableUser = async () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to disable user profile",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Disabled It'
        }).then(async (result) => {

            if (result.value) {

                const createRes = await this.disableUser(this.state.userProfile.userName);

                if (createRes === 'User Creation Succesful') {
                    // console.log(createRes);
                }

                if (createRes) {
                    const userProfile2 = await this.getUserDetailQuery(this.state.userProfile.userName);
                    this.setState({ userProfile: userProfile2 });

                    Swal.fire(
                        'Created!',
                        'Your user profile has been created.',
                        'success'
                    )
                }
            }
        })
    }

    componentDidMount = async () => {
        const resp = await this.getRolePackages();
    }

    render() {
        const { username, userProfile, roleId } = this.state;

        const dropRoles = () => {
            const { roles } = this.state;
            const roleData = lookupDropDown(roles);

            if (roleData) {
                return (
                    <SelectInput
                        label="Package Roles"
                        name="roleId"
                        value={roleId}
                        onChange={this.handleChange}
                        defaultOption="Select Role"
                        options={roleData}
                    />
                );
            }
        };

        return (
            <>
                <ContentHeader title="User Profile" />

                <div className="page-section">
                    <div className="section-block">
                        <div className="row">

                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body">

                                        <div className="form-group">
                                            <label htmlFor="accountNumber">
                                                <span className="list-icon">
                                                    {/* <span className="oi oi-circle-check text-success"></span> */}
                                                </span>
                                                Username
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                                value={username || ""}
                                                onChange={this.handleChange}
                                                placeholder="Enter User"
                                            />
                                        </div>

                                        <button
                                            className="btn btn-primary btn-lg btn-block"
                                            type="submit"
                                            disabled={!this.state.username}
                                            onClick={this.handleUserQuery}
                                        >
                                            Search
                                        </button>

                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-8">

                                {userProfile &&
                                    <>
                                        <ADProfile profile={userProfile} />

                                        {userProfile && userProfile.code == '400' &&
                                            <div style={{ fontSize: 18 }}>
                                                {userProfile.message}
                                            </div>
                                        }

                                        {userProfile && userProfile.status == 0 &&
                                            <div class="container">
                                                <div class="button">

                                                    {userProfile && userProfile.status == 0 &&
                                                        <div>
                                                            User is not profile on CMP {userProfile.status}
                                                            <button
                                                                className="btn btn-primary btn-block"
                                                                type="submit"
                                                                onClick={this.handleUserProfile}
                                                            >
                                                                Profile User
                                                            </button>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                        }

                                        {userProfile && (userProfile.status == "1" || userProfile.status == "2") &&
                                            <AppInfo
                                                userProfile={userProfile}
                                                roles={userProfile.roles}
                                                handleDeleteActionClick={this.onDeleteHandleAction}
                                                callRoleModal={this.onRoleModalCall}
                                                onDisableActionClick={this.handleDisableUser}
                                                onEnableActionClick={this.handleEnableUser}
                                            />
                                        }

                                    </>
                                }
                            </div>

                        </div>
                    </div>

                    <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.showModal}
                        onHide={this.close}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Role Management</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.roles && dropRoles()}
                            {/* {!this.state.processHotList && this.renderModalContent()} */}
                            <hr />
                        </Modal.Body>
                        {!this.state.processHotList && (
                            <Modal.Footer>
                                <Button onClick={this.close}>Close</Button>
                                <Button variant="primary" onClick={this.submitClose}>
                                    Save changes
                            </Button>
                            </Modal.Footer>
                        )}
                    </Modal>

                </div>
            </>
        )
    }

    getUserDetailQuery = async username => {
        return await authService.getUserDetails(username)
            .then(res => {
                return res.data;
            },
                error => console.log("error")
            );
    };

    createUserProfile = async model => {
        return await authService.createUserProfile(model)
            .then(res => {
                return res.data;
            },
                error => console.log("error")
            );
    }

    assignUserPackage = async (username, roleId) => {
        return await authService.assignUserPackage(username, roleId)
            .then(res => {
                return res;
            },
                error => console.log("error")
            );
    };

    enableUser = async (username) => {
        return await authService.enableUser(username)
            .then(res => {
                return res.data;
            },
                error => console.log("error")
            );
    };

    disableUser = async (username) => {
        return await authService.disableUser(username)
            .then(res => {
                return res.data;
            },
                error => console.log("error")
            );
    };

    deleteUserRole = async (username, roleId) => {
        return await authService.deleteUserRole(username, roleId)
            .then(res => {
                return res.data;
            },
                error => console.log("error")
            );
    };

    getRolePackages = async () => {
        return await authService.getRolePackages()
            .then(res => {
                if (res.success) {
                    this.setState({ roles: res.data });
                }
                return res.data;
            },
                error => console.log("error")
            );
    };

}
