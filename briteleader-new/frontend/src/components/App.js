import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import Layout from './layout/layout';

class App extends Component {
	render() {
		return (
			<Router>
				<Layout {...this.props}>
					<BaseRouter {...this.props}/>
				</Layout>
			</Router>
		)
	}
	componentDidMount(){
		
		if(localStorage.getItem('token')!=null){
			let token =localStorage.getItem('token');
			this.props.onTryAutoSignup(token);
			
		} else {
			this.props.onTryAutoSignup(null);
			window.location.href = "/home";
		}
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.authReducer.token !== null
	}
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: (token) => {
    	dispatch(actions.authCheckState(token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);