// import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import jwtDecode from "jwt-decode";
import React from "react";
import { authService } from "../../services/auth";

const history = createBrowserHistory();

const Authorization = allowedRoles => WrappedComponent => {
    class AuthenticatedComponent extends React.Component {

        componentDidMount() {

            const auth0 = sessionStorage.getItem("wm.auth");

            if (auth0 && auth0 !== 'null') {
                const auth = JSON.parse(sessionStorage.getItem("wm.auth"));
                const access_token = jwtDecode(auth.token);
                const userRoles = auth.roleMap;

                let hasValidRoles = false;
                // get all roles
                if (userRoles && userRoles.length > 0) {
                    allowedRoles.forEach(element => {
                        const filterdResult = userRoles.filter(item => item.module === element.module && item.role === element.role);

                        if (filterdResult.length > 0) {
                            hasValidRoles = true;
                            return hasValidRoles;
                        }
                    });

                    if (!hasValidRoles) {
                        history.push("/login");
                        window.location.reload();
                    }
                }

                this.analyseAuthentication(auth, access_token);
            } else {
                sessionStorage.removeItem("wm.auth");
                history.push("/login");
                window.location.reload();
            }
        }

        analyseAuthentication = async (auth, access_token) => {
            var current_time = new Date().getTime() / 1000;
            const timeDiff = access_token.exp - current_time;
            const timeExpired = current_time > access_token.exp;

            if (typeof access_token.exp !== 'undefined' && current_time > access_token.exp) {
                sessionStorage.removeItem("wm.auth");
                history.push("/login");
                window.location.reload();
                throw new Error(`token expired`);
            } else {
                if (timeDiff < 300) {
                    const res = await this.getRefreshToken(auth.refreshToken);

                    if (res.success) {
                        var newAuth = {
                            userName: auth.userName,
                            fullName: auth.fullName,
                            branch: auth.branch,
                            department: auth.department,
                            token: res.data.token,
                            roleMap: auth.roleMap,
                            refreshToken: res.data.refreshToken
                        }

                        sessionStorage.setItem("wm.auth", JSON.stringify(newAuth));
                    } else {
                        sessionStorage.removeItem("wm.auth");
                        history.push("/login");
                        window.location.reload();
                        throw new Error(`token expired`);
                    }

                }
            }
        }

        processRefreshtoken(jwtToken) {
            if (jwtToken.refresh_token) {
                this.props.actions
                    .refreshToken(jwtToken.refresh_token)
                    .then(() => this.redirect())
                    .catch(error => {
                        //   //this.setState({ saving: false });
                    });
            }
        }

        render() {
            // return <Redirect to="/login" />
            return <WrappedComponent {...this.props} {...this.state} />;
        }

        getRefreshToken = async (refreshToken) => {
            this.setState({ loading: true });
            return await authService.refreshTokenQuery(refreshToken).then(
                res => {
                    this.setState({ loading: false });
                    return res;
                },
                _error => {
                    this.setState({ loading: false });
                }
            );
        };

    }

    return AuthenticatedComponent;
};

export default Authorization;
