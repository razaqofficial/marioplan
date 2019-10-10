import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {

    state = {
        email:'',
        password:'',
    };

    handleSubmit = (e) => {
        e.preventDefault();
       this.props.signIn(this.state,this.props.history);
    };

    handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      });
    };

    render() {
        const { authError,isLoggedIn,registerPass } =  this.props;
        if(isLoggedIn) return <Redirect to="/"/>;

        return (
            <React.Fragment>
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="white">
                        { registerPass ? <button type="button" className="waves-effect waves-light btn"> { registerPass } </button> : null }
                        { authError ? <button type="button" className="btn red"> { authError } </button> : null }
                        <h5 className="grey-text text-darken-3">Sign In</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Login</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        authError:state.auth.authError,
        isLoggedIn: state.auth.loggedIn,
        registerPass: state.auth.registerPass,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn:(credentials,history) => dispatch(signIn(credentials,history)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
