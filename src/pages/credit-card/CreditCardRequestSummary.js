import React, { Component } from 'react';
import ContentHeader from "../../components/ContentHeader";
import FacilityRequestedForm from "./FacilityRequestedForm";

export default class CreditCardRequestSummary extends Component {
    render() {
        return (
            <>
                <ContentHeader
                    title={"Credit Card Requisition Summary"}
                />
                
                <FacilityRequestedForm
                    customerType={'retail'}
                    handleChange={console.log('ok')}
                    values={''}
                />
            </>
        )
    }
}
