import React from 'react';
import { NavLink } from "react-router-dom";
import SingedInLinks from './SignedInLinks';
import SingedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
    const { isLoggedIn } = props;
    const links = isLoggedIn ? <SingedInLinks/> : <SingedOutLinks/>
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <div className="row">
                    <div className="left col s3 xs6 m3">
                        <NavLink  to="/" className="brand-logo">Mario Plan</NavLink>
                    </div>
                    <div className="right col s3 xs6 m9">
                        { links }
                    </div>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Navbar);
