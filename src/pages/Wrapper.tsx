import React, {Dispatch, PropsWithChildren, SyntheticEvent, useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import {User} from "../classes/User";
import {connect} from "react-redux";
import setUser from "../redux/actions/setUserAction";
import {Navigate} from "react-router-dom";

const Wrapper = (props: PropsWithChildren<{ user: User, isUserLoading: boolean, isAuthenticated: boolean, setUser: any }>) => {
    const [redirectIfUnauthenticated, setLogout]: [boolean, any] = useState(!props.isUserLoading && !props.isAuthenticated);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('user');

                const user: User = response.data.data;

                props.setUser(new User(user.id, user.first_name, user.last_name, user.email, user.revenue));
            } catch (e) {
                props.setUser(new User());
            }
        })();
    }, []);

    const handleSignOut = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('logout', {});

        setLogout(true)
        props.setUser(new User())
    }

    if (redirectIfUnauthenticated) {
        console.log('redirect login');
        return <Navigate to={'/login'}/>;
    }

    return (
        <>
            <Header handleSignOut={handleSignOut}/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </>
    )
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

export default connectToRedux(Wrapper);