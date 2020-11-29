import React, { Component } from 'react';

export default class ExistingCardTable extends Component {

    handleActionClick(entity) {
        this.props.handleAction(entity);
    }

    render() {
        const { cards } = this.props;
        const { processing } = this.props;

        const cardLists = () => {
            return cards.map((entity, indx) => {
                return (
                    <tr key={indx}>
                        <td>{indx + 1}</td>
                        <td>{entity.cardProduct}</td>
                        <td>{entity.linkedAccounts[0]}</td>
                        <td>{entity.maskedPAN}</td>
                        <td>{entity.expiryDate}</td>
                        <td>{entity.cardStatus}</td>
                        <td onClick={this.handleActionClick.bind(this, entity)} style={{ cursor: 'pointer' }}>
                            {entity && entity.cardStatus === 'Active' ? 'Hotlist' : 'ReIssue'}
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div className="table-responsive">

                <table className="table table-striped">

                    <thead className="thead-">
                        <tr>
                            <th data-style="min-width: 240px">
                                &nbsp;
                                </th>
                            <th> Card Product </th>
                            <th> Account Number </th>
                            <th> MaskedPAN </th>
                            <th> ExpiryDate </th>
                            <th> Status </th>
                            <th>
                                {processing &&
                                    <div style={{ color: '#036' }}>
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    </div>}

                                Action

                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {cardLists()}

                    </tbody>
                </table>
            </div>
        )
    }
}
