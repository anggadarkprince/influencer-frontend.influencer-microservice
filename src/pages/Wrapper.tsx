import React, {Dispatch, PropsWithChildren, useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import {User} from "../classes/User";
import {connect} from "react-redux";
import setUser from "../redux/actions/setUserAction";

const Wrapper = (props: PropsWithChildren<any>) => {

    useEffect(() => {
        (async () => {
            const response = await axios.get('user');

            const user: User = response.data.data;

            props.setUser(new User(user.id, user.first_name, user.last_name, user.email, user.revenue));
        })();
    }, []);

    return (
        <>
            <Header/>
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