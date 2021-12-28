import React, {Dispatch, PropsWithRef} from "react";
import {User} from "../classes/User";
import setUser from "../redux/actions/setUserAction";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Header = (props: PropsWithRef<any>) => {
    let action = (
        <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
        </li>
    );

    if (props.user.isAuthenticated) {
        action = <>
            <li className="nav-item">
                <Link to={'/'} className="nav-link" onClick={() => localStorage.clear()}>Logout</Link>
            </li>
            <li className="nav-item">
                <a className="btn btn-outline-primary" href="/profile">{props.user.first_name}</a>
            </li>
        </>
    }
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <a href="#" className="navbar-brand d-flex align-items-center">
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
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/stats">Stats</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/rankings">Rankings</a>
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