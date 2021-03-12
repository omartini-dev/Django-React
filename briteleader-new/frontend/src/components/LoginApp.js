import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { ToastContainer } from 'react-toastify';
import Signin from './login/signin';
import Signup from './login/signup';

class LoginApp extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	flag:window.location.href.indexOf('signup')
    };
  }
	render() {
		return (
			<div className="login-sec">
				<ul className="sign-control">
					<li data-tab="tab-1" className={this.state.flag>-1 ? '' : 'current'}><a href="#" title="">Sign in</a></li>				
					<li data-tab="tab-2" className={this.state.flag>-1 ? 'current' : ''}><a href="#" title="">Sign up</a></li>				
				</ul>			
				<div className={this.state.flag>-1 ? 'sign_in_sec' : 'sign_in_sec current'} id="tab-1">
					<Signin />
				</div>
				<div className={this.state.flag>-1 ? 'sign_in_sec current' : 'sign_in_sec'} id="tab-2">
					<Signup />
				</div>
				<ToastContainer autoClose="2000" hideProgressBar={true}/>
			</div>
		)
	}
	componentDidMount(){
		this.props.onTryAutoSignup();
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.authReducer.token !== null
	}
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginApp);