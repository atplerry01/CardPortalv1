import { createBrowserHistory } from 'history';
import React, { Component } from 'react';

const history = createBrowserHistory()

export default class index extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    };
  }

  handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("wm.auth");
    history.push("/login");
    window.location.reload();
  }

  componentDidMount() {
    var ls = sessionStorage.getItem("wm.auth");

    if (ls) {
      var token = JSON.parse(ls);
      this.setState({ token });
    }
  }


  render() {
    const { token } = this.state;

    return (
      <header className="app-header app-header-dark">
        <div className="top-bar">
          <div className="top-bar-brand">
            <a href="index.html">Wema Card Portal</a>
          </div>

          <div className="top-bar-list">
            <div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">
              <button className="hamburger hamburger-squeeze" type="button" data-toggle="aside" aria-label="toggle menu"><span className="hamburger-box"><span className="hamburger-inner"></span></span></button>
            </div>


            <div className="top-bar-item top-bar-item-right px-0 d-none d-sm-flex">

              <div className="dropdown d-flex">
                <button className="btn-account d-none d-md-flex" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="user-avatar user-avatar-md">
                    <img src="assets/images/avatar.jpg" alt="" /></span>
                  <span className="account-summary pr-lg-4 d-none d-lg-block">
                    <span className="account-name">{token && token.fullName}</span>
                    <span className="account-description">{token && token.department}</span></span></button>
                <div className="dropdown-menu">
                  <div className="dropdown-arrow ml-3"></div>
                  <h6 className="dropdown-header d-none d-md-block d-lg-none"> {token && token.fullName} </h6>
                  <a className="dropdown-item" href="user-profile.html">
                    <span className="dropdown-icon oi oi-person"></span> Profile
                    </a>
                  <a onClick={this.handleLogout} className="dropdown-item" href="auth-signin-v1.html">
                    <span className="dropdown-icon oi oi-account-logout"></span> Logout</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Help Center</a>
                  <a className="dropdown-item" href="#">Ask Forum</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header >
    )
  }
}
