import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from "../../store/actions/authAction";

class SignUp extends Component {

    state = {
        email:'',
        password:'',
        name:''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state,this.props.history);

    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    render() {
        const {isLoggedIn,registerFailed } =  this.props;
        if(isLoggedIn) return <Redirect to="/"/>;
        return (
            <React.Fragment>
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="white">
                        { registerFailed ? <button type="button" className="btn red"> { registerFailed } </button> : null }
                        <h5 className="grey-text text-darken-3">Sign Up</h5>
                        <div className="input-field">
                            <label htmlFor="name">Fullname</label>
                            <input type="text" id="name" name="name" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Register</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        registerFailed: state.auth.registerFailed
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp:(credentials,history) => dispatch(signUp(credentials,history))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
