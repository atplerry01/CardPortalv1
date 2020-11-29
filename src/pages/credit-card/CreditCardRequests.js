import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import ContentHeader from "../../components/ContentHeader";
import Input from "../../components/form/Input";

export default class CreditCardRequests extends Component {

    handleClick = () => {
        this.props.history.push('/cards/credit-card-request/:type')
    }
    
    render() {
        return (
            <>
                <ContentHeader
                    title={"Credit Card Requisition"}
                />

                <div className="section-block">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title"> Card Profiling </h4>

                                    <div className="form-group">
                                        <Input
                                            label="Account Number"
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="accountNumber"
                                            value={""}
                                            placeholder="Enter account number"
                                            handleInputChange={''}
                                        // error={error.accountNumber}
                                        />
                                    </div>
                                    <>
                                        <Button
                                            className="btn btn-primary"
                                            style={{ marginRight: 10 }}
                                            onClick={this.handleClick}
                                        >
                                            Verify Account Number
                                        </Button>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
