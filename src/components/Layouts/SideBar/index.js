import React, { Component } from 'react';
import SideBarMenu from './SideBarMenu';

export default class index extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      issuanceType: "New",
    };
  }

  async componentDidMount() {
    const appCategory = await this.getAppCategory();
    const appMenu = await this.getAppMenu();
    let userMenu = []; // await this.getUserAccess();
    // let userMenu = await this.getUserAccess();

    var ls = sessionStorage.getItem("wm.auth");

    if (ls) {
      var token = JSON.parse(ls);
      if (token && token.roleMap) {
        userMenu = token.roleMap;
      }
    }
    
    const menus = [];
    // iterate thru user menu
    userMenu.forEach(entity => {
      const result = appMenu.filter(am => am.module === entity.role);
      menus.push(result);
    });

    /// get thirdparty menu
    let thirdparty = appMenu.filter(am => am.access === 'thirdparty');
    thirdparty.forEach(x => {
      userMenu.push({
        module: x.module,
        role: x.access
      })
    });

    this.setState({
      appCategory, appMenu, menus, userMenu
    })
  }

  render() {
    const { appCategory, appMenu, userMenu } = this.state;

    return (
      <aside className="app-aside app-aside-expand-md app-aside-light">

        <div className="aside-content">

          <header className="aside-header d-block d-md-none">

            <button className="btn-account" type="button" data-toggle="collapse" data-target="#dropdown-aside"><span className="user-avatar user-avatar-lg"><img src="assets/images/avatars/profile.jpg" alt="" /></span> <span className="account-icon"><span className="fa fa-caret-down fa-lg"></span></span> <span className="account-summary"><span className="account-name">Beni Arisandi</span> <span className="account-description">Marketing Manager</span></span></button>

            <div id="dropdown-aside" className="dropdown-aside collapse">

              <div className="pb-3">
                <a className="dropdown-item" href="user-profile.html"><span className="dropdown-icon oi oi-person"></span> Profile</a> <a className="dropdown-item" href="auth-signin-v1.html"><span className="dropdown-icon oi oi-account-logout"></span> Logout</a>
                <div className="dropdown-divider"></div><a className="dropdown-item" href="#">Help Center</a> <a className="dropdown-item" href="#">Ask Forum</a> <a className="dropdown-item" href="#">Keyboard Shortcuts</a>
              </div>
            </div>
          </header>

          <div className="aside-menu overflow-hidden">

            <nav id="stacked-menu" className="stacked-menu">
              <SideBarMenu
                category={appCategory}
                appMenu={appMenu}
                userMenu={userMenu} />
            </nav>
          </div>

        </div>
      </aside>

    )
  }

  getAppMenu() {
    return fetch(`/data/menu.json`)
      .then(r => r.json())
      .then(data => {
        return data;
      });
  }

  getAppCategory() {
    return fetch(`/data/category.json`)
      .then(r => r.json())
      .then(data => {
        return data;
      });
  }


  getUserAccess() {
    return fetch(`/data/user.json`)
      .then(r => r.json())
      .then(data => {
        return data;
      });

    // var ls = sessionStorage.getItem("wm.auth");

    // if (ls) {
    //   var token = JSON.parse(ls);
    //   // this.setState({ token });
    //   return token.roleMap
    // }

    return [];
  }

}
