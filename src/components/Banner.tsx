import React from 'react';

const Banner = () => {

    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Influencer Profile</h1>
                    <p className="lead text-muted">Something short and leading about the collection below—its contents, the
                        creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it
                        entirely.
                    </p>
                    <div>
                        <a href="#" className="btn btn-primary my-2 mx-1">Login</a>
                        <a href="#" className="btn btn-outline-secondary my-2 mx-1">Register</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;