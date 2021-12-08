import React, {PropsWithChildren} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Wrapper = (props: PropsWithChildren<any>) => {
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

export default Wrapper;