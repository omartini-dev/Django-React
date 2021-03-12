import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import * as actions from '../../store/actions/auth';
import * as base from '../env'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProfessionalSignup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name_flag:true,
			last_name_flag:true,
			email_flag:true,
			password1_flag:true,
			password2_flag:true,
			terms_flag:true,
		};
	}
	handleFormSubmit = (e) => {
		event.preventDefault();
		this.setState({first_name_flag : true});
		this.setState({last_name_flag : true});
		this.setState({email_flag : true});
		this.setState({password1_flag : true});
		this.setState({password2_flag : true});
		this.setState({terms_flag : true});
		const postObj = {
			first_name: event.target.elements.first_name.value,
			last_name: event.target.elements.last_name.value,
			email: event.target.elements.email.value,
			position: event.target.elements.position.value,
			password1: event.target.elements.password1.value,
			password2: event.target.elements.password2.value,
			country:'Serbia',
			is_comapany:false,
			is_professional:true
		}
		let terms = event.target.elements.terms.checked;

		let goflag = true;
		if(postObj['first_name']==''){
			this.setState({first_name_flag : false});
			goflag = false;
		}
		if(postObj['last_name']==''){
			this.setState({last_name_flag : false});
			goflag = false;
		}
		if(postObj['email']==''){
			this.setState({email_flag : false});
			goflag = false;
		}
		if(postObj['password1']==''){
			this.setState({password1_flag : false});
			goflag = false;
		}
		if(postObj['password2']!=postObj['password1']){
			this.setState({password2_flag : false});
			goflag = false;
		}
		if(! terms){
			this.setState({terms_flag : false});
			goflag = false;
		}
		if(! goflag) return false;
		axios.post(base.base_url+ '/rest-auth/registration/', postObj)
		.then(res => {
			this.props.onAuth(postObj.email, postObj.password1);
		})
		.catch(err => {
			console.log(err)
			
					if(err.response.data.email != null){
							toast.error(err.response.data.email[0], {
								position: toast.POSITION.TOP_CENTER
						  });
						}
					if(err.response.data.password1 != null){
							toast.error(err.response.data.password1[0], {
								position: toast.POSITION.TOP_CENTER
						  });
						}
			
		})
	};
	render() {
		return (
		<div>
			<form onSubmit = {this.handleFormSubmit}>
				<div className="row">
					<div className="col-lg-6 no-pdd">
						<div className={this.state.first_name_flag?'sn-field':'sn-field has-error'}>
							<input type="text" name="first_name" placeholder="First Name"/>
							<i className="la la-user"></i>
						</div>
					</div>
					<div className="col-lg-6 no-pdd">
						<div className={this.state.last_name_flag?'sn-field':'sn-field has-error'}>
							<input type="text" name="last_name" placeholder="Last Name"/>
						</div>
					</div>
					<div className="col-lg-12 no-pdd">
						<div className={this.state.email_flag?'sn-field':'sn-field has-error'}>
							<input type="email" name="email" placeholder="Email"/>
							<i className="la la-globe"></i>
						</div>
					</div>
					<div className="col-lg-12 no-pdd">
						<div className="sn-field">
							<select name="position">
								<option value="P">Pilot</option>
								<option value="C">Cabin Crew</option>
								<option value="M">Maintenance</option>
								<option value="O">Office</option>
							</select>
							<i className="la la-dropbox"></i>
							<span><i className="fa fa-ellipsis-h"></i></span>
						</div>
					</div>
					<div className="col-lg-12 no-pdd">
						<div className={this.state.password1_flag?'sn-field':'sn-field has-error'}>
							<input type="password" name="password1" placeholder="Password"/>
							<i className="la la-lock"></i>
						</div>
					</div>
					<div className="col-lg-12 no-pdd">
						<div className={this.state.password2_flag?'sn-field':'sn-field has-error'}>
							<input type="password" name="password2" placeholder="Repeat Password"/>
							<i className="la la-lock"></i>
						</div>
					</div>
					<div className="col-lg-12 no-pdd">
						<div className="checky-sec st2">
							<div className={this.state.terms_flag?'fgt-sec':'fgt-sec has-error'}>
								<input type="checkbox" name="terms" id="c2"/>
								<label htmlFor="c2">
									<span className="float-left"></span>
								<small>Yes, I understand and agree to the workwise Terms & Conditions.</small>
								</label>
							</div>
						</div>
					</div>
					<div className="col-lg-12 no-pdd">
						<button type="submit" value="submit">Get Started</button>
					</div>
				</div>
			</form>
		</div>
		);
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
export default connect(mapStateToProps,mapDispatchToProps)(ProfessionalSignup);