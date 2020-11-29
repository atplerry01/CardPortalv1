import React, { Component } from 'react';

export default class index extends Component {
    render() {
        const { title } = this.props;

        return (
            <header className="page-title-bar">

                <h1 className="page-title"> { title } </h1>
            </header>
        )
    }
}
