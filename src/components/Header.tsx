import React, {PropsWithRef} from "react";
import {User} from "../classes/User";
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";

const Header = (props: PropsWithRef<any>) => {
    let action = (
        <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
        </li>
    );

    if (props.isAuthenticated) {
        action = <>
            <li className="nav-item me-3">
                <Link to={'/logout'} className="nav-link" onClick={props.handleSignOut}>Logout</Link>
            </li>
            <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/profile">
                    {props.user.first_name + ' ' + props.user.last_name}
                </Link>
            </li>
        </>
    }
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <a href="/" className="navbar-brand d-flex align-items-center">
                    <strong>Influencer</strong>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/stats">Stats</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rankings">Rankings</NavLink>
                        </li>
                        {action}
                    </ul>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state: {user: User, isLoading: boolean, isAuthenticated: boolean}) => {
    return {
        user: state.user,
        isUserLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
    }
}

const connectToRedux = connect(mapStateToProps)

export default connectToRedux(Header);