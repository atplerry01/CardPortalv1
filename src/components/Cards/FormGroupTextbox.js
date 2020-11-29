import React, { Component } from 'react';

export default class FormGroupTextbox extends Component {
    render() {
        const { size, label, value, disabled } = this.props;

        return (
            <div className={`col-md-${size}`} style={{paddingBottom: 10}}>
                <label htmlFor="currency">{label}</label>
                <input
                    type="text"
                    className="form-control"
                    disabled={disabled}
                    value={value}
                />
                <div className="invalid-feedback">
                    {" "}
                    Valid first name is required.{" "}
                </div>
            </div>
        )
    }
}
