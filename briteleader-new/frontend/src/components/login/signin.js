import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import * as actions from '../../store/actions/auth';
import FacebookLogin from 'react-facebook-login';
import { toast } from 'react-toastify';
import * as base from '../env'
import 'react-toastify/dist/ReactToastify.css';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			validate : {
				username:1,
				password:1
			}
		};
	}
	handleSubmit = (e) => {
		e.preventDefault();
		let username = event.target.elements.username.value
		let password = event.target.elements.password.value
		if (username!='' && password!='') {
			axios.post(base.base_url+ '/myauth/login',{
				username:username,
				password:password
			}).then(res =>{
				this.props.onAuthSuccess(res)
			})
			.catch(err => {
				toast.error("Email or Password is Incorrect", {
					position: toast.POSITION.TOP_CENTER
					});
			});
			
		}
	}
	componentClicked=()=>{
		console.log('clicked');
	}
	responseFacebook=(response)=>{
		console.log(response)
	}
	render() {
		return (
			<div>
			
				<h3>Sign in</h3>
				<form onSubmit = {this.handleSubmit}>
					<div className="row">
						<div className="col-lg-12 no-pdd">
							<div className="sn-field">
								<input type="text" name="username" placeholder="Username"/>
								<i className="la la-user"></i>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<div className="sn-field">
								<input type="password" name="password" placeholder="Password"/>
								<i className="la la-lock"></i>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<div className="checky-sec">
								<div className="fgt-sec">
									<input type="checkbox" name="cc" id="c1"/>
									<label htmlFor="c1">
										<span className="float-left"></span>
										<small>Remember me</small>
									</label>
								</div>
								<a href="#" title="">Forgot Password?</a>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<button type="submit">Sign in</button>
						</div>
					</div>
				</form>
				<div className="login-resources">
					<h4>Login Via Social Account</h4>
					<ul>
						{/* <li><a href="#" title="" className="fb"><i className="fa fa-facebook"></i>Login Via Facebook</a></li> */}
						<li>
							<FacebookLogin
								className = 'dg-face'
								appId="1088597931155576"
								autoLoad={false}
								fields="name,email,picture"
								icon="fa-facebook"
								onClick={this.componentClicked}
								callback={this.responseFacebook} />
						</li>
						<li><a href="/api/accounts/google/login/" title="" className="tw"><i className="fa fa-google"></i>Login Via Google</a></li>
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
	loading: state.authReducer.loading,
	error: state.authReducer.error
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuthSuccess: (res) => dispatch(actions.authLoginSuccessProcess(res))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);