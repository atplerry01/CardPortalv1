import React, { Component } from 'react';

export default class ApprovalBox extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
    }

    onApprovalSubmit() {
        this.props.onApprovalSubmit(this.state);
    }

    onRejectSubmit() {
        this.props.onRejectSubmit(this.state);
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { reason } = this.state;
        const { showComment, showReject } = this.props;

        return (
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title"> Comment </h4>

                            {!showComment &&
                                <div className="form-group">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="reason"
                                        name="reason"
                                        value={reason}
                                        onChange={this.handleChange}
                                        placeholder="Reasons for action"
                                        required=""
                                    ></textarea>
                                </div>
                            }

                            <div className="el-example">
                                <button
                                    type="button"
                                    disabled={!!this.state.showComment}
                                    onClick={this.onApprovalSubmit.bind(this)}
                                    className="btn btn-primary">
                                    {this.props.submitText === '' ? 'Submit' : this.props.submitText}
                                </button>

                                {showReject &&
                                    <button
                                        type="button"
                                        disabled={!this.state.reason}
                                        onClick={this.onRejectSubmit.bind(this)}
                                        className="btn btn-danger">
                                        Reject
                                    </button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
