import React, { Component } from 'react';

export default class LoginLayout extends Component {
    render() {
        const { children } = this.props;
        let imgUrl = "assets/images/img-1.png";

        return (
            <main className="auth auth-floated">

                <div id="announcement" className="auth-announcement" style={{ backgroundImage: `url(${imgUrl})` }}>
                    <div className="announcement-body">
                        <h1 className="announcement-title" style={{ fontSize: 42 }}> Card Management Portal </h1>
                    </div>
                </div>

                {children}

            </main>
        )
    }
}

