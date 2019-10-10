import React, { Component } from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import ProjectDetails from './projects/ProjectDetails';
import { connect } from 'react-redux';
import { allProjects } from '../store/actions/projectAction';
import Navbar from './layout/Navbar';
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

import CreateProject from "./projects/CreateProject";
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

class App extends Component {
    constructor() {
        super();
         const user =  JSON.parse(localStorage.getItem('user'));
         if (user) {
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
         }
    }

    render() {
        // document.getElementById("app-title").innerHTML = "App component";
        return (
            <React.Fragment>
               <BrowserRouter>
                 <div className="App">
                     <Navbar/>
                    <Switch>
                        <Route exact path="/" component={ Dashboard }/>
                        <Route path="/project/:project_id" component={ ProjectDetails }/>
                        <Route path="/login" component={ SignIn }/>
                        <Route path="/register" component={ SignUp }/>
                        <Route path="/create-project" component={ CreateProject }/>
                    </Switch>
                 </div>
               </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default App;
