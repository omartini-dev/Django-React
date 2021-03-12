import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './store/reducers/index';
import App from './components/App';
import LoginApp from './components/LoginApp';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhances(
	applyMiddleware(thunk)
));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
)
const loginapp = (
	<Provider store={store}>
		<LoginApp />
	</Provider>
)
if(document.getElementById('app')!=null)
	ReactDOM.render(app, document.getElementById('app'));
else
	ReactDOM.render(loginapp, document.getElementById('login'));