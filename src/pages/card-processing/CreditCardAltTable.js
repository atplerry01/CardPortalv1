import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import TableWithCheckBox from "../../components/Cards/TableWithCheckBox";
import { cardService } from "../../services/cards"; ///

export default class CreditCardAltTable extends Component {
  constructor(props, context) {
    super(props, context);
    // console.log(props);
    this.state = {
      search: "",
      selectedCheckedItems: [],
      requestDataHeader: [
        {
          name: "cardAccountNo",
          title: "cardAccountNo",
          isCurrency: false,
          isDate: false,
          isNumber: false,
        },
        {
          name: "cardAccountName",
          title: "cardAccountName",
          isCurrency: false,
          isDate: false,
          isNumber: false,
        },
        {
          name: "altAccountNo",
          title: "Account Number",
          isCurrency: false,
          isDate: false,
          isNumber: false,
        },
        {
          name: "altAccountName",
          title: "Alt Account Name",
          isCurrency: false,
          isDate: false,
          isNumber: false,
        },
        {
          name: "customerType",
          title: "customerType",
          isCurrency: false,
          isDate: false,
          isNumber: false,
        }
      ],
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.submitClose = this.submitClose.bind(this);

    this.onDeleteRequest = this.onDeleteRequest.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleDataReload = () => {
    this.props.handleDataReload();
  }

  handleChange(e) {
    e.preventDefault();
    const { requestCards } = this.state;
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
        selectedCheckedItems: checkedItems,
      });
      return;
    } else {
      const cc = selectedCheckedItems.length - 1;

      if (cc > 0) {
        this.setState({ canComment: true });
      } else {
        this.setState({ canComment: false });
      }
    }

    const checkedItems = selectedCheckedItems.filter((obj) => obj !== item);

    this.setState({
      selectedCheckedItems: checkedItems,
    });
  }

  handleCheckboxAllClick(isChecked) {
    const { searchedList } = this.state;

    if (isChecked) {
      this.setState({
        selectedCheckedItems: [searchedList],
        canComment: true,
      });
      return;
    }

    this.setState({
      selectedCheckedItems: [],
      canComment: false,
    });
  }

  onNavButtonClick(entity) {
    const {
      history: { location },
    } = this.props;
    const { pathname } = location;

    sessionStorage.setItem("wm.cmp." + entity.cardAccountNo, JSON.stringify(entity));
    this.props.history.push(`${pathname}/${entity.cardAccountNo}`);
  }

  onDeleteRequest() {
    Swal.fire({
      title: "Are you sure you want to delete????",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "purple",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.value) {
        this.processSubmit();
        Swal.fire({ text: "Deleted", confirmButtonColor: "purple" });
        this.handleDataReload();
        // this.props.history.push(`/cards/credit-cards/alternate-accounts`);
      }
    });
  }

  processSubmit = async () => {
    const { selectedCheckedItems } = this.state;

    const reformatedArray = [];
    selectedCheckedItems.forEach((entity) => {
      reformatedArray.push(entity.cardAccountNo);
    });

    await this.submitSelectedRequest(reformatedArray);
  };

  render() {
    const { requestDataHeader, selectedCheckedItems, canComment } = this.state;
    const { searchedList } = this.props;

    return (
      <>
        <div className="page-section">
          <div className="section-block">
            <div className="row">
              <div className="col-xl-12">
                {searchedList && (
                  <TableWithCheckBox
                    dataHeader={requestDataHeader}
                    dataBody={searchedList}
                    headerCheckBoxId="table2"
                    selectedCheckedItems={selectedCheckedItems}
                    handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                    handleCheckboxAllClick={this.handleCheckboxAllClick.bind(
                      this
                    )}
                    onNavClick={this.onNavButtonClick.bind(this)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {canComment && (
          <Button
            size="sm"
            color="secondary"
            onClick={this.onDeleteRequest.bind(this)}
          >
            Delete
          </Button>
        )}
      </>
    );
  }

  submitSelectedRequest = async (items) => {
    const resp = await cardService.deleteCardAccount(items);
    if (resp.success) {
      this.setState({ reason: "", canComment: false });
      // get new items

    }
  };

  getPendingCards = async () => {
    return fetch(`/data/requestcards.json`)
      .then((r) => r.json())
      .then((data) => {
        return data;
      });
  };
}
