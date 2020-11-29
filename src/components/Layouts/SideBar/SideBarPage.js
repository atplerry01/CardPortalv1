import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class SideBarPage extends Component {
    render() {
        const { menu } = this.props;
        
        const menuLists = () => {
            if (menu) {
                return menu.map((entity, indx) => {
                    return (
                        <li key={indx} className="menu-item">
                            <Link to={entity.page_link} className="menu-link ">{entity.page_name}</Link>
                        </li>
                    )
                })
            }
        }

        return (
            <>
                {menuLists()}
            </>
        )
    }
}
