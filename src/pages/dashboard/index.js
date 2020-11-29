import React, { Component } from 'react';
import ContentHeader from "../../components/ContentHeader";

export default class index extends Component {
    state = {
        token: {},
        hasToken: false
    }

    componentWillMount() {
        var ls = sessionStorage.getItem("wm.auth");

        if (ls) {
            var token = JSON.parse(ls);

            if (token && token.fullName) {
                this.setState({ hasToken: true, token });
            }
            
        }
    }

    render() {
        return (
            <>
                <ContentHeader title="Dashboard" />
                {this.state.hasToken && this.state.token &&
                    <div>
                        Welcome {this.state.token.fullName}.
                    </div>
                }
            </>
        )
    }
}
