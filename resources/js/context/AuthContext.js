import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component{

    state = {
        isLoggedIn: false
    }
    toggleAuth = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn})
    }

    render() {
       return (
           <AuthContextProvider values={{...this.state, toggleAuth:this.toggleAuth}}>
               {this.props.children}
           </AuthContextProvider>
       )
    }
}

export default AuthContextProvider;

