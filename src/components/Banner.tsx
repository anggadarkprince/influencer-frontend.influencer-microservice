import React, {PropsWithRef, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {User} from "../classes/User";
import {connect} from "react-redux";

const Banner = (props: PropsWithRef<any>) => {
    const [title, setTitle] = useState('Welcome');
    const [description, setDescription] = useState('Share links and earn 10% of the product price!');

    useEffect(() => {
        if (props.user?.id) {
            setTitle('$' + Number(props.user?.revenue || 0).toLocaleString());
            setDescription('You have earned in total');
        }
    }, [props]);

    let buttons;

    if (props.user) {
        buttons = (
            <div>
                <Link to={'/stats'} className="btn btn-primary my-2">Stats</Link>
            </div>
        )
    } else {
        buttons = (
            <div>
                <Link to={'/login'} className="btn btn-primary my-2 mx-1">Login</Link>
                <Link to={'/register'} className="btn btn-outline-secondary my-2 mx-1">Register</Link>
            </div>
        );
    }

    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">{title}</h1>
                    <p className="lead text-muted">{description}</p>
                    {buttons}
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state: {user: User, isLoading: boolean, isAuthenticated: boolean}) => {
    return {
        user: state.user,
        isUserLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
    }
}

const connectToRedux = connect(mapStateToProps)

export default connectToRedux(Banner);