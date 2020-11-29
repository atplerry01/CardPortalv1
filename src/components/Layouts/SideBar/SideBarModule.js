import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SideBarPage from './SideBarPage';

export default class SideBarModule extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            appModule: []
        };
    }

    async componentDidMount() {
        const appModule = await this.getAppModule();
        this.setState({ appModule });
    }

    render() {
        const { category, modules, menu, userMenu } = this.props;

        // modules associated to category

        // all modules in category
        var moduleMenus = menu.filter(m => m.categoryName === category.categoryName);

        // var unique = myArray.filter((v, i, a) => a.indexOf(v) === i); 
        var categoryModule = moduleMenus.map(item => item.module)
            .filter((value, index, self) => self.indexOf(value) === index);


        const moduleLists = () => {
            let hasSubMenu = false;
            if (categoryModule) {
                return categoryModule.map((entity, indx) => {

                    const r = userMenu.filter(c => c.module === entity)[0];

                    if (r !== undefined) {
                        const checkexternal = menu.filter(x => x.module === entity && x.external_link === true)[0];

                        // the the module item
                        const module = this.state.appModule.filter(m => m.module === entity)[0];
                        const menuModule = menu.filter(m => m.module === entity)[0];

                        let subMenuPart = [];
                        let subMenu = [];

                        hasSubMenu = module && module.hasChildren ? true : false;

                        // get users access to the module
                        const userMod = userMenu.filter(a => a.module === menuModule.module);

                        userMod.forEach(element => {
                            // find the related access menu
                            subMenuPart = menu.filter(x => x.module === menuModule.module && x.access === element.role);
                            subMenuPart.forEach(element => {
                                subMenu.push(element)
                            });
                        });

                        return (
                            <>
                                {entity && hasSubMenu &&
                                    <li key={indx} className="menu-item has-child has-active">
                                        <a href="#" className="menu-link">{menuModule.moduleName}</a>
                                        <ul className="menu">
                                            <SideBarPage menu={subMenu} />
                                        </ul>
                                    </li>
                                }

                                {entity && !hasSubMenu &&
                                    <li key={indx} className="menu-item">
                                        {!checkexternal && <Link to={menuModule.page_link} className="menu-link ">{menuModule.moduleName}</Link>}
                                        {checkexternal && <a href={menuModule.page_link} target="_blank" className="menu-link">{menuModule.moduleName}</a>}
                                    </li>
                                }
                            </>
                        )
                    }

                })
            }
        }

        return (
            <>
                {moduleLists()}
            </>
        )
    }

    getAppModule() {
        return fetch(`/data/module.json`)
            .then(r => r.json())
            .then(data => {
                return data;
            });
    }
}
