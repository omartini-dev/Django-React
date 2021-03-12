import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pdata:{skills:''},
			start_date:'',
			end_date:'',
			addedItem:''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSkillChange = this.handleSkillChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.closeWindow = this.closeWindow.bind(this);
		this.cancelWindow = this.cancelWindow.bind(this);
		this.handleSchoolChange = this.handleSchoolChange.bind(this);
		this.handleDegreeChange = this.handleDegreeChange.bind(this);
		this.removeSkillItem = this.removeSkillItem.bind(this);
		this.addSkillItem = this.addSkillItem.bind(this);
	}
	handleChange(event){
		let pdata = {...this.state.pdata};
		pdata.content = event.target.value;
		this.setState({pdata});
	}
	handleSkillChange(event){
		this.setState({addedItem:event.target.value});
	}
	handleDateChange(type, date){
		let pdata = {...this.state.pdata};
		if(type=='start')
			pdata.start_date = this.formatDate(date.toString());
		else
			pdata.end_date = this.formatDate(date.toString());

		this.setState({pdata});
	}
	handleTitleChange(event){
		let pdata = {...this.state.pdata};
		pdata.job_title = event.target.value;
		this.setState({pdata});
	}
	handleSchoolChange(event){
		let pdata = {...this.state.pdata};
		pdata.school = event.target.value;
		this.setState({pdata});
	}
	handleDegreeChange(event){
		let pdata = {...this.state.pdata};
		pdata.diploma = event.target.value;
		this.setState({pdata});
	}
	closeWindow(event){
		event.preventDefault();
		let pdata = this.state.pdata;
		this.props.popupSave(this.props.ptarget, this.props.paction, pdata, this.props.targetId, this.props.pid);
	}
	cancelWindow(event){
		event.preventDefault();
		let pdata = this.props.pdata;
		this.props.popupClose(pdata);
	}
	formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
	}
	componentDidUpdate(prevProps) {
		if(this.props.pdata!=prevProps.pdata){
	  	this.setState({pdata:this.props.pdata});
		}
	}
	createSkillContent = () =>{
		if(typeof(this.state.pdata.skills)=='undefined') return '';
		var skill_indents = this.state.pdata.skills.split(',').map(function (value, index) {
			if(value.trim()=='') return '';
			return (
				<li key={index}><a title="" className="skl-name">{value}</a><a href="#" title="" className="close-skl"><i className="la la-close" onClick={e => this.removeSkillItem(value, e)}></i></a></li>
			);
		}, this);
		
		return skill_indents;
	}
	removeSkillItem(skill) {
		event.preventDefault();
		let skill_arr = this.state.pdata.skills.split(',');
		let pos = skill_arr.indexOf(skill);
		let removedskill = skill_arr.splice(pos, 1);
		let pdata = {...this.state.pdata};
		pdata.skills = skill_arr.join(',');
		this.setState({pdata});
	}
	addSkillItem(event) {
		event.preventDefault();
		let skill_arr = this.state.pdata.skills.split(',');
		let pos = skill_arr.indexOf(this.state.addedItem);
		if(pos == -1){
			let pdata = {...this.state.pdata};
			skill_arr.push(this.state.addedItem);
			pdata.skills = skill_arr.join(',');
			this.setState({pdata});
		}
		this.setState({addedItem:''});
	}
	render() {
		return (
			<div>
		<div className={this.props.ptarget=='overview'&&this.props.pstate=='open'?'overview-box open':'overview-box'} id="overview-box">
			<div className="overview-edit">
				<h3>Overview</h3>
				<span>5000 character left</span>
				<form>
					<textarea value={this.props.ptarget=='overview'?this.state.pdata.content:''} onChange={this.handleChange}/>
					<button type="submit" className="save" onClick={this.closeWindow}>Save</button>
					<button type="submit" className="cancel" onClick={this.cancelWindow}>Cancel</button>
				</form>
				<a href="#" title="" className="close-box" onClick={this.cancelWindow}><i className="la la-close"></i></a>
			</div>
		</div>


		<div className={this.props.ptarget=='experience' && this.props.pstate=='open'?'overview-box open':'overview-box'} id="experience-box">
			<div className="overview-edit">
				<h3>Experience</h3>
				<form>
					<input type="text" name="subject" placeholder="Subject" value = {this.props.ptarget=='experience'?this.state.pdata.job_title:''} onChange={this.handleTitleChange}/>
					<div className="datepicky">
						<div className="row">
							<div className="col-lg-6 no-left-pd">
								<div className="datefm">
									<Flatpickr
									value={this.props.ptarget=='experience'?this.state.pdata.start_date:''}
									onChange={ date =>this.handleDateChange('start', date)} />
									
									<i className="fa fa-calendar"></i>
								</div>
							</div>
							<div className="col-lg-6 no-righ-pd">
								<div className="datefm">
									<Flatpickr
									value={this.props.ptarget=='experience'?this.state.pdata.end_date:''}
									onChange={ e =>this.handleDateChange('end',e)} />
									<i className="fa fa-calendar"></i>
								</div>
							</div>
						</div>
					</div>
					<textarea value={this.props.ptarget=='experience'?this.state.pdata.content:''} onChange={this.handleChange}/>
					<button type="submit" className="save" onClick={this.closeWindow}>Save</button>
					<button type="submit" className="cancel" onClick={this.cancelWindow}>Cancel</button>
				</form>
				<a href="#" title="" className="close-box" onClick={this.cancelWindow}><i className="la la-close"></i></a>
			</div>
		</div>

		<div className={this.props.ptarget=='education' && this.props.pstate=='open'?'overview-box open':'overview-box'} id="education-box">
			<div className="overview-edit">
				<h3>Education</h3>
				<form>
					<input type="text" name="school" placeholder="School / University" value = {this.props.ptarget=='education'?this.state.pdata.school:''} onChange={this.handleSchoolChange}/>
					<div className="datepicky">
						<div className="row">
							<div className="col-lg-6 no-left-pd">
								<div className="datefm">
									<Flatpickr
									value={this.props.ptarget=='education'?this.state.pdata.start_date:''}
									onChange={ date =>this.handleDateChange('start', date)} />
									<i className="fa fa-calendar"></i>
								</div>
							</div>
							<div className="col-lg-6 no-righ-pd">
								<div className="datefm">
									<Flatpickr
									value={this.props.ptarget=='education'?this.state.pdata.end_date:''}
									onChange={ e =>this.handleDateChange('end',e)} />
									<i className="fa fa-calendar"></i>
								</div>
							</div>
						</div>
					</div>
					<input type="text" name="degree" placeholder="Degree" value = {this.props.ptarget=='education'?this.state.pdata.diploma:''} onChange={this.handleDegreeChange} />
					<textarea placeholder="Description" value={this.props.ptarget=='education'?this.state.pdata.content:''} onChange={this.handleChange} />
					<button type="submit" className="save" onClick={this.closeWindow}>Save</button>
					<button type="submit" className="cancel" onClick={this.cancelWindow}>Cancel</button>
				</form>
				<a href="#" title="" className="close-box" onClick={this.cancelWindow}><i className="la la-close"></i></a>
			</div>
		</div>

		<div className="overview-box" id="location-box">
			<div className="overview-edit">
				<h3>Location</h3>
				<form>
					<div className="datefm">
						<select>
							<option>Country</option>
							<option value="pakistan">Pakistan</option>
							<option value="england">England</option>
							<option value="india">India</option>
							<option value="usa">United Sates</option>
						</select>
						<i className="fa fa-globe"></i>
					</div>
					<div className="datefm">
						<select>
							<option>City</option>
							<option value="london">London</option>
							<option value="new-york">New York</option>
							<option value="sydney">Sydney</option>
							<option value="chicago">Chicago</option>
						</select>
						<i className="fa fa-map-marker"></i>
					</div>
					<button type="submit" className="save">Save</button>
					<button type="submit" className="cancel">Cancel</button>
				</form>
				<a href="#" title="" className="close-box"><i className="la la-close"></i></a>
			</div>
		</div>

		<div className={this.props.ptarget=='skills' && this.props.pstate=='open'?'overview-box open':'overview-box'} id="skills-box">
			<div className="overview-edit">
				<h3>Skills</h3>
				<ul>
					{this.createSkillContent()}
				</ul>
				<form>
					<input type="text" name="skills" placeholder="Skills" value={this.state.addedItem} onChange = {this.handleSkillChange}/>
					<button type="submit" className="save" onClick={this.closeWindow}>Save</button>
					<button type="submit" className="save-add" onClick={this.addSkillItem}>Add</button>
					<button type="submit" className="cancel" onClick={this.cancelWindow}>Cancel</button>
				</form>
				<a href="#" title="" className="close-box" onClick={this.cancelWindow}><i className="la la-close"></i></a>
			</div>
		</div>

		<div className="overview-box" id="create-portfolio">
			<div className="overview-edit">
				<h3>Create Portfolio</h3>
				<form>
					<input type="text" name="pf-name" placeholder="Portfolio Name"/>
					<div className="file-submit">
						<input type="file" id="file"/>
						<label htmlFor="file">Choose File</label>	
					</div>
					<div className="pf-img">
						<img src="/static/frontend/images/resources/np.png" alt=""/>
					</div>
					<input type="text" name="website-url" placeholder="htp://www.example.com"/>
					<button type="submit" className="save">Save</button>
					<button type="submit" className="cancel">Cancel</button>
				</form>
				<a href="#" title="" className="close-box"><i className="la la-close"></i></a>
			</div>
		</div>
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
		pid: state.contentReducer.pid,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		popupClose: (pdata) => dispatch(actions.popupClose(pdata)),
		popupSave : (ptarget, paction, pdata,targetId, pid) => dispatch(actions.popupSave(ptarget, paction, pdata, targetId, pid)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);