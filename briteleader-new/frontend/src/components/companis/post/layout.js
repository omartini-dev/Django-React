import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/content';
import { Redirect } from 'react-router';
import Cominfo from '../../articles/left'
import axios from 'axios';
import Popmsg from '../../message/topmessage';
import * as base from '../../env'

const token =localStorage.getItem('token');
class PostLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            
                Title:'',
                Desc:"",
                List:"",
                Level:'',
                Country:'',
                Type:'',
                Price:'',
                redirect:false,
                erromessage:'This field is required',
                isemptyTitle:true,
                isemptyDesc:true,
                isemptyList:true,
                isemptyLevel:true,
                isemptyCountry:true,
                isemptyType:true,
                isemptyPrice:true,
		};
    }
 
    componentDidMount(){
        var url = `${base.base_url}/profile/profile/get_object`;
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			this.setState({userprofile:res.data})
            this.props.setUserProfile(res.data)
            var userinfo = res.data;
            localStorage.setItem('userinfo',JSON.stringify(userinfo));
		})
		.catch(err => {
			console.log(err)
        });
    }

    userFormValue = (event) => {
        this.setState({ [event.target.name]: event.target.value });
       if(event.target.name === 'Title') this.setState({isemptyTitle:true})
       if(event.target.name === 'Desc') this.setState({isemptyDesc:true})
       if(event.target.name === 'Country') this.setState({isemptyCountry:true})
       if(event.target.name === 'Price') this.setState({isemptyPrice:true})
    }
    userFormValue1 = (e)=>{
        if (this.refs.joblist) {
            this.setState({List:this.refs.joblist.value,isemptyList:true})
          }
    }
    userFormValue2 = (e)=>{
        if (this.refs.jobexp) {
            this.setState({Level:this.refs.jobexp.value,isemptyLevel:true})
          }
    }
    userFormValue3 = (e)=>{
        if (this.refs.jobtype) {
            this.setState({Type:this.refs.jobtype.value,isemptyType:true})
          }
    }
    postInformation=()=>{
        if(this.state.Title == '') { this.setState({isemptyTitle:false}); return;}
        if(this.state.Desc == '') { this.setState({isemptyDesc:false}); return;}
        if(this.state.List == '' || this.state.List == -1) { this.setState({isemptyList:false}); return;}
        if(this.state.Level == '' || this.state.Level == -1) { this.setState({isemptyLevel:false}); return;}
        if(this.state.Country == '') { this.setState({isemptyCountry:false}); return;}
        if(this.state.Type == '' || this.state.Type == -1) { this.setState({isemptyType:false}); return;}
        if(this.state.Price == '') { this.setState({isemptyPrice:false}); return;}
        var url2 = `${base.base_url}/job/jobs/`;
        axios.post(url2,{
            title: this.state.Title,
            description:this.state.Desc,
            position:this.state.List,
            exp_lv:this.state.Level,
            country:this.state.Country,
            job_type:this.state.Type,
            rate:this.state.Price,
        })
        .then(res => {
                this.setState({redirect:true});     
        })
        .catch(err => {
            console.log("commonfield",err)
        });
        
    }
 render(){
    if (this.state.redirect) {
        return <Redirect push to="/postlist" />;
      }
     return(
         <div>
        <section className="companies-info">
			<div className="container com-post">
                <div className = 'row'>
                    <div className = 'col col-lg-3'>
                        <Cominfo info = {this.props.userprofile}/>
                    </div>
                    <div className = 'col col-lg-9'>
                        <div className="post-title ">
                            <h3>Post Job</h3>
                        </div>
                        <div className = "Posttitle">
                            <h3>Job Title</h3>
                            <input type = 'text' className='form-control'
                                name = 'Title'
                                placeholder = 'Write your Job Title'
                                onChange={ this.userFormValue }
                            />
                           { !this.state.isemptyTitle ?<p className = 'errormsg'>{this.state.erromessage}</p>: null}

                        </div>
                        <div className = 'Posttitle'>
                            <h3>Job Descript</h3>
                            <textarea className = 'form-control post-desc' 
                            name = 'Desc' 
                            onChange={ this.userFormValue }
                            />
                            { !this.state.isemptyDesc ?<p className = 'errormsg'>{this.state.erromessage}</p>: null}

                        </div>
                        <div className = 'Posttitle row'>
                            <div className='col col-lg-4'>
                                <h3>Job List</h3>
                                <select className = 'form-control'
                                name = 'List' 
                                ref="joblist"
                                onChange={ this.userFormValue1 }
                                >
								    <option value = '-1'>Select a job type</option>
                                    <option value = 'P'>Pilot</option>
                                    <option value = 'C'>Cabin Crew</option>
                                    <option value = 'M'>Maintenence</option>
                                    <option value = 'O'>Office</option>
                                </select>
                                { !this.state.isemptyList ?<p className = 'errormsg'>{this.state.erromessage}</p>: null}

                            </div>
                            <div className='col col-lg-4'>
                                <h3>Experience Level</h3>
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
                                { !this.state.isemptyLevel ?<p className = 'errormsg'>{this.state.erromessage}</p>: null}
                                
                            </div>
                            <div className='col col-lg-4'>
                                <h3>Country</h3>
                                <input type = 'text' className='form-control'
                                    name = 'Country' 
                                    onChange={ this.userFormValue }
                                    placeholder = 'Write your Job Title'/>
                                { !this.state.isemptyCountry ?<p className = 'errormsg'>{this.state.erromessage}</p>: null}
                            </div>
                        </div>
                        <hr/>
                        <div className = ' Posttitle row'>
                            <div className = 'col col-lg-4'>
                                <h3>Job Type</h3>
                                <select className = 'form-control'
                                    name = 'Type' 
                                    ref="jobtype"
                                    onChange={ this.userFormValue3 }
                                >
                                    <option value = '-1'>Select Job Type</option>
                                    <option value = 'F'>Full Time</option>
                                    <option value = 'P'>Part Time</option>
                                </select>
                                { !this.state.isemptyType ?<p className = 'errormsg'>{this.state.erromessage}</p>: null}

                            </div>
                            <div className = 'col col-lg-4'>
                                <h3>Pay Rate /hr</h3>
                                <input type = 'number' 
                                    name='Price'
                                    className='form-control' 
                                    placeholder = 'Price'
                                    onChange={ this.userFormValue }
                                    />
                                { !this.state.isemptyPrice ?<p className = 'errormsg'>{this.state.erromessage}</p>: null}

                            </div>
                            <div className = 'col col-lg-2'>
                            </div>
                            <div className = 'col col-lg-2 align-self-end'>
                                <button className = 'form-control btn btn-primary'
                                    onClick={this.postInformation}
                                >Post Job</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</section>
        <Popmsg/>
        </div>
     );
 }   
}
const mapStateToProps = state => {
	return {
		userprofile: state.contentReducer.userprofile
	};
};
const mapDispatchToProps = dispatch => {
	return {
        getProfile: () => dispatch(actions.getProfile()) ,
        setUserProfile: (userprofile) =>dispatch(actions.setUserProfile(userprofile))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostLayout)