
import React, { Component } from 'react';
import Swal from "sweetalert2";
import ApprovalBox from '../../components/Cards/ApprovalBox';
import TableSearch from '../../components/Cards/TableSearch';
import TableWithCheckBox from "../../components/Cards/TableWithCheckBox";
import ContentHeader from '../../components/ContentHeader';
import { cardService } from "../../services/cards";

export default class CardAuthorizer extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            search: '',
            selectedCheckedItems: [],
            requestDataHeader: [
                {
                    name: "accountName",
                    title: "Account Name",
                    isCurrency: false,
                    isDate: false,
                    isNumber: false
                },
                {
                    name: "accountNo",
                    title: "Account Number",
                    isCurrency: false,
                    isDate: false,
                    isNumber: false
                },
                {
                    name: "cif",
                    title: "CIF",
                    isCurrency: false,
                    isDate: false,
                    isNumber: false
                },
                {
                    name: "cardType",
                    title: "Card Type",
                    isCurrency: false,
                    isDate: false,
                    isNumber: false
                },
                {
                    name: "cardReference",
                    title: "CardReference",
                    isCurrency: false,
                    isDate: false,
                    isNumber: false
                }
            ]
        };


        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.submitClose = this.submitClose.bind(this);

        this.handleApprovalSubmit = this.handleApprovalSubmit.bind(this);
        this.handleRejectSubmit = this.handleRejectSubmit.bind(this);

    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    handleChange(e) {
        e.preventDefault();
        const { requestCards } = this.state;
        const { name, value } = e.target;
        this.setState({ [name]: value });

        if (name === 'search') {
            if (value === '') {
                this.setState({ fileteredSearch: requestCards });
            }

            this.processSearch()
        }
    }

    searchValue = (entity) => { 
        const { requestCards } = this.state;
        this.setState({ fileteredSearch: requestCards, search: entity });
        this.processSearch();
    }

    processSearch() {
        const { search, requestCards } = this.state;
        const fileteredSearch = [];

        requestCards.forEach(entity => {

            var accountNameSearch = entity.accountName.toLowerCase();
            var accountNoSearch = entity.accountNo.toLowerCase();
            var cardReferenceSearch = entity.cardReference.toLowerCase();
            var cardTypeSearch = entity.cardType.toLowerCase();
            var cifSearch = entity.cif.toLowerCase();
            var requestBranchSolIdSearch = entity.requestBranchSolId.toLowerCase();

            var accountName = accountNameSearch.includes(search.toLowerCase());
            var accountNo = accountNoSearch.includes(search.toLowerCase());
            var cardReference = cardReferenceSearch.includes(search.toLowerCase());
            var cardType = cardTypeSearch.includes(search.toLowerCase());
            var cif = cifSearch.includes(search.toLowerCase());
            var requestBranchSol = requestBranchSolIdSearch.includes(search.toLowerCase());

            if (accountName === true || accountNo === true || cardReference === true ||
                cardType === true || cif === true || requestBranchSol === true) {
                fileteredSearch.push(entity);
            }
            // const indx = finalResult.findIndex(f => f.ACCOUNTNO === x.FORACID.trim());
        });

        this.setState({ fileteredSearch });
    }

    submitClose() {
        this.setState({ canComment: false });
        this.close();
    }

    handleCheckboxChange(itemObject) {
        const { checked, item } = itemObject;
        const { selectedCheckedItems } = this.state;

        if (checked) {
            const cc = selectedCheckedItems.length + 1;
            if (cc > 0) {
                this.setState({ canComment: true });
            }

            const checkedItems = [...selectedCheckedItems, item];

            this.setState({
                selectedCheckedItems: checkedItems
            });
            return;
        } else {
            const cc = selectedCheckedItems.length - 1;

            if (cc > 0) {
                this.setState({ canComment: true });
            } else {
                this.setState({ canComment: false });
            }

            // if ((selectedCheckedItems.length - 1) > 0) {
            //   this.setState({ canComment: false })
            // }
        }

        const checkedItems = selectedCheckedItems.filter(obj => obj !== item);

        this.setState({
            selectedCheckedItems: checkedItems
        });
    }

    handleCheckboxAllClick(isChecked) {
        const { fileteredSearch } = this.state;

        if (isChecked) {
            this.setState({
                selectedCheckedItems: [...fileteredSearch], canComment: true
            });
            return;
        }

        this.setState({
            selectedCheckedItems: [], canComment: false
        });
    }

    onNavButtonClick(entity) {
        //`/authorizer/issuance/request-detail/${entity.cardReference}`
        const { history: { location } } = this.props
        const { pathname } = location;

        this.props.history.push(`${pathname}/${entity.cardReference}`);
    }


    handleApprovalSubmit() {
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
                this.processSubmit();
            }
        });
    }

    processSubmit = async () => {
        const { selectedCheckedItems } = this.state;

        const reformatedArray = [];

        selectedCheckedItems.forEach((entity) => {
            const newModel = {
                cardReference: entity.cardReference,
                requestor: this.props.tokenBody ? this.props.tokenBody.userName : '', // TODO
                role: 'authorizer',
                status: 'CA',
                comment: 'Ok'
            };

            reformatedArray.push(newModel);
        });

        await this.submitSelectedRequest(reformatedArray);
    }

    processRejectSubmit = async () => {
        const { selectedCheckedItems } = this.state;

        const reformatedArray = [];

        selectedCheckedItems.forEach((entity) => {
            const newModel = {
                cardReference: entity.cardReference,
                requestor: this.props.tokenBody ? this.props.tokenBody.userName : '',
                role: 'control',
                status: 'CR',
                comment: 'Ok'
            };

            reformatedArray.push(newModel);
        });

        await this.submitSelectedRequest(reformatedArray);
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

    componentDidMount = async () => {
        var auth2 = sessionStorage.getItem("wm.auth");
        const auth = (auth2 !== null) ? JSON.parse(auth2) : '';
        this.setState({ auth });

        await this.getPendingCardRequests(auth);
    }

    render() {

        const { requestDataHeader, fileteredSearch, selectedCheckedItems, canComment } = this.state;

        return (
            <>
                <ContentHeader title="Card Authorization" />

                <div className="page-section">
                    <div className="section-block">

                        <TableSearch searchValue={this.searchValue} />

                        <div className="row">

                            <div className="col-xl-12">
                                {requestDataHeader && fileteredSearch &&
                                    <TableWithCheckBox
                                        dataHeader={requestDataHeader}
                                        dataBody={fileteredSearch}
                                        headerCheckBoxId="table2"
                                        selectedCheckedItems={selectedCheckedItems}
                                        handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                                        handleCheckboxAllClick={this.handleCheckboxAllClick.bind(this)}
                                        onNavClick={this.onNavButtonClick.bind(this)}
                                    />
                                }
                            </div>

                        </div>
                    </div>
                </div>

                {canComment && 
                <ApprovalBox 
                    submitText = 'Submit C'
                    showComment={false} 
                    showReject = {true}
                    onApprovalSubmit={this.handleApprovalSubmit} 
                    onRejectSubmit={this.handleRejectSubmit} />}

            </>
        )
    }

    getPendingCardRequests = async (auth) => {
        const resp = await cardService.getPendingCardRequests("authorizer", auth.branch, 'CMP');
        this.setState({ requestCards: resp.data, fileteredSearch: resp.data });
    };

    submitSelectedRequest = async (items) => {
        const resp = await cardService.controlPostCardRequest(items);
        if (resp.success) {
            this.setState({ reason: '', canComment: false });
            await this.getPendingCardRequests(this.state.auth);
        }
    };

    getPendingCards = async () => {
        return fetch(`/data/requestcards.json`)
            .then(r => r.json())
            .then(data => {
                return data;
            });
    }


}
