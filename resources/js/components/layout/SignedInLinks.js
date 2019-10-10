import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { signOut } from "../../store/actions/authAction";

const SignedInLinks = (props) => {
    const { user } = props;
    return (
       <ul className="right">
           <li><NavLink to="/create-project">New Project</NavLink></li>
           <li><a onClick={props.signOut}>Log Out</a></li>
           <li><NavLink to="/" className="btn btn-floating pink lighten-1">{ user.name }</NavLink></li>
       </ul>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut:() => dispatch(signOut()),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignedInLinks);
