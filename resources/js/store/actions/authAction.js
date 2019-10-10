import axios from 'axios';
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

import {
    AUTHENTICATION_PASS,
    AUTHENTICATION_ERROR,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    REGISTER_PASS,
    REGISTER_FAILED} from './authTypes';

export const signIn = (credentials,history) => {
    return (dispatch, getState) => {
        axios.post('/api/login',{
            ...credentials
        })
            .then(res => {
                getUser(dispatch,res.data.auth_token,history);
            })
            .catch(err => {
                dispatch({ type:AUTHENTICATION_ERROR, payload:err.response.data});
            });
    }
};


const getUser = (dispatch,token,history) => {
    axios.get('/api/me',{ headers: {Authorization: 'Bearer ' + token } })
        .then(res => {
           let user = res.data.user;
            user.token = token;
            localStorage.setItem('user',JSON.stringify(user));
            dispatch({ type:AUTHENTICATION_PASS,payload:user});
            window.Echo = new Echo({
             broadcaster: 'pusher',
             key:'ea19bd84cc434abe5e92',
             cluster:'eu',
             encrypted: true,
             auth: {
                        headers: {
                            Authorization: 'Bearer ' + user.token,
                        },
                    },
            });
            history.push('/');
        })
        .catch(err => {
            dispatch({ type:AUTHENTICATION_ERROR, payload:err.response.data});
        });
};

export const signOut = () => {
    return (dispatch) => {
        let user  = JSON.parse(localStorage.getItem('user'));
       axios.get('/api/logout',{ headers: {Authorization: 'Bearer ' + user.token } })
            .then(res => {
                localStorage.removeItem('user');
                dispatch({ type:LOGOUT_SUCCESS });
            })
            .catch(err => {
                dispatch({ type:LOGOUT_ERROR, payload:err.response });
            });
    }
};

export const signUp = (credentials,history) => {
    return (dispatch) => {
        axios.post('/api/signup',{
            ...credentials
        })
            .then(res => {
                dispatch({type:REGISTER_PASS,payload:res.data.message});
               history.push('/login');
            })
            .catch(err => {
                dispatch({ type:REGISTER_FAILED, payload:'account could not be created'});
            });
    }
};
