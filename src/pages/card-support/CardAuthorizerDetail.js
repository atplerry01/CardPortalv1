
import React, { Component } from 'react';
import AccountDetailDisplay from "../../components/Cards/AccountDetailDisplay";
import ApprovalBox from '../../components/Cards/ApprovalBox';
import CustomerDetailDisplay from "../../components/Cards/CustomerDetailDisplay";
import RequestedCardAccountDetail from '../../components/Cards/RequestedCardAccountDetail';
import RequestedCardDetail from '../../components/Cards/RequestedCardDetail';
import ContentHeader from '../../components/ContentHeader';
import { cardService } from "../../services/cards/card.service";

export default class CardAuthorizerDetail extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {

        };

    }

    async componentDidMount() {
        const cardRef = this.props.match.params.id;
        this.setState({ cardRef });
        await this.getPendingCardRequestDetails(cardRef);
    }


    renderAcountDetail = () => {
        const {
            accountDetails,
            customerDetails,
        } = this.state;

        return (
            <div className="card">
                <AccountDetailDisplay accountDetail={accountDetails} />

                <CustomerDetailDisplay customerDetails={customerDetails} />
                {/* 
                <TableWithRadio
                    dataHeader={dataHeader}
                    dataBody={linkedAccounts}
                    name="bank_table3"
                    selectedRadioItem={selectedRadioItem}
                    handleRadioChange={this.handleRadioChange.bind(this)}
                /> */}

            </div>
        );
    };

    render() {
        const { requestDetails } = this.state;
        
        return (
            <>
                <ContentHeader title="Card Request Details" />

                <div className="page-section">
                    <div className="section-block">
                        <div className="row">

                            <div className="col-xl-4">
                                {requestDetails && requestDetails.card &&
                                    <RequestedCardDetail requestDetails={requestDetails} carddetails={requestDetails.card} />}
                                <ApprovalBox />
                            </div>

                            <div className="col-xl-8">
                                <RequestedCardAccountDetail requestDetails={requestDetails} />
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }

    getPendingCardRequestDetails = async (cardRef) => {
        const resp = await cardService.getPendingCardRequestDetails(cardRef);
        if (resp && resp.data) {
            this.setState({
                requestDetails: resp.data,
                accountDetails: resp.data.accountDetails,
                customerDetails: resp.data.customerDetails
            });
        }

    };

}
