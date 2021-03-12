import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/content';
import MainContent from './layout/maincontent';
import Sidebar from './layout/sidebar';
import RightSidebar from './layout/rsidebar';
import Popupcontent from './layout/popup';
import Search from './jobs/jobleft';
import { Link, Route } from 'react-router-dom';
import Professional from './comps/Professional';
import Popmsg from './message/topmessage';
import axios from 'axios';
import * as base from './env';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import EllipsisText from "react-ellipsis-text";

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const joblist = {P:"Pilot",C:"Cabin Crew",M:"Maintenence",O:"Office"}

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
class ComHome extends Component {
	constructor(props){
		super(props);
		this.state={
			comprofile:'',
			professionals:[
				// {id :'30', name:'Miloje' ,skill:'Pilot', imgsrc:'/static/frontend/images/resources/userdg-pic1.png'},
				// {id :'31', name:'Miroslav' ,skill:'Pilot',imgsrc:'/static/frontend/images/resources/userdg-pic2.png'},
				// {id :'32', name:'Rodavan' ,skill:'Cabin crew',imgsrc:'/static/frontend/images/resources/userdg-pic3.png'},
				// {id :'33', name:'Spiridon' ,skill:'Cabin crew',imgsrc:'/static/frontend/images/resources/userdg-pic4.png'},
			],
			topros:[
			
			],

		}
	}
	componentDidMount(){
		
		const token = localStorage.getItem('token');
		//fetch company info
		var url = base.base_url+'/profile/profile/get_object';
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			this.setState({comprofile:res.data})
			this.props.setComProfile(res.data)
		})
		.catch(err => {
			console.log(err)
		});
		//get professional info
		var url = base.base_url+'/pro/professional';
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			if(res.data.count != 0){
				res.data.results.map((result,index)=>{
					if (result.profile.is_professional){
						
					let val1 =  {id :result.id, name:result.profile.user_object.first_name +" "+result.profile.user_object.last_name ,skill:joblist[result.profile.position], imgsrc:result.profile.avatar_link};
					this.setState({professionals:[ val1 , ...this.state.professionals]})
						if(index < 10){
							this.setState({topros:[  ...this.state.topros,val1]})
						}
					}
				})
			}
		})
		.catch(err => {
			console.log(err)
		});

	}
	render() {
		return (
			<div>
			
				<main>
					<div className="main-section">
						<div className="container">
							<div className="main-section-data">
								<div className="row">
									<div className="col-lg-3 col-md-4 pd-left-none no-pd">
										<div className="main-left-sidebar no-margin">
											<div className="user-data full-width">

												<div className="user-profile">
													<div className="username-dt">
														<div className="com-usr-pic">
															<img src={this.state.comprofile.avatar_link} alt=""/>
														</div>
													</div>
													<div className="user-specs">
														<h3>{this.state.comprofile.company_name}</h3>
														<span>{this.state.comprofile.desc}</span>
													</div>
												</div>
												<ul className="user-fw-status">
													{/* <li>
														<h4>Following</h4>
														<span>34</span>
													</li> */}
													<li>
														<h4>Followers</h4>
														<span>{this.state.comprofile.follower}</span>
													</li>
												</ul>
											</div>
										</div>
										{/* <Search /> */}
										<div className="widget widget-about">
											<img src="/static/frontend/images/wd-logo.png" alt=""/>
											<h3>Track Time on Workwise</h3>
											<span>Pay only for the Hours worked</span>
											<div className="sign_link">
												<i className="fa fa-2x fa-facebook-official" aria-hidden="true"></i>
												<i className="fa fa-2x fa-twitter-square" aria-hidden="true"></i>
												<i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
											</div>
										</div>

									</div>
									<div className="col-lg-9 col-md-8 no-pd">
										<div className="main-ws-sec">
											<div className="post-topbar">
												<div className="user-picy">
													<img src="/static/frontend/images/resources/user-pic.png" alt=""/>
												</div>
												<div className="post-st">
													<ul>
														<li><Link  to={'/postcom'} title="">Post a Job</Link></li>
													</ul>
												</div>
											</div>
											<div className="top-profiles">
												<div className="pf-hd">
													<h3>Top professionals</h3>
													<i className="la la-ellipsis-v"></i>
												</div>
												<div className="profiles-slider">
												<Carousel 
													responsive={responsive} 
													autoPlay = {true} 
													infinite = {true} 
													arrows = {false}
												>
													{
														this.state.topros.map((item,index)=>{
															return(
																<TopProfessional key = {index} data = {item}/>
															);
														})
													}
													</Carousel>
												</div>
											</div>
											
											<div className = 'row all-professionals'>
												<div className = 'col-lg-12'>
													<h5>All professionals</h5>
													<hr/>
												</div>
												
												{
														this.state.professionals.map((item,index)=>{
															return(
																<Professional key = {index} data = {item}/>
															);
														})
													}

											</div>
										</div>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</main>
				<Popupcontent />
				<Popmsg />
			</div>
		)
	}
}
class TopProfessional extends Component {
	render() {
		return (
			<div className = 'col-lg-12 Dg-com-user'>
				<div className="user-profy">
					<div className = 'user-back'>

					</div>
					<img src={this.props.data.imgsrc} alt=""/>
					<h3>{this.props.data.name}</h3>
					<EllipsisText text={this.props.data.skill} length={20} />
					{/* <StarRatingComponent 
						name="rate1" 
						starCount={5}
						value={3.5}
						/> */}
					<Link  to = {'/profile/'+this.props.data.id}>View Profile</Link>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {

	return {
		userprofile: state.contentReducer.userprofile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		//getProfile: () => dispatch(actions.getProfile()) 
		//setComProfile: (comprofile) =>dispatch(actions.setComProfile(comprofile))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ComHome)