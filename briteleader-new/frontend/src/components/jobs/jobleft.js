import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';


class Jobleft extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
			selectedoption:'part',
			searchskill:'',
			searchcountry:'',
			searchtype:'',
			searchExp:-1
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }
	userFormValue1 = (e)=>{
        if (this.refs.joblist) {
            this.setState({searchtype:this.refs.joblist.value})
          }
	}
	
	userFormValue2 = (e)=>{
        if (this.refs.jobexp) {
            this.setState({searchExp:this.refs.jobexp.value})
          }
	}
	
    handleOptionChange(changeEvent) {
        this.setState({
            selectedoption: changeEvent.target.value
        });
      }
	onchangeskill=(e)=>{
		this.setState({searchskill:e.target.value})
	}
	countryvalue=(e)=>{
		this.setState({searchcountry:e.target.value})
	}
	changetype=(e)=>{
		this.setState({searchtype:e.target.value});
	}
	changelevel=(e)=>{
		this.setState({searchExp:e.target.value});
	}
	searchval=(e)=>{
		e.preventDefault();
		var fields = ''
		if(this.state.selectedoption == 'part') fields='?job_type=P'
		if(this.state.selectedoption == 'full') fields='?job_type=F'
		if(this.state.searchtype != '') fields+='&position='+this.state.searchtype;
		if(this.state.searchExp != -1  ) fields+='&exp_lv='+this.state.searchExp;
		if(this.state.searchcountry !='') fields+='&country='+this.state.searchcountry;

		this.props.onclickadd(fields)
	}
 render(){
     return(
        
			<div className="filter-secs">
				<div className="filter-heading">
					<h3>Filters</h3>
					<a href="#" title="" onClick={this.searchval}><i className='la la-search'></i> Search</a>
				</div>
				<div className="paddy">
					{/* <div className="filter-dd">
						<div className="filter-ttl">
							<h3>Skills</h3>
						</div>
						<form>
							<input type="text" name="search-skills" placeholder="Search skills" onChange = {this.onchangeskill}/>
						</form>
					</div> */}
					<div className="filter-dd">
						<div className="filter-ttl">
							<h3>Availabilty</h3>
						</div>
						<ul className="avail-checks">
							<li>
								<input type="radio" name="cc" id="c2" value='part'
										checked = {this.state.selectedoption ==='part'}
											onChange={this.handleOptionChange}
								/>
								<label htmlFor="c2">
									<span></span>
								</label>
								<small>Part Time</small>
							</li>
							<li>
								<input type="radio" name="cc" id="c3" value = 'full'
										checked = {this.state.selectedoption ==='full'}
										onChange={this.handleOptionChange}
										/>
								<label htmlFor="c3">
									<span></span>
								</label>
								<small>Full Time</small>
							</li>
						</ul>
					</div>
					<div className="filter-dd">
						<div className="filter-ttl">
							<h3>Job Type</h3>
						</div>
						<form className="job-tp">
						<select className = 'form-control'
                                name = 'List' 
                                ref="joblist"
                                onChange={ this.userFormValue1 }>
								<option value = '-1'>Select a job type</option>
								<option value = 'P'>Pilot</option>
								<option value = 'C'>Cabin Crew</option>
								<option value = 'M'>Maintenence</option>
								<option value = 'O'>Office</option>
							</select>
							<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
						</form>
					</div>
					<div className="filter-dd">
						<div className="filter-ttl">
							<h3>Pay Rate / Hr ($)</h3>
						</div>
						<div className="rg-slider">
							<input type='number' className="form-control" />
						</div>
						
					</div>
					<div className="filter-dd">
						<div className="filter-ttl">
							<h3>Experience Level</h3>
						</div>
						<select className = 'form-control'
							name = 'Level' 
							ref="jobexp"
							onChange={ this.userFormValue2 }
						>
							<option value = '-1'>Select a experience level</option>
							<option value = '2'>2 years</option>
							<option value = '4'>4 years</option>
							<option value = '5'>5 years</option>
							<option value = '8'>8+ years</option>
						</select>
					</div>
					<div className="filter-dd">
						<div className="filter-ttl">
							<h3>Countries</h3>
						</div>
						<input type = 'text' className='form-control' onChange = {this.countryvalue}/>
					</div>
				</div>
			</div>
							
     );
 }   
}
const mapStateToProps = state => {
	return {
		profile: state.contentReducer.profile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Jobleft)