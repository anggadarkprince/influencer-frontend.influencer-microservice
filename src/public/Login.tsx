import React, {Component, Dispatch, SyntheticEvent} from 'react';
import './Public.css';
import * as Icon from "react-feather";
import axios from "axios";
import {Navigate, Link} from "react-router-dom";
import {User} from "../classes/User";
import setUser from "../redux/actions/setUserAction";
import {connect} from "react-redux";

class Login extends Component<{user: User, isUserLoading: boolean, isAuthenticated: boolean, setUser: any}> {
    email = '';
    password = '';
    state = {
        redirect: !this.props.isUserLoading && this.props.isAuthenticated,
        info: {
            type: null,
            message: null
        }
    }

    submitLoginForm = async (e: SyntheticEvent) => {
        e.preventDefault();

        this.setState({info: {type: null, message: null}})

        try {
            const response = await axios.post('login', {
                email: this.email,
                password: this.password,
                scope: 'influencer'
            });
            const user: User = Object.assign(new User(), response.data.user);

            this.props.setUser(user);

            //localStorage.setItem('token', response.data.token);
            //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            this.setState({
                redirect: true
            });
        } catch (e: any) {
            let type: string = 'warning';
            let message = '';
            if (e.response.status === 401) {
                type = 'danger';
                message = 'Username or password wrong';
            } else {
                message = e.response.statusText || e.message
            }
            this.setState({
                info: {
                    type: type,
                    message: message
                }
            })
        }
    }

    render() {
        if (this.state.redirect || (!this.props.isUserLoading && this.props.isAuthenticated)) {
            return <Navigate to={'/'} />;
        }

        return (
            <main className="form-signin text-center mt-5">
                <form onSubmit={this.submitLoginForm}>
                    <Icon.Lock size={48} className="mb-3 text-primary"/>
                    <h1 className="h3 fw-normal mb-1">Please Sign In</h1>
                    <p className="text-muted mb-4">Continue to influencer private page</p>

                    {
                        this.state.info.message &&
                        <div className={`text-start alert alert-${this.state.info.type || 'info'}`}>
                            {this.state.info.message || ''}
                        </div>
                    }

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInputEmail"
                               placeholder="name@example.com"
                        onChange={e => this.email = e.target.value}/>
                        <label htmlFor="floatingInputEmail">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"
                               onChange={e => this.password = e.target.value}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-success mt-3" type="submit">Sign in</button>
                    <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
                    <p className="mt-4 mb-3 text-muted">&copy; Copyright all rights reserved</p>
                </form>
            </main>
        );
    }
}

const mapStateToProps = (state: {user: User, isLoading: boolean, isAuthenticated: boolean}) => {
    return {
        user: state.user,
        isUserLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

const connectToRedux = connect(mapStateToProps, mapDispatchToProps)

export default connectToRedux(Login);