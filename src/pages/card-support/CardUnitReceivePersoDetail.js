import React, { Component } from 'react';
import Swal from "sweetalert2";
import AccountDetailDisplay from "../../components/Cards/AccountDetailDisplay";
import ApprovalBox from '../../components/Cards/ApprovalBox';
import CustomerDetailDisplay from "../../components/Cards/CustomerDetailDisplay";
import RequestedCardAccountDetail from '../../components/Cards/RequestedCardAccountDetail';
import RequestedCardDetail from '../../components/Cards/RequestedCardDetail';
import ContentHeader from '../../components/ContentHeader';
import { cardService } from "../../services/cards/card.service";

export default class CardUnitReceivePersoDetail extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {

        };

        this.handleApprovalSubmit = this.handleApprovalSubmit.bind(this);
        this.handleRejectSubmit = this.handleRejectSubmit.bind(this);

    }

    handleApprovalSubmit(entity) {
        Swal.fire({
            title: "Are you sure you want to save this changes?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "purple",
            cancelButtonColor: "#d33",
            confirmButtonText: "save"
        }).then(result => {
            if (result.value) {
                this.processSubmit(entity);
            }
        });
    }

    handleRejectSubmit() {
        Swal.fire({
            title: "Are you sure you want to Decline this changes?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "purple",
            cancelButtonColor: "#d33",
            confirmButtonText: "save"
        }).then(result => {
            if (result.value) {
                this.processRejectSubmit();
            }
        });
    }

    processSubmit = async (entityVal) => {

        const reformatedArray = [];
        const newModel = {
            cardReference: this.props.match.params.id,
            requestor: this.state.auth.tokenBody ? this.state.auth.tokenBody.userName : '',
            role: "cards1",
            status: "R",
            comment: entityVal.reason
        };

        reformatedArray.push(newModel);

        await this.submitSelectedRequest(reformatedArray);
    };

    submitSelectedRequest = async items => {
        const resp = await cardService.controlPostCardRequest(items);

        if (resp.success) {
            this.props.history.push("/cards/unit/perso-receive");
        }
    };

    async componentDidMount() {
        var auth2 = sessionStorage.getItem("wm.auth");
        const auth = (auth2 !== null) ? JSON.parse(auth2) : '';
        const cardRef = this.props.match.params.id;

        this.setState({ cardRef, auth });

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
                                <ApprovalBox
                                    submitText='Submit'
                                    showComment={false}
                                    onApprovalSubmit={this.handleApprovalSubmit}
                                    onRejectSubmit={this.handleRejectSubmit} />
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
