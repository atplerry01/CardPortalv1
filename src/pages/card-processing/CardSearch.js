import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import HotListReason from "../../components/Cards/HotListReason";
import CardSearchTable from "../../components/Cards/Search/CardSearchTable";
import ContentHeader from "../../components/ContentHeader";
import { cardHotlistService, issuanceService } from "../../services/cards";
import { lookupHotlistCode } from "../../services/selector/hotlistCode";

export default class CardSearch extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      processing: false,
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAccountQuerySubmit = this.handleAccountQuerySubmit.bind(this);
    this.handleAccountQuerySubmit2 = this.handleAccountQuerySubmit2.bind(this);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submitClose = this.submitClose.bind(this);
  }

  handleAccountQuerySubmit2 = async () => {
    const { accountNumber } = this.state;
    const queryResult = await this.getAccountQuery(accountNumber);

    if (queryResult) {
      this.setState({
        cards: queryResult,
      });
    }
  };

  //1. Query Account
  handleAccountQuerySubmit = async (e) => {
    e.preventDefault();

    const { accountNumber } = this.state;

    var acctNo = JSON.stringify(accountNumber);
    sessionStorage.setItem("acctno", acctNo);

    this.setState({
      isSearchStage: !this.state.isSearchStage,
      isSubmitStage: !this.state.isSubmitStage,
      accountNumber,
    });

    const queryResult = await this.getAccountQuery(accountNumber);

    if (queryResult) {
      this.setState({
        cards: queryResult,
        hasAccount: true,
      });
    }

    // get the cards details
    if (
      this.state.cards &&
      Array.isArray(this.state.cards) &&
      this.state.cards.length > 0
    ) {
      // this.setState({ showModal: true });
    }
  };

  // 2. Hotlisting
  handleCardHostList = async (entity) => {
    if (entity && entity.cardStatus === "Active") {
      this.setState({
        showModal: true,
        processHotList: true,
        selectedHostlist: entity,
      });
    }
  };

  handleHotlistReasonSubmit = async (entity) => {
    this.setState({ showModal: false, processing: true });
    const { selectedHostlist } = this.state;

    const model = {
      reasonCode: entity.hotListReason.split("-")[0],
      comment: entity.hotListReason.split("-")[1] + "|" + entity.comment,
      requestor: this.state.auth ? this.state.auth.userName : "",
      requestBranchSolId: this.state.auth ? this.state.auth.branch : "",
      maskedPan: selectedHostlist.maskedPAN,
      pan: selectedHostlist.id,
    };

    const queryResult = await this.hotListCard(model);

    if (queryResult.success) {
      const queryResult = await this.getAccountQuery(this.state.accountNumber);
      if (queryResult && queryResult.accountDetails) {
        this.setState({
          processing: false,
          accountDetail: queryResult.accountDetails,
          cardProducts: queryResult.cardProducts,
          cards: queryResult.cards,
          customerDetails: queryResult.customerDetails,
          linkedAccounts: queryResult.linkedAccounts,
          hasAccount: true,
          pendingRequests: queryResult.pendingRequests,
          processHotList: false,
        });
      }

      if (
        this.state.cards &&
        Array.isArray(this.state.cards) &&
        this.state.cards.length > 0
      ) {
        this.setState({ showModal: false, processing: false });
        this.handleAccountQuerySubmit2();
      }
    } else {
      this.setState({ processing: false });
    }
  };

  handleChange(e) {
    e.preventDefault();

    const { cardProducts, pendingRequests } = this.state;
    const { name, value } = e.target;

    if (name === "cardProductId" && value === "") {
      this.setState({ isCardTypeSelected: false });
    }

    if (name === "cardProductId" && value !== "") {
      const selectedCard = cardProducts.filter((f) => f.bin === value);
      const pendingResult = pendingRequests.filter(
        (f) => f.cardType === selectedCard[0].bin
      );

      if (
        pendingResult &&
        Array.isArray(pendingResult) &&
        pendingResult.length > 0
      ) {
        Swal.fire({
          confirmButtonColor: "#800080",
          text: "Already have pending Request",
          icon: "warning",
        }).then((result) => {
          if (result.value) {
            this.setState({ isCardTypeSelected: false });
          }
        });
      }

      this.setState({
        isCardTypeSelected: true,
        isSelectedCardWaiveable: selectedCard[0].isWaiveable,
        waiverAmount: selectedCard[0].fee,
        waiverCurrency: selectedCard[0].currency,
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

  cancelProcess = async (e) => {
    e.preventDefault();
    window.location = "cards/cardsearch";
  };

  // 4. Other Process

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
      isCardTypeSelected: false,
    });
    this.close();
  }

  async componentDidMount() {
    var auth2 = sessionStorage.getItem("wm.auth");
    const auth = auth2 !== null ? JSON.parse(auth2) : "";
    const cardRef = this.props.match.params.id;

    const { tokenBody } = this.props;

    this.setState({ cardRef, auth, tokenBody });

    fetch(`/data/hotlist.json`)
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          hotlistReason: data,
        });
      });

    const x = "59-Fraud";
    const s = x.split("-");
  }

  render() {
    const {
      accountNumber,
      isSearchStage,
      isSubmitStage,
      hasAccount,
    } = this.state;

    return (
      <>
        <ContentHeader title="Cards Search" />

        <div className="page-section">
          <div className="section-block">
            <div className="row">
              <div className="col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="accountNumber">
                        <span className="list-icon">
                          {/* <span className="oi oi-circle-check text-success"></span> */}
                        </span>
                        Account/ Card Number
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="accountNumber"
                        value={accountNumber || ""}
                        onChange={this.handleChange}
                        placeholder="Enter Account or Card Number"
                        required=""
                        disabled={this.state.isSubmitStage}
                      />
                      <div className="invalid-feedback">
                        {" "}
                        Your Account Number is required.{" "}
                      </div>
                    </div>

                    {isSearchStage && (
                      <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                        onClick={this.handleAccountQuerySubmit}
                      >
                        Search
                      </button>
                    )}

                    {isSubmitStage && (
                      <>
                        {!hasAccount && (
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
                        )}

                        <Button
                          className="btn btn-secondary"
                          onClick={this.cancelProcess.bind(this)}
                          style={{ color: "#000" }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-xl-9">
                {this.state.hasAccount && this.renderModalContent()}
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
      </>
    );
  }

  //#region Render

  renderModalContent = () => {
    const { cards, processing } = this.state;
    return (
      <CardSearchTable
        processing={processing}
        cards={cards}
      />
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

  //#endregion

  getAccountQuery = async (accountNumber) => {
    return await issuanceService
      .instanceHotListQueryService(accountNumber)
      .then(
        (res) => {
          return res.data;
        },
        (error) => console.log("error")
      );
  };

  hotListCard = async (model) => {
    return await cardHotlistService
      .SubmitCardHotlist(model)
      .then((resp) => {
        return {
          success: true,
          data: resp.data,
        };
      })
      .catch((error) => {
        return {
          success: false,
          data: error.message,
        };
      });
  };
}
