import React, { Component } from 'react';
import { authService } from "../../services/auth";

export default class index extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: "",
            submitted: false,
            errors: {},
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { username, password } = this.state;
        this.setState({ submitted: true });

        const res = await this.loginQuery(username, password);
        
        if (res && res.success) {
            // sessionStorage.setItem("wm.auth", JSON.stringify(res.data));
            sessionStorage.setItem("wm.auth", JSON.stringify(res.data));

            this.props.history.push("/cards/dashboard");
            window.location.reload();
        } else {
            if (res && res.data) {
                alert(res && res.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    }

    render() {
        const { username, password } = this.state;

        return (

            <form className="auth-form">
                <div className="mb-4">
                    <div className="mb-3">
                        <img className="rounded" src="assets/apple-touch-icon.png" alt="" height="72" />
                    </div>
                    <h1 className="h3"> Sign In </h1>
                </div>

                <div className="form-group mb-4">
                    <label className="d-block text-left" htmlFor="inputUser">Username</label>
                    <input
                        type="text"
                        id="inputUser"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        className="form-control"
                    />

                </div>

                <div className="form-group mb-4">
                    <label className="d-block text-left" htmlFor="inputPassword">Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        className="form-control"

                    />
                </div>

                <div className="form-group mb-4">

                    <button
                        onClick={this.handleSubmit}
                        className="btn btn-primary btn-block"
                        type="submit"
                    >
                        Sign In
                        </button>
                    {this.state.loading &&
                        <div style={{ color: '#036' }}>
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            Please wait ...
							</div>
                    }
                </div>

                <p className="mb-0 px-3 text-muted text-center"> © 2020 All Rights Reserved.
                <br /><br /><br />
                    <br /><br /><br />
                    <br /><br /><br />
                    <br /><br />
                </p>
            </form>

        )
    }

    loginQuery = async (username, password) => {
        this.setState({ loading: true });
        return await authService.loginQuery(username, password).then(
            res => {
                this.setState({ loading: false });
                return res;
            },
            _error => {
                this.setState({ loading: false });
                console.log("error")
            }
        );
    };

}
