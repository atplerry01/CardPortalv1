import React, { Component } from 'react';

export default class RequestedCardDetail extends Component {

    render() {
        const { carddetails, requestDetails } = this.props;
        const cardProduct = carddetails.name + ' - ' + carddetails.bin;
        const amount = carddetails.currency + ' ' + carddetails.fee;
        const accountNumber = requestDetails.accountDetails.accountNumber;
        const isWaiveable2 = carddetails.isWaived;
        const isWaiveable = carddetails.isWaived ? 'True' : 'False';
        const waiverReason = carddetails.waiverReason;

        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title"> Card Profiling </h4>

                    <div className="form-group">
                        <label htmlFor="accountNumber">
                            Card Product
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="accountNumber"
                            placeholder="Enter account number"
                            required=""
                            value={cardProduct}
                        />
                    </div>

                    <div className="form-row">
                        <div className="col-md-6 mb-12">
                            <label htmlFor="currency">Account</label>
                            <input
                                type="text"
                                className="form-control"
                                id="currency"
                                disabled
                                name="waiverCurrency"
                                value={accountNumber}
                            />

                        </div>

                        <div className="col-md-6 mb-12">
                            <label htmlFor="amount">Amount</label>
                            <input
                                name="waiverAmount"

                                type="text"
                                className="form-control"
                                id="amount"
                                disabled
                                required=""
                                value={amount}
                            />

                        </div>
                        <br />

                        {isWaiveable2 &&
                            <>
                                <div className="form-group col-md-12 mb-3">
                                    <div
                                        className=""
                                        style={{ paddingTop: 10 }}>
                                        <label
                                            className="custom-control-labelx"
                                        >
                                            Waive Charges: {isWaiveable}
                                        </label>
                                    </div>
                                </div>

                                <>
                                    <div className="col-md-12 mb-12">
                                        <label htmlFor="address">
                                            Reasons for waving Charges
                                    </label>
                                        <input
                                            type="text"
                                            name="waiverReason"
                                            value={waiverReason}
                                            className="form-control"
                                            placeholder="State Reason"
                                            disabled
                                        />

                                    </div>
                                </>
                            </>
                        }

                    </div>

                </div>
            </div>
        )
    }
}
