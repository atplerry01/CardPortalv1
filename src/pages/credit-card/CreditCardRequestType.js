import React, { Component } from 'react';
import ContentHeader from "../../components/ContentHeader";
import CustomerTypeForm from "./CustomerTypeForm";

export default class CreditCardRequestType extends Component {
    render() {
        return (
            <>
                <ContentHeader
                    title={"Credit Card Request Type"}
                />
                <CustomerTypeForm
                    customerType={'retail'}
                    handleChange={console.log('ok')}
                    values={''}
                />
            </>
        )
    }
}
