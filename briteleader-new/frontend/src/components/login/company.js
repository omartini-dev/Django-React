import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import * as actions from '../../store/actions/auth';
import { ValidatorForm  } from 'react-form-validator-core';
import TextValidator from './textvalidator.js';
import * as base from '../env'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CompanySignup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			validate : {
				first_name:1,
				last_name:1,
				email:1,
				password1:1,
			},
				com_name:'',
				com_country:'',
				com_mail:'',
				com_password:'',
				com_confirm:'',
				com_agree:false,
		};
	}
	handleSubmit=()=>{

		if(this.state.com_agree == true && this.state.com_password == this.state.com_confirm){
			const postObj = {
				first_name: this.state.com_name,
				last_name: '123',
				country:'serbia',
				email: this.state.com_mail,
				position: 'B',
				password1: this.state.com_password,
				password2: this.state.com_confirm,
				phone_no:'123456789',
				is_company:true,
				is_professional:false
			}
			axios.post(base.base_url+ '/rest-auth/registration/', postObj)
			.then(res => {
				this.props.onAuth(postObj.email, postObj.password1);
			})
			.catch(error => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
						if(error.response.data.email != null){
							toast.error(error.response.data.email[0], {
								position: toast.POSITION.TOP_CENTER
						  });
						}
						if(error.response.data.password1 != null){
							toast.error(error.response.data.password1[0], {
								position: toast.POSITION.TOP_CENTER
						  });
						}
				
					} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js

					} else {
					// Something happened in setting up the request that triggered an Error

					}
				
			})

		}
	}
	NamehandleChange =(e)=>{
		this.setState({com_name: e.target.value});
	}
	countryhandleChange =(e)=>{
		this.setState({com_country: e.target.value});
	}
	mailhandleChange =(e)=>{
		this.setState({com_mail: e.target.value});
	}
	PasswordhandleChange =(e)=>{
		this.setState({com_password: e.target.value});
	}
	confirmhandleChange=(e)=>{
		this.setState({com_confirm: e.target.value});
	}
	agreecheck=(e)=>{
		this.setState({com_agree: !this.state.com_agree},()=>{
		});
	}
	render() {
		return (
			<div>
				<ValidatorForm
					ref = 'form'
					onSubmit = {this.handleSubmit} >
						
					<div className="row">
						<div className="col-lg-12 no-pdd">
							<div className="sn-field">
								<TextValidator
									onChange={this.NamehandleChange}
									name = "text"
									type = 'text'
									value = {this.state.com_name}
									placeholder="Company Name"
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<i className="la la-building"></i>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<div className="sn-field">
								<TextValidator
									onChange={this.countryhandleChange}
									name = "text"
									type = 'text'
									value = {this.state.com_country}
									placeholder="Country Name"
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<i className="la la-globe"></i>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<div className="sn-field">
								<TextValidator
									onChange={this.mailhandleChange}
									name = "email"
									type = 'email'
									value = {this.state.com_mail}
									validators={['required', 'isEmail']}
									placeholder="E-mail"
                					errorMessages={['this field is required', 'email is not valid']}
								/>
								<i className="la la-mail-bulk"></i>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<div className="sn-field">
								<TextValidator
									onChange={this.PasswordhandleChange}
									name = "password"
									type="password"
									value = {this.state.com_password}
									placeholder="Password"
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<i className="la la-lock"></i>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<div className="sn-field">
								<TextValidator
									onChange={this.confirmhandleChange}
									name = "password"
									type = "password"
									value = {this.state.com_confirm}
									placeholder="confirmpassword"
									validators={['required']}
									errorMessages={['this field is required']}
								/>
								<i className="la la-lock"></i>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<div className="checky-sec st2">
								<div className="fgt-sec">
									<input type="checkbox" name="cc" id="c3" onClick ={this.agreecheck}/>
									
									<label htmlFor="c3">
										<span></span>
									</label>
									<small> Yes, I understand and agree to the workwise Terms & Conditions.</small>
								</div>
							</div>
						</div>
						<div className="col-lg-12 no-pdd">
							<button type="submit" value="submit">Get Started</button>
						</div>
					</div>
				</ValidatorForm>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
	token: state.authReducer.token
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(CompanySignup);
