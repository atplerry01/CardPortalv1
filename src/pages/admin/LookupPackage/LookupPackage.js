import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import ContentHeader from '../../../components/ContentHeader';
import RoleTable from '../../../components/Profile/RoleTable';
import { authService } from '../../../services/auth/auth.service';

export default class LookupPackage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modalTitle: 'Add Role',
            isSearchable: false,
            showRoleBox: false,
            showModal: false,
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        // this.submitClose = this.submitClose.bind(this);

        // this.handleChange = this.handleChange.bind(this);
        // this.handleUserQuery = this.handleUserQuery.bind(this);
        // this.onUpdateHandleAction = this.onUpdateHandleAction.bind(this);
        // this.onDeleteHandleAction = this.onDeleteHandleAction.bind(this);
        this.onRoleModalCall = this.onRoleModalCall.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }


    onRoleModalCall = () => {
        this.setState({ showModal: true });
    }


    componentDidMount = async () => {
        const resp = await this.getRolePackages();
    }

    render() {
        const { username, roleName, roles } = this.state;

        return (
            <>
                <ContentHeader title="Create Role" />

                <div className="page-section">
                    <div className="section-block">
                        <div className="row">

                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-body">
                                        {roles && <RoleTable roles={roles} callRoleModal={this.onRoleModalCall} />}
                                    </div>
                                </div>
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
                            <Modal.Title>{this.state.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* {this.state.roles && dropRoles()} */}
                            {/* {!this.state.processHotList && this.renderModalContent()} */}


                            <div className="form-group">
                                <label htmlFor="accountNumber">
                                    <span className="list-icon">
                                        {/* <span className="oi oi-circle-check text-success"></span> */}
                                    </span>
                                    Role Name
                                            </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="roleName"
                                    name="roleName"
                                    value={roleName || ""}
                                    onChange={this.handleChange}
                                    placeholder="Enter Role Name"
                                />
                            </div>

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

    getApplications = async () => {
        return await authService.getApplications()
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
