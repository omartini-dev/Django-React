import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import { Link, Route } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';


const menus = ["wordpress","PHP","laravel"];
const jobtypes = {P:"PartTime",F:"FullTime"};
     const joblist = {P:"Pilot",C:"Cabin Crew",M:"Maintenence",O:"Office"};
class Jobcontent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            
		};
    }
 
 render(){
     const{job} = this.props;
     
     const menus =[joblist[job.position], job.exp_lv+"years"]
     const menuList = menus.map((menu,index) => (<li key = {index}><a href="#" title="">{menu}</a></li>));
     return(
        <div className="post-bar">
            <div className="post_topbar">
                {/* <div className="usy-dt">
                    <img src={job.image} alt=""/>
                    <div className="usy-name">
                        <h3>{job.company}</h3>
                        <span><img src="/static/frontend/images/clock.png" alt=""/>{job.lastsee} min ago</span>
                    </div>
                </div> */}
                 <h3>{job.title}</h3>
                 <hr/>
            </div>
            <div className="epi-sec">
                <ul className="descp">
                    <li><img src="/static/frontend/images/icon8.png" alt=""/><span>{ job.publish_date}</span></li>
                    <li><img src="/static/frontend/images/icon9.png" alt=""/><span>{job.country }</span></li>
                </ul>
                <ul className="bk-links">
                    <li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
                    <li><Link to={'/proposal/'+job.id} ><i className="la la-envelope"></i></Link></li>
                </ul>
            </div>
            <div className="job_descp">
               
                <ul className="job-dt">
                    <li><a href="#" title="">{jobtypes[job.job_type]}</a></li>
                    <li><span>${job.rate} / hr</span></li>
                </ul>
                <ul className='job-desc-cu'>
                    <ShowMoreText
                        /* Default options */
                        lines={2}
                        more='Show more'
                        less='Show less'
                        anchorClass=''
                        onClick={this.executeOnClick}
                        expanded={false}
                        width={480}
                    >
                        {job.description}
                    </ShowMoreText>
                </ul>
                
               
                <ul className="skill-tags">
                    {menuList}
                </ul>
            </div>
            {/* <div className="job-status-bar">
                <ul className="like-com">
                    <li>
                        <a href="#" className="active"><i className="fas fa-heart"></i> Like</a>
                        <img src="/static/frontend/images/liked-img.png" alt=""/>
                        <span>{job.like}</span>
                    </li>
                    <li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comments {job.comment}</a></li>
                </ul>
                <a href="#"><i className="fas fa-eye"></i>Views {job.view}</a>
            </div> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Jobcontent)