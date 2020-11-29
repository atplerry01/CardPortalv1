import React, { Component } from 'react'
import FormGroupTextbox from './FormGroupTextbox'

export default class CardAccountDetail extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title"> Account Details </h4>

                    <div className="form-row">
                        <FormGroupTextbox size={12}
                            name={"accountNumber"}
                            label={"Account Number"}
                            value={"0232677575"}
                            isReadOnly={true}
                            disabled={true} />

                        <FormGroupTextbox size={12}
                            name={"cardType"}
                            label={"Card Type"}
                            value={"Master Card"}
                            isReadOnly={true}
                            disabled={true} />

                        <FormGroupTextbox size={12}
                            name={"cardType"}
                            label={"Charges"}
                            value={"Charges"}
                            isReadOnly={true}
                            disabled={true} />

                    </div>

                </div>
            </div>
        )
    }
}
