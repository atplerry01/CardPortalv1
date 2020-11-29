import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import AccountDetailDisplay from "../../components/Cards/AccountDetailDisplay";
import CustomerDetailDisplay from "../../components/Cards/CustomerDetailDisplay";
import ExistingCardTable from "../../components/Cards/ExistingCardTable";
import HotListReason from "../../components/Cards/HotListReason";
import TableWithRadio from "../../components/Cards/TableWithRadio";
import ContentHeader from '../../components/ContentHeader';
import SelectInput from "../../components/form/SelectInput";
import { cardHotlistService, cardService, issuanceService, lookupService } from "../../services/cards";
import { lookupBranchDropDown } from "../../services/selector/branch-selectors";
import { lookupCardDropDown } from "../../services/selector/card-selectors";
import { lookupHotlistCode } from "../../services/selector/hotlistCode";

export default class DebitCards extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            issuanceType: "New",
            hasAccount: false,
            isWaiveabeChecked: false,
            isSearchStage: true,
            isSubmitStage: false,
            isCardTypeSelected: false,
            isBranchSelected: false,
            selectedRadioItem: {},
            deliveryBranchSol: "",
            isLinkAccSelected: false,
            showHotListBox: false,
            processHotList: false,
            isSubmiting: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAccountQuerySubmit = this.handleAccountQuerySubmit.bind(this);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.submitClose = this.submitClose.bind(this);
    }

    //1. Query Account
    handleAccountQuerySubmit = async e => {
        e.preventDefault();

        const { accountNumber } = this.state;

        var acctNo = JSON.stringify(accountNumber);
        sessionStorage.setItem("acctno", acctNo);

        this.setState({
            isSearchStage: !this.state.isSearchStage,
            isSubmitStage: !this.state.isSubmitStage,
            accountNumber
        });

        const queryResult = await this.getAccountQuery(accountNumber);

        if (queryResult && queryResult.accountDetails) {
            this.setState({
                accountDetail: queryResult.accountDetails,
                cardProducts: queryResult.cardProducts,
                cards: queryResult.cards,
                customerDetails: queryResult.customerDetails,
                linkedAccounts: queryResult.linkedAccounts,
                hasAccount: true,
                pendingRequests: queryResult.pendingRequests
            });
        }

        // get the cards details
        if (
            this.state.cards &&
            Array.isArray(this.state.cards) &&
            this.state.cards.length > 0
        ) {
            this.setState({ showModal: true });
        }
    };

    // 2. Hotlisting
    handleCardHostList = async entity => {

        if (entity && entity.cardStatus === "Active") {
            this.setState({ processHotList: true, selectedHostlist: entity });
        } else if (entity && entity.cardStatus === "HotListed") {
            this.setState({
                hasAccount: true,
                showModal: false,
                selectedPan: entity.id,
                issuanceType: "ReIssue",
                isCardTypeSelected: true,
                fee: entity.fee,
                waiverAmount: entity.fee,
                waiverCurrency: entity.currency,
                rCardName: entity.name,
                cardBin: entity.name
            });
        }
    };

    handleHotlistReasonSubmit = async entity => {
        this.setState({ showModal: true });
        const { selectedHostlist } = this.state;

        const model = {
            reasonCode: entity.hotListReason,
            comment: entity.hotListReason + '|' + entity.comment,
            requestor: this.state.tokenBody ? this.state.tokenBody.userName : "",
            requestBranchSolId: this.state.tokenBody ? this.state.tokenBody.branch : "",
            maskedPan: selectedHostlist.maskedPAN,
            pan: selectedHostlist.id
        };

        const queryResult = await this.hotListCard(model);

        if (queryResult.success) {
            const queryResult = await this.getAccountQuery(this.state.accountNumber);
            if (queryResult && queryResult.accountDetails) {
                this.setState({
                    accountDetail: queryResult.accountDetails,
                    cardProducts: queryResult.cardProducts,
                    cards: queryResult.cards,
                    customerDetails: queryResult.customerDetails,
                    linkedAccounts: queryResult.linkedAccounts,
                    hasAccount: true,
                    pendingRequests: queryResult.pendingRequests,
                    processHotList: false
                });
            }

            if (this.state.cards && Array.isArray(this.state.cards) && this.state.cards.length > 0) {
                this.setState({ showModal: true });
            }
        }
    };

    // 3. Ending process
    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ isSubmiting: true });
        const {
            accountDetail,
            customerDetails,
            cardProductId,
            deliveryBranchId,
            selectedLinkedAccount,
            tokenBody
        } = this.state;

        const mobno =
            customerDetails.mobileNumber === null ? "" : customerDetails.mobileNumber;

        const requestDetails = {
            requestBranchSolId: tokenBody ? tokenBody.branch : "",
            accountNo: accountDetail.accountNumber,
            accountName: accountDetail.accountName,
            cif: accountDetail.accountCIF,
            cardBin:
                this.state.issuanceType === "New" ? cardProductId : this.state.cardBin,
            currency: accountDetail.currency,
            accountSolId: accountDetail.accountSol,
            accountType: accountDetail.accountType,
            mobileNo: mobno,
            contactAddress: customerDetails.address,
            email: customerDetails.email,
            secondaryAccount: selectedLinkedAccount
                ? selectedLinkedAccount.accountNumber
                : "",
            secondaryAccountType: selectedLinkedAccount
                ? selectedLinkedAccount.accountType
                : "",
            deliverySolId: this.state.selectedBranch
                ? this.state.selectedBranch.soL_ID
                : "", // deliverySolId,
            deliveryAddress: deliveryBranchId,
            charge: this.state.waiverAmount,
            isWaived: this.state.isWaiveabeChecked,
            waiverReason:
                this.state.waiverReason !== undefined ? this.state.waiverReason : "",
            requestor: tokenBody ? tokenBody.userName : "",
            schemeCode: accountDetail.schemeCode,
            pan: this.state.issuanceType === "New" ? "" : this.state.selectedPan
        };

        this.setState({ showModal: false, requestDetails });

        const submitCardReq = await this.submitCardRequest(requestDetails);

        // TODO:
        console.log(submitCardReq);
    };

    handleChange(e) {
        e.preventDefault();

        const { cardProducts, pendingRequests } = this.state;
        const { name, value } = e.target;

        if (name === "cardProductId" && value === "") {
            this.setState({ isCardTypeSelected: false });
        }

        if (name === "cardProductId" && value !== "") {
            const selectedCard = cardProducts.filter(f => f.bin === value);
            const pendingResult = pendingRequests.filter(
                f => f.cardType === selectedCard[0].bin
            );

            if (
                pendingResult &&
                Array.isArray(pendingResult) &&
                pendingResult.length > 0
            ) {
                Swal.fire({
                    confirmButtonColor: "#800080",
                    text: "Already have pending Request",
                    icon: "warning"
                }).then(result => {
                    if (result.value) {
                        this.setState({ isCardTypeSelected: false });
                    }
                });
            }

            this.setState({
                isCardTypeSelected: true,
                isSelectedCardWaiveable: selectedCard[0].isWaiveable,
                waiverAmount: selectedCard[0].fee,
                waiverCurrency: selectedCard[0].currency
            });
        }

        ///
        if (name === "deliveryBranchId" && value === "") {
            this.setState({ isBranchSelected: false });
        }

        if (name === "deliveryBranchId" && value !== "") {
            this.getSelectedBranch(value);
            this.setState({ isBranchSelected: true });
        }

        this.setState({ [name]: value });
    }

    cancelProcess = async e => {
        e.preventDefault();
        window.location = "cards/issuance/debit-cards";
    };

    // 4. Other Process
    handleRadioChange(item) {
        this.setState({
            selectedRadioItem: item,
            selectedLinkedAccount: item,
            isLinkAccSelected: true
        });
    }

    getInitialState() {
        return { showModal: false };
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    submitClose() {
        this.setState({
            isSearchStage: true,
            hasAccount: false,
            isWaiveabeChecked: false,
            isSubmitStage: false,
            isCardTypeSelected: false
        });
        this.close();
    }

    toggleChange = () => {
        this.setState({
            isWaiveabeChecked: !this.state.isWaiveabeChecked
        });
    };

    async componentDidMount() {
        var auth2 = sessionStorage.getItem("wm.auth");
        const tokenBody = (auth2 !== null) ? JSON.parse(auth2) : '';
        this.setState({ tokenBody });

        fetch(`/data/hotlist.json`)
            .then(r => r.json())
            .then(data => {
                this.setState({
                    hotlistReason: data
                });
            });

        await this.getDeliveryBranchSol();
    }

    render() {
        const { accountNumber, isSearchStage, isSubmitStage } = this.state;

        return (
            <>
                <ContentHeader title="Debit Cards" />

                <div className="page-section">
                    <div className="section-block">
                        <div className="row">

                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title"> Card Profiling </h4>

                                        <div className="form-group">
                                            <label htmlFor="accountNumber">
                                                <span className="list-icon">
                                                    {/* <span className="oi oi-circle-check text-success"></span> */}
                                                </span>
                                                Account Number
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="accountNumber"
                                                value={accountNumber || ""}
                                                onChange={this.handleChange}
                                                placeholder="Enter account number"
                                                required=""
                                                disabled={this.state.isSubmitStage}
                                            />
                                            <div className="invalid-feedback">
                                                {" "}
                                                Your Account Number is required.{" "}
                                            </div>
                                        </div>

                                        {this.state.hasAccount &&
                                            this.renderCardProfiling()}

                                        {isSearchStage && (
                                            <button
                                                className="btn btn-primary btn-lg btn-block"
                                                type="submit"
                                                onClick={this.handleAccountQuerySubmit}
                                                disabled={!this.state.accountNumber}
                                            >
                                                Search
                                            </button>
                                        )}
                                        {isSubmitStage && (
                                            <>
                                                <Button
                                                    className="btn btn-primary"
                                                    onClick={this.handleSubmit}
                                                    disabled={
                                                        !this.state.isCardTypeSelected ||
                                                        !this.state.isBranchSelected
                                                    }
                                                    style={{ marginRight: 10 }}
                                                >
                                                    Submit Request
                                                </Button>

                                                <Button
                                                    className="btn btn-secondary"
                                                    onClick={this.cancelProcess.bind(this)}
                                                    style={{ color: "#000" }}
                                                >
                                                    Cancel
                                                </Button>
                                                {this.state.isSubmiting && <div style={{ color: '#036' }}>
                                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                    Please wait ...
							                    </div>}

                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-8">
                                {this.state.hasAccount && this.renderAcountDetail()}
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
                        <Modal.Title>{this.state.modalTitle}Hotlist Card(s)</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.processHotList && this.renderHotListProcess()}
                        {!this.state.processHotList && this.renderModalContent()}
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

            </>
        )
    }

    //#region Render
    renderModalContent = () => {
        const { cards } = this.state;
        return (
            <ExistingCardTable cards={cards} handleAction={this.handleCardHostList} />
        );
    };

    renderHotListProcess = () => {
        const { hotlistReason } = this.state;
        const hotlistReasonData = lookupHotlistCode(hotlistReason);

        return (
            <HotListReason
                reasons={hotlistReasonData}
                handleSubmit={this.handleHotlistReasonSubmit}
            />
        );
    };


    renderCardProfiling = () => {
        const {
            cardProducts,
            cardProductId,
            deliveryBranchId,
            isWaiveabeChecked,
            isCardTypeSelected,
            deliveryBranches,
            waiverReason,
            waiverAmount,
            waiverCurrency,
            issuanceType,
            rCardName
        } = this.state;

        const cardProductLists = lookupCardDropDown(cardProducts);
        const deliveryBranchLists = lookupBranchDropDown(deliveryBranches);

        const dropCardProducts = () => {
            if (cardProductLists && issuanceType === "New") {
                return (
                    <SelectInput
                        name="cardProductId"
                        label="Card Products"
                        value={cardProductId}
                        onChange={this.handleChange}
                        defaultOption="Select Card Products"
                        options={cardProductLists}
                    />
                );
            } else if (issuanceType === "ReIssue") {
                return (
                    <input
                        type="text"
                        className="form-control"
                        id="rCardName"
                        disabled
                        required=""
                        value={rCardName}
                        style={{ marginBottom: 10 }}
                    />
                );
            }
        };

        const dropDeliveryBranches = () => {
            if (deliveryBranchLists) {
                return (
                    <SelectInput
                        label="Delivery Branches"
                        name="deliveryBranchId"
                        value={deliveryBranchId}
                        onChange={this.handleChange}
                        defaultOption="Select Delivery Branch"
                        options={deliveryBranchLists}
                    />
                );
            }
        };

        return (
            <>
                {dropCardProducts()}

                {isCardTypeSelected && (
                    <>
                        <div className="form-row">
                            <div className="col-md-6 mb-12">
                                <label htmlFor="currency">Currency</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="currency"
                                    disabled
                                    name="waiverCurrency"
                                    value={waiverCurrency}
                                />
                                <div className="invalid-feedback">
                                    {" "}
                                    Valid first name is required.{" "}
                                </div>
                            </div>

                            <div className="col-md-6 mb-12">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    name="waiverAmount"
                                    value={waiverAmount}
                                    onChange={this.handleChange}
                                    type="text"
                                    className="form-control"
                                    id="amount"
                                    disabled
                                    required=""
                                />
                                <div className="invalid-feedback">
                                    {" "}
                                    Valid last name is required.{" "}
                                </div>
                            </div>
                            <br />

                            {this.state.isSelectedCardWaiveable && (
                                <>
                                    <div className="form-group col-md-12 mb-3">
                                        <div className="custom-control custom-switch">
                                            <input
                                                type="checkbox"
                                                value={this.state.isWaiveabeChecked}
                                                onChange={this.toggleChange}
                                                className="custom-control-input"
                                                id="customSwitch1"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="customSwitch1"
                                            >
                                                Waive Charges
                                            </label>
                                        </div>
                                    </div>

                                    {isWaiveabeChecked && (
                                        <>
                                            <div className="col-md-12 mb-12">
                                                <label htmlFor="address">
                                                    Reasons for waving Charges
                        </label>
                                                <input
                                                    type="text"
                                                    name="waiverReason"
                                                    value={waiverReason}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                    id="address"
                                                    placeholder="State Reason"
                                                    required=""
                                                />
                                                <div className="invalid-feedback">
                                                    {" "}
                                                    Reasons for waving Charges.{" "}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <hr className="mb-4" />

                        {dropDeliveryBranches()}
                        {this.state.selectedBranch && this.state.selectedBranch.address && (
                            <div>
                                <strong>Selected Branch: </strong> <br />
                                {this.state.selectedBranch
                                    ? this.state.selectedBranch.address
                                    : ""}
                            </div>
                        )}

                        <hr className="mb-4" />
                    </>
                )}
            </>
        );
    };

    renderAcountDetail = () => {
        const {
            selectedRadioItem,
            accountDetail,
            linkedAccounts,
            customerDetails,
        } = this.state;

        const dataHeader = [
            {
                name: "accountName",
                title: "AccountName",
                isCurrency: false,
                isDate: false,
                isNumber: false
            },
            {
                name: "accountNumber",
                title: "AccountNumber",
                isCurrency: false,
                isDate: false,
                isNumber: false
            },
            {
                name: "accountSol",
                title: "AccountSol",
                isCurrency: false,
                isDate: false,
                isNumber: false
            }
        ];

        return (
            <div className="card">
                <AccountDetailDisplay accountDetail={accountDetail} />

                <CustomerDetailDisplay customerDetails={customerDetails} />

                <TableWithRadio
                    dataHeader={dataHeader}
                    dataBody={linkedAccounts}
                    name="bank_table3"
                    selectedRadioItem={selectedRadioItem}
                    handleRadioChange={this.handleRadioChange.bind(this)}
                />

            </div>
        );
    };
    //#endregion

    getAccountQuery = async accountNumber => {
        return await issuanceService.instanceQueryService(accountNumber)
            .then(res => {
                return res.data;
            },
                error => console.log("error")
            );
    };

    getLinkedAccountQuery = async () => {
        return await issuanceService.linkedAccountQueryService().then(
            res => {
                return res;
            },
            error => console.log("error")
        );
    };

    getDeliveryBranchSol = async () => {
        return await lookupService.getDeliveryBranch().then(
            res => {
                this.setState({ deliveryBranches: res.data });
                return res;
            },
            error => console.log("error")
        );
    };

    getSelectedBranch = async solId => {
        const filterdResult = this.state.deliveryBranches.filter(
            f => f.name === solId
        );
        this.setState({
            selectedBranch: filterdResult[0],
            deliverySolId: filterdResult[0].sol_ID
        });
    };

    hotListCard = async model => {
        return await cardHotlistService
            .SubmitCardHotlist(model)
            .then(resp => {
                return {
                    success: true,
                    data: resp.data
                };
            })
            .catch(error => {
                return {
                    success: false,
                    data: error.message
                };
            });
    };

    submitCardRequest = async accountNumber => {

        return await cardService.submitCardRequest(accountNumber).then(
            resp => {

                if (resp.success) {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: "Request Successfully Processed",
                        icon: "success"
                    }).then(result => {
                        if (result.value) {
                            window.location = "cards/issuance/debit-cards";
                        }
                    });
                } else {
                    Swal.fire({
                        confirmButtonColor: "#800080",
                        text: "Request Failed",
                        icon: "error"
                    }).then(result => {
                        if (result.value) {
                            window.location = "cards/issuance/debit-cards";
                        }
                    });
                }
            },
            error => {
                console.log("error")
            }
        );
    };


}
