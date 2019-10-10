import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';
import App from './components/App';
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./store/reducers/rootReducer";
import thunk from 'redux-thunk';



const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(<Provider store={store}> <App /> </Provider>,document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
