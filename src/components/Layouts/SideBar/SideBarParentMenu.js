import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SideBarModule from './SideBarModule';

export default class SideBarParentMenu extends Component {

    async componentDidMount() {
        const appCategory = await this.getAppCategory();
        this.setState({ appCategory });
    }

    render() {
        const { parents, appMenu, userMenu } = this.props;

        let newCategory = [];
        let newUserCategory = [];
        // users parants lists
        if (userMenu) {
            userMenu.forEach(u => {
                const x = appMenu.filter(a => a.module === u.module);
                if (x[0] !== undefined) {
                    const nn = {
                        name: x[0].categoryName,
                        categoryName: x[0].categoryName
                    }
                    newCategory.push(nn);
                }
            })
        }

        // distinct array
        var newCat = newCategory.map(item => item.categoryName).filter((value, index, self) => self.indexOf(value) === index);

        if (newCat.length > 0) {
            newCat.forEach(n => {
                const a = this.state.appCategory.filter(f => f.categoryName === n)
                const p = {
                    id: a[0].id,
                    order: a[0].order,
                    name: a[0].name,
                    categoryName: a[0].categoryName
                };

                newUserCategory.push(p);
            });
        }

        const parentLists = () => {

            newUserCategory.sort(this.compareValues('order', 'asc'));

            if (newUserCategory) {
                
                return newUserCategory.map((entity, indx) => {

                    return (
                        <li key={indx} className="menu-item has-child has-active">
                            <Link to="#" className="menu-link ">
                                <span className="menu-icon far fa-file"></span>
                                <span className="menu-text">{entity.name}</span>
                            </Link>

                            <ul className="menu">
                                <SideBarModule key={indx} category={entity} menu={appMenu} userMenu={userMenu} />
                            </ul>
                        </li>
                    )
                })
            }
        }

        return (
            <>{parentLists()}</>
        )
    }

    getAppCategory() {
        return fetch(`/data/category.json`)
            .then(r => r.json())
            .then(data => {
                return data;
            });
    }

    compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }


}
