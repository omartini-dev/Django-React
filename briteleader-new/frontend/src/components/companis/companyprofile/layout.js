import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/content';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import Portfoliomodal from '../../modals/portfoliobox';
import * as base from '../../env'

const token = localStorage.getItem('token');
class ComprofileLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: [],
			companyprofile:'',
			portfolio:[],
			modalshow:false,
			info:[],
		};
	}
	componentDidMount() {
		//get messages
		var url = base.base_url+'/company/company_profile/?id=1';
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
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
	}
 showcompany(){
     return (
        <ComItem />
     );
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
 render(){
	 if(this.state.companyprofile === ''){
		 return(
			<div >
				<Loader
					type="Plane"
					color="#00BFFF"
					height={100}
					width={100}
					timeout={0} //3 secs

				/>
			</div>
		 );
		
	 }else{
     return(
        <div >
           <section className="cover-sec">
			   <div className ="container ">
			   		<img src={this.state.companyprofile.profile.cover} alt=""/>
			   </div>
		    </section>
		<main className='dragonmain'>
			<div className="main-section">
				<div className="container">
					<div className="main-section-data">
						<div className="row">
							<div className="col-lg-3 dgleftside">
								<div className="main-left-sidebar">
									<div className="user_profile">
										<div className="user-pro-img">
											<img src={this.state.companyprofile.profile.avatar_link} alt=""/>
										</div>
										<div className="user_pro_status">
											{/* <ul className="flw-hr">
												<li><a href="#" title="" className="flww"><i className="fa fa-envelope"></i> Message</a></li>
											</ul> */}
											
											<ul className="flw-status">
												{/* <li>
													<span>Following</span>
													<b>34</b>
												</li> */}
												<li>
													<span>Followers</span>
													<b>{this.state.companyprofile.profile.follower}</b>
												</li>
											</ul>
										</div>
										<ul className="social_links">
											{/* <li><a href="#" title=""><i className="la la-globe"></i> www.example.com</a></li> */}
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
							<div className="dg-company col-lg-9">
								<div className = 'com-depart'>
									<h3>{this.state.companyprofile.profile.company_name}</h3>
								</div>
								<div className='com-depart'>
									<h3>Over View</h3>
									<hr/>
									<span>
										{this.state.companyprofile.profile.overview}
									</span>
								</div>
								<div className = 'com-depart'>
									<h3>Location</h3>
									<hr/>
											<span> {this.state.companyprofile.profile.country}, {this.state.companyprofile.profile.state} ,{this.state.companyprofile.profile.city}</span>
								</div>
								<div className = 'com-depart'>
									<h3>Establish</h3>
									<hr/>
									<span> {this.state.companyprofile.establish}</span>
								</div>
								<div className = 'com-depart'>
									<h3>Employee</h3>
									<hr/>
									<span> {this.state.companyprofile.employees}</span>
								</div>
								
							</div>


						</div>
					</div>
				</div> 
			</div>
		</main>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ComprofileLayout)