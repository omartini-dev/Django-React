import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import * as actions from '../../store/actions/auth';
import CompanySignup from './company';
import ProfessionalSignup from './pro';
class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			validate : {
				first_name:1,
				last_name:1,
				email:1,
				password1:1
			}
		};
	}

	render() {
		return (
			<div>
			<div className="signup-tab">
				<i className="fa fa-long-arrow-left"></i>
				<h2>johndoe@example.com</h2>
				<ul>
					<li data-tab="tab-3" className="current"><a href="#" title="">User</a></li>
					<li data-tab="tab-4"><a href="#" title="">Company</a></li>
				</ul>
			</div>	
			<div className="dff-tab current" id="tab-3">
				<ProfessionalSignup {...this.props} />
			</div>
			<div className="dff-tab" id="tab-4">
				<CompanySignup {...this.props} />
			</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
	token: state.authReducer.token
	};
};

export default connect(mapStateToProps)(Signup);