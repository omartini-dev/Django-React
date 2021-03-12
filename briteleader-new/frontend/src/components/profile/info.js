import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Totalflight from './totalflight'
import Lastitem from './lastflight'
import Flightmodal from '../modals/flightinfo'

const token =localStorage.getItem('token');

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ptarget:null,
			paction:null,
			authuser:'user',
			modalshow:false,
		};
		this.popupWindow = this.popupWindow.bind(this);
		this.createExpContent = this.createExpContent.bind(this);
		this.createEduContent = this.createEduContent.bind(this);
	}
	popupWindow(target, action, id, index, e){
		e.preventDefault();
		// if(this.props.targetId==null)
		// 	action = 'create';
		let pdata = {content:'', job_title:''};
		if(id!=null){
			if(target=='overview'){
				pdata.content = this.props.profile.profile.overview;
			}
			if(target=='skills'){
				pdata.skills = this.props.profile.profile.skills;
			}
			if(target=='education'){
				pdata = this.props.profile.edu[index];
			}
			if(target=='experience'){
				pdata = this.props.profile.exp[index];
			}
		}
		this.props.popupStart(target, action, pdata, id);
		// userinfo.is_company
	}
	addflightinfo=(e)=>{
        e.preventDefault();
        this.setState({modalshow:true});
    }
	createExpContent = () =>{
		if(this.props.profile==null) return '';
		var exp_indents = this.props.profile.exp.map(function (value, index) {
			if(userinfo.is_company){
				return (
					<div key={index}>
						<h4 >
						{value.job_title} 
						</h4>
						<pre><p id={'experience'+value.id}>{value.content}</p></pre>
					</div>
				);
			}else{
				return (
					<div key={index}>
						<h4 id={'exptitle'+value.id} >
						{value.job_title} <a href="#" title="" onClick={(e) => this.popupWindow('experience', 'update', value.id, index, e)} ><i className="fa fa-pencil"></i></a> <a href="#" title="" onClick={(e)=>console.log('remove')} ><i className="fa fa-trash"></i></a>
						</h4>
						<pre><p id={'experience'+value.id}>{value.content}</p></pre>
					</div>
				);
			}
			
		}, this);
		return exp_indents;
	}

	createEduContent = () =>{
		if(this.props.profile==null) return '';
		var edu_indents = this.props.profile.edu.map(function (value, index) {
			if(userinfo.is_company){
				return (
					<div key={index}>
						<h4 >{value.school}, {value.diploma} </h4>
						<span>{value.start_date} - {value.end_date}</span>
						<pre><p id={'education'+value.id}>{value.content}</p></pre>
					</div>
				);
			}else{
				return (
					<div key={index}>
						<h4 >{value.school}, {value.diploma} <a href="#" title="" onClick={(e) => this.popupWindow('education', 'update', value.id, index, e)}><i className="fa fa-pencil"></i></a><a href="#" title="" onClick={(e)=>console.log("remove")}><i className="fa fa-trash"></i></a></h4>
						<span>{value.start_date} - {value.end_date}</span>
						<pre><p id={'education'+value.id}>{value.content}</p></pre>
					</div>
				);
			}
			
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
	createIdentityContent = () => {
		console.log(this.props.profile.profile)
		return (
			<div className="identity-wrap">
				<div className="row">
					<div className="col-sm-6">
						<div className="row mx-0"><div className="col-6"><strong>First name:</strong></div><div className="col-6">{this.props.profile.profile.profile.user_object.first_name}</div></div>
						<div className="row mx-0"><div className="col-6"><strong>Last name:</strong></div><div className="col-6">{this.props.profile.profile.profile.user_object.last_name}</div></div>
						<div className="row mx-0"><div className="col-6"><strong>Email:</strong></div><div className="col-6">{this.props.profile.profile.profile.user_object.email}</div></div>
					</div>
					<div className="col-sm-6">
						<div className="row mx-0"><div className="col-6"><strong>Country:</strong></div><div className="col-6">{this.props.profile.profile.profile.country}</div></div>
						<div className="row mx-0"><div className="col-6"><strong>City:</strong></div><div className="col-6">{this.props.profile.profile.profile.city}</div></div>
						<div className="row mx-0"><div className="col-6"><strong>Address1:</strong></div><div className="col-6">{this.props.profile.profile.profile.address1}</div></div>
						<div className="row mx-0"><div className="col-6"><strong>Address2:</strong></div><div className="col-6">{this.props.profile.profile.profile.address2}</div></div>
						
					</div>
				</div>
			</div>
		)
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
								{ userinfo.is_company? <h3>Overview</h3>:
								<h3 onClick={(e) => this.popupWindow('overview', 'update', (this.props.profile?this.props.profile.profile.id:null), null, e)}><a href="#" title="" className="overview-open">Overview</a> <a title="" className="overview-open" ><i className="fa fa-pencil"></i></a></h3>}
								<hr/>
								<pre><p id="overview-content">{this.props.profile?this.props.profile.profile.overview:null}</p></pre>
							</div>
							<div className="user-profile-ov">
								{userinfo.is_company?<h3>Identity</h3> :
								<h3 onClick={(e) => this.popupWindow('identity', 'update', (this.props.profile?this.props.profile.profile.id:null), null, e)}><a href="#" title="" className="identity-open">Identity</a> <a href="#" title="" className="skills-open"><i className="fa fa-pencil"></i></a></h3>}
								<hr/>
								<ul>
									{this.createIdentityContent()}
								</ul>
							</div>
							<div className="user-profile-ov">
								{userinfo.is_company?<h3>Skills</h3> :
								<h3 onClick={(e) => this.popupWindow('skills', 'update', (this.props.profile?this.props.profile.profile.id:null), null, e)}><a href="#" title="" className="skills-open">Skills</a> <a href="#" title="" className="skills-open"><i className="fa fa-pencil"></i></a></h3>}
								<hr/>
								<ul>
									{this.createSkillContent()}
								</ul>
							</div>
						</TabPanel>
						<TabPanel className="fade" selectedClassName="animated fadeIn current">
							<div className="user-profile-ov st2">
								{userinfo.is_company ? <h3>Experience</h3>:
								<h3 onClick={(e) => this.popupWindow('experience', 'create', null, null, e)}><a href="#" title="" className="exp-bx-open">Experience </a><a href="#" title="" className="exp-bx-open"><i className="fa fa-plus-square"></i></a></h3>}
								<hr/>
								{this.createExpContent()}
							</div>
						</TabPanel>

						<TabPanel className="fade" selectedClassName="animated fadeIn current">
							<div className="user-profile-ov">
								{userinfo.is_company? <h3>Education</h3> :
								<h3 onClick={(e) => this.popupWindow('education', 'create', null, null, e)}><a href="#" title="" className="ed-box-open">Education</a> <a href="#" title=""><i className="fa fa-plus-square"></i></a></h3>}
								<hr/>
								{this.createEduContent()}
							</div>
						</TabPanel>

						<TabPanel className="fade" selectedClassName="animated fadeIn current">
							<div className ='user-profile-ovd'>
								<Totalflight/>
							</div>
							<div className ='user-profile-ov'>
								<div className = 'row justify-content-between'>
									<h3 className='col'>LAST FLIGHTS</h3>
									<button className = 'col col-lg-3 btn btn-success' onClick = {this.addflightinfo}><i className = 'fa fa-plus text-white'></i> Add New Flight</button>
								</div>
								<hr/>
								<Lastitem />
							</div>
						</TabPanel>
						
				</Tabs>
				<Flightmodal show={this.state.modalshow} onHide={()=>{this.setState({modalshow:false})}}/>
				
				
				
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		ptarget: state.contentReducer.ptarget,
		paction: state.contentReducer.paction,
		pdata: state.contentReducer.pdata,
		pstate: state.contentReducer.pstate,
		targetId: state.contentReducer.targetId,
		profile:state.contentReducer.profile,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		popupStart: (ptarget, paction, pdata, targetId) => dispatch(actions.popupStart(ptarget, paction, pdata, targetId)) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Info);