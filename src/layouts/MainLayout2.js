import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import Header from '../components/Layouts/Header';
import MainContent from '../components/Layouts/MainContent';
import SideBar from '../components/Layouts/SideBar';

const history = createBrowserHistory();

export default class MainLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // isAuthenticate: false
        };
    }

    componentDidMount = async () => {
        // const auth0 = sessionStorage.getItem("wm.auth");

        // if (auth0 && auth0 !== 'null') {
        //    // ok
        // } else {
        //     sessionStorage.removeItem("wm.auth");
        //     history.push("/login");
        //     window.location.reload();
        // }
    }

    render() {
        const { children } = this.props;

        return (
            <div className="app">
                <Header />
                <SideBar />
                <MainContent>
                    {children}
                </MainContent>
            </div >
        )
    }

}
