import React from "react";

const Header = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark text-light">
                <div className="container-fluid">
                    <a className="navbar-brand text-primary fs-1 fw-bolder" href="/">AllTraxs</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#/">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Contact</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
