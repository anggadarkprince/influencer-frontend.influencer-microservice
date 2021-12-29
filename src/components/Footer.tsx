import React from "react";

const Footer = () => {
    return (
        <footer className="text-muted py-5">
            <div className="container">
                <p className="float-end mb-1">
                    <a href="#top">Back to top</a>
                </p>
                <p className="mb-1">&copy; Influencer Shoplify, all rights reserved.</p>
                <p className="mb-0">Need source code? <a href="/">
                    Visit the homepage</a> or read our <a href="https://github.com/anggadarkprince/influencer-frontend.influencer-microservice">source code</a>.
                </p>
            </div>
        </footer>
    )
}

export default Footer;