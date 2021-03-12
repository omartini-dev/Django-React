import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Lastitem from './showlastflight'
import Totalflight from './showtotalflight'

const token =localStorage.getItem('token');

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
class ShowInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ptarget:null,
			paction:null,
			authuser:'user'
		};
		// this.popupWindow = this.popupWindow.bind(this);
		// this.createExpContent = this.createExpContent.bind(this);
		// this.createEduContent = this.createEduContent.bind(this);
	}
	
	createExpContent = () =>{
		if(this.props.profile==null) return '';
		var exp_indents = this.props.profile.exp.map(function (value, index) {
			
				return (
					<div key={index}>
						<h4 >
						{value.job_title} 
						</h4>
						<pre><p id={'experience'+value.id}>{value.content}</p></pre>
					</div>
				);
			
			
		}, this);
		return exp_indents;
	}

	createEduContent = () =>{
		if(this.props.profile==null) return '';
		var edu_indents = this.props.profile.edu.map(function (value, index) {
			
				return (
					<div key={index}>
						<h4 >{value.school}, {value.diploma} </h4>
						<span>{value.start_date} - {value.end_date}</span>
						<pre><p id={'education'+value.id}>{value.content}</p></pre>
					</div>
				);
			
		}, this);
		
		return edu_indents;
	}

	createSkillContent = () =>{
		if(this.props.profile==null) return '';
		var skill_indents = this.props.profile.profile.skills.split(',').map(function (value, index) {
			if(value.trim()=='') return '';
			return (
				<li key={index}><a title="">{value}</a></li>
			);
		}, this);
		
		return skill_indents;
	}


	render() {
		
		return (
			<div>
				<Tabs>
					<div className="tab-feed st2 settingjb ">
						<TabList>
							<Tab className="animated fadeIn" selectedClassName="active">
									<i className = 'fas fa-2x fa-book-open'></i>
									<span>Overview</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<i className = 'fas fa-2x fa-calendar-check'></i>
									<span>Experience</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<i className = 'fas fa-2x fa-graduation-cap'></i>
									<span>Education</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<i className = 'fas fa-2x fa-plane'></i>
									<span>LogBook</span>
							</Tab>
							
						</TabList>
					</div>
						<TabPanel className="fade" selectedClassName="animated fadeIn current">
							<div className="user-profile-ov">
								<h3>Overview</h3>
								<hr/>
								<pre><p id="overview-content">{this.props.profile?this.props.profile.profile.overview:null}</p></pre>
							</div>
							<div className="user-profile-ov">
								<h3>Skills</h3>
								<hr/>
								<ul>
									{this.createSkillContent()}
								</ul>
							</div>
						</TabPanel>
						<TabPanel className="fade" selectedClassName="animated fadeIn current">
							<div className="user-profile-ov st2">
								<h3>Experience</h3>
								<hr/>
								{this.createExpContent()}
							</div>
						</TabPanel>

						<TabPanel className="fade" selectedClassName="animated fadeIn current">
							<div className="user-profile-ov">
								<h3>Education</h3>
								<hr/>
								{this.createEduContent()}
							</div>
						</TabPanel>

						<TabPanel className="fade" selectedClassName="animated fadeIn current">
							<div className ='user-profile-ov'>
								<Totalflight/>
							</div>
							<div className ='user-profile-ov'>
								
								<Lastitem />
							</div>
						</TabPanel>
						
				</Tabs>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		
		profile:state.contentReducer.profile,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		popupStart: (ptarget, paction, pdata, targetId) => dispatch(actions.popupStart(ptarget, paction, pdata, targetId)) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowInfo);