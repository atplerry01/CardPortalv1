import React, { Component } from "react";
import ContentHeader from "../../components/ContentHeader";
import { cardService } from "../../services/cards/card.service";
import SearchDisplayDetails from "./SearchDisplayDetails";
import SearchLinkedAccounts from "./SearchLinkedAccounts";

export default class CardSearchDetails extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchDetails: [],
    };
  }

  async componentDidMount() {
    const hashedPAN = this.props.match.params.id;

    const res = await this.getSearchDetails(hashedPAN);
  }

  render() {
    const { searchDetails } = this.state;

    return (
      <>
        <ContentHeader title="Card Search Details" />

        <SearchDisplayDetails searchDetail={searchDetails} />
        <SearchLinkedAccounts searchLinked={searchDetails} />
      </>
    );
  }

  getSearchDetails = async (hashedPAN) => {
    const resp = await cardService.getSearchDetail(hashedPAN);

    if (resp && resp.data) {
      this.setState({
        searchDetails: resp.data,
      });
    }
  };
}
