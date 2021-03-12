import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import ShowMoreText from 'react-show-more-text';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Portfoliomodal from '../modals/portfoliobox';
import * as base from '../env'

const token =localStorage.getItem('token');
const jobtypes = {P:"PartTime",F:"FullTime"};
const joblist = {P:"Pilot",C:"Cabin Crew",M:"Maintenence",O:"Office"}


class ProposalLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: [],
			jobdetail:null,
			proposal:'',
			companyprofile:null,
			portfolio:[],
			modalshow:false,
			info:'',
			redirect:false
		};
    }
 componentDidMount(){
	var url = base.base_url+ '/job/jobs/'+this.props.match.params.id+'/';
        axios.defaults.headers.common['Authorization'] ="token " + token;
        axios.get(url)
        .then(res => {
            if(res.data.count !== 0){
                this.setState({jobdetail:res.data},()=>{
					var url = base.base_url+ '/company/company_profile/?'+this.state.jobdetail.company;
					axios.get(url)
					.then(res =>{ 
						this.setState({companyprofile:res.data.results[0].company})
						if(res.data.count !== 0){
							res.data.results.map((result)=>{
								this.setState({portfolio:[...this.state.portfolio , result]})
							})
						}
					})
					.catch(err => {
						console.log(err)
					});


				})

            }
        })
        .catch(err => {
            console.log(err)
		});
	
 }
 changeproposal=(e)=>{
	 this.setState({proposal:e.target.value})
 }
 clicklitag = (e)=>{
	e.preventDefault();
	var linkid = e.currentTarget.dataset.id;
	this.state.portfolio.map(item =>{
		if(item.id == linkid){
			this.setState({info:item,modalshow:true})
		}
	})
	
}
bidhandleSubmit=(e)=>{
	e.preventDefault();
	var url2 = base.base_url+ '/bid/bids/';
	axios.defaults.headers.common['Authorization'] = "token " + token;
	axios.post(url2,{
		
		jobs: this.props.match.params.id,
		description:this.state.proposal
	})
	.then(res => {
		this.setState({redirect:true})
		    
	})
	.catch(err => {
		console.log("commonfield",err)
	});


}
 render(){
	if (this.state.redirect) {
        return <Redirect push to="/jobs" />;
      }
	 const menus = ["Menu1", "Menu2", "Menu3", "Menu4"];
	 const menuList = menus.map((menu,index) => (<li key = {index}><a href="#" title="">{menu}</a></li>));
	 if(this.state.companyprofile == null){
		return(
			<div className = 'Loader' >
					Please Waiting......

				<Loader
						type="Plane"
						color="#00BFFF"
						height={100}
						width={100}

					/>
			</div>
		 );
	 }else{
		return(
			<section className="proposal-info">
				<div className="container">
					
					<div className="companies-list">
						<div className="row"> 
							<div className="col-lg-8 col-md-8  col-sm-12 col-8">
								<div className='post-box'>
									<h3>{this.state.jobdetail.title}</h3>
									<hr/>
									<ul className="job-dt">
										<li><a href="#" title="">{jobtypes[this.state.jobdetail.job_type]}</a></li>
										<li><span>$ {this.state.jobdetail.rate} / hr</span></li>
									</ul>
									<p>
										{this.state.jobdetail.description}
									</p>
									<hr/>
									<ul className="dskill-tags">
										<li ><a href="#" title="">{joblist[this.state.jobdetail.position]}</a></li>
										<li ><a href="#" title="">{this.state.jobdetail.exp_lv} years</a></li>
									</ul>
								</div>
								<div className='bid-box'>
									
									<h4>Proposal</h4>
										<hr/>
										{/* <h5>Job Requirement</h5>
										<div className='row'>
											<ul className="job-req">
												<li>Expeirence : </li>
												<li>Qualification :</li>
												<li>Age :</li>
												<li>Education :</li>
												<li>Other :</li>
											</ul>
										</div> */}
										<h5>Describe your porposal</h5>
										<form ref="form" onSubmit={this.bidhandleSubmit}>
											<div className="form-group DTextarea">
												<textarea
													className="form-control"
													id="DTextarea"
													rows="5"
													onChange = {this.changeproposal}
												/>
											</div>
											<button className = " bidbtn "type="submit">Place Bid</button>
										</form>
									</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-12 col-4">
								<div className="main-left-sidebar1">
										<div className="user_profile1">
											<div className = 'backuser'>

											</div>
											<div className="user-pro-img1">
												<img src={this.state.companyprofile.profile.avatar_link} alt=""/>
											</div>
											<div className="user_pro_status">
												<ul className="flw-status">
													
													<li>
														<span>Followers</span>
														<b>{this.state.companyprofile.profile.follower}</b>
													</li>
												</ul>
											</div>
											<ul className="social_links">
												<li><a href="#" title=""><i className="fa fa-facebook-square"></i> {this.state.companyprofile.profile.social_link1}</a></li>
												<li><a href="#" title=""><i className="fa fa-twitter"></i>{this.state.companyprofile.profile.social_link2}</a></li>
												
											</ul>
										</div>
								</div>
								<div className="widget widget-portfolio">
										<div className="wd-heady">
											<h3>Portfolio</h3>
											<img src="/static/frontend/images/photo-icon.png" alt=""/>
										</div>
										<div className="pf-gallery">
											<ul>
												{
													this.state.portfolio.map( (item,index)=>{
														return(
																<li key={index} ><a href="#"  data-id={item.id} onClick = {this.clicklitag} title=""><img src={item.aircraft_image} alt=""/></a></li>
														);
													})
												}
												
											</ul>
										</div>
									</div>
									<Portfoliomodal show={this.state.modalshow} info={this.state.info} onHide={()=>{this.setState({modalshow:false})}}/>
							</div>
						</div>
						
					</div>
				</div>
			</section>
		);
	}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProposalLayout))