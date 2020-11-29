import React, { Component } from 'react';
import AccountDetailDisplay from './AccountDetailDisplay';
import CustomerDetailDisplay from './CustomerDetailDisplay';

export default class RequestedCardAccountDetail extends Component {
    render() {
        const { requestDetails } = this.props;

        return (
            <div className="card">
                {requestDetails && requestDetails.accountDetails && <AccountDetailDisplay accountDetail={requestDetails.accountDetails} />}
                {requestDetails && requestDetails.customerDetails && <CustomerDetailDisplay customerDetails={requestDetails.customerDetails} />}
            </div>
        )
    }
}
