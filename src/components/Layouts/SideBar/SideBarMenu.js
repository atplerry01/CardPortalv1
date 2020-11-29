import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SideBarParentMenu from './SideBarParentMenu';

export default class SideBarMenu extends Component {
    render() {
        const { category, appMenu, userMenu } = this.props;

        return (
            <ul className="menu">
                <li className="menu-item">
                    <a href="index.html" className="menu-link"><span className="menu-icon fas fa-home"></span>
                        <span className="menu-text">Dashboard</span></a>
                </li>

                <li className="menu-item has-child has-active">
                    <a href="#" className="menu-link ">
                        <span className="menu-icon far fa-file"></span>
                        <span className="menu-text">Credit Card</span>
                    </a>

                    <ul className="menu">
                        <li className="menu-item">
                            <Link to="/cards/credit-card-request"  className="menu-link">New Request</Link>
                            <Link href=""  className="menu-link">Retails Team</Link>
                            <Link href=""  className="menu-link">Cards Team</Link>
                            <Link href=""  className="menu-link">Card Activation</Link>
                        </li>
                    </ul>
                </li>
                {/* 
                <li className="menu-item">
                    <a href="/cards/admin/user-profile" className="menu-link"><span className="menu-icon far fa-file"></span>
                        <span className="menu-text">User Management</span></a>
                </li>

                <li className="menu-item">
                    <a href="/cards/admin/lookup-package" className="menu-link"><span className="menu-icon far fa-file"></span>
                        <span className="menu-text">Lookup Package</span></a>
                </li> */}
                {/* 
                <li className="menu-item">
                    <a href="https://wema-hq-isi-app.wemabank.local/IssuancePortal/LoginPage.aspx?ReturnUrl=%2fIssuancePortal%2fDefault.aspx" className="menu-link" rel="noopener noreferrer" ><span className="menu-icon far fa-file"></span>
                        <span className="menu-text">Instant Card Issuance</span></a>
                </li> */}

                <SideBarParentMenu parents={category} appMenu={appMenu} userMenu={userMenu} />

            </ul>

        )
    }
}
