
import React, { Component } from 'react';

export default class AppInfo extends Component {

    handleDeleteActionClick(entity) {
        this.props.handleDeleteActionClick(entity);
    }

    onDisableActionClick() {
        this.props.onDisableActionClick();
    }

    onEnableActionClick() {
        this.props.onEnableActionClick();
    }

    callRoleModal() {
        this.props.callRoleModal();
    }

    render() {
        const { roles, userProfile } = this.props;
        const { processing } = this.props;

        const roleLists = () => {
            if (roles) {
                return roles.map((entity, indx) => {
                    return (
                        <tr key={indx}>
                            <td>{indx + 1}</td>
                            <td>{entity.name}</td>
                            <td onClick={this.handleDeleteActionClick.bind(this, entity)} style={{ cursor: 'pointer' }}>
                                Delete
                                {/* {entity && entity.cardStatus === 'Active' ? 'Hotlist' : 'ReIssue'} */}
                            </td>
                        </tr>
                    )
                })
            }
        }

        return (
            <div className="table-responsive">
                <div class="container">
                    {userProfile && (userProfile.status == 1 || userProfile.status == "1") &&
                        <div class="button">
                            <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                onClick={this.callRoleModal.bind(this)}
                            >
                                Add/Update Role
                            </button>
                        </div>
                    }


                    {userProfile && (userProfile.status == 1 || userProfile.status == "1") &&
                        <div class="button">
                            <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                onClick={this.onDisableActionClick.bind(this)}
                            >
                                Disable User
                            </button>
                        </div>
                    }

                    {userProfile && (userProfile.status == 2 || userProfile.status === "2") &&
                        <div class="button">

                            <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                onClick={this.onEnableActionClick.bind(this)}
                            >
                                Enable User
                            </button>
                        </div>
                    }


                </div>


                <table className="table table-striped">
                    <thead className="thead-">
                        <tr>
                            <th>
                                &nbsp;
                            </th>
                            <th style={{ width: '90%' }}> Role Name </th>
                            <th>
                                {processing &&
                                    <div style={{ color: '#036' }}>
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    </div>}
                                Action
                            </th>

                            <th>
                                {processing &&
                                    <div style={{ color: '#036' }}>
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    </div>}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {roleLists()}
                    </tbody>
                </table>
            </div>
        )
    }
}
