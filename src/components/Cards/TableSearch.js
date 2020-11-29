import React, { Component } from 'react';

export default class TableSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.props.searchValue(value);
        this.setState({ [name]: value });
    }

    render() {
        const { search } = this.state;

        return (
            <div className="row">
                <div className="form-inline">
                    <div className="form-group mx-sm-2 mb-2">
                        <label for="inputPassword2" className="sr-only">Search</label>
                        <input type="text"
                            className="form-control"
                            id="search"
                            name="search"
                            value={search}
                            onChange={this.handleChange}
                            placeholder="Search"
                        />
                    </div>
                </div>
            </div>

        )
    }
}
