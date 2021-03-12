import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const iscompany = localStorage.getItem('iscompany');
const token = localStorage.getItem('token');
var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

class Header extends Component {
	constructor(props) {
		super(props);
		this.state={
			user:'com1',
			ismember:false,
		}
	}
	logout=()=>{
		this.props.logout();
		window.location.href = '/home';
		
	}
	clickheader=()=>{
		toast.error("You need to Upgrade your account!", {
			position: toast.POSITION.TOP_CENTER
		  });
	}
	componentDidMount(){
		if(userinfo != null && userinfo.is_subscribed)
		this.setState({ismember:true})
	}
	render() {
		return (
			<header>
			<div className="container">
				<div className="header-data">
					<div className="logo">
						<Link to="/"><img src='/static/frontend/images/logo.png' alt=""/></Link>
					</div>
					<div className="search-bar">
						<form>
							<input type="text" name="search" placeholder="Search..."/>
							<button type="submit"><i className="la la-search"></i></button>
						</form>
					</div>
					<nav>
						<ul>
							<li>
								<Link to ='/welcome'><span><img src="/static/frontend/images/icon1.png" alt=""/></span> Home</Link>
							</li>
							<li>
								{
									// this.state.user =='com'?<Link to="/">    <span><img src="/static/frontend/images/icon4.png" alt=""/></span>	Profile</Link>
									iscompany =='true'?<Link to="/">    <span><img src="/static/frontend/images/icon4.png" alt=""/></span>	Professional</Link>
													:  <Link to="/jobs"><span><img src="/static/frontend/images/icon3.png" alt=""/></span>	Jobs</Link>
								}
								
							</li>
						{ 
							//this.props.isAuthenticated && this.state.user !=='com'?
							this.props.isAuthenticated && iscompany !=='true'?
							<li>
								<Link to = "/companies">
									<span><img src="/static/frontend/images/icon2.png" alt=""/></span>
									Companies
								</Link>
								
							</li>
							:null
						}
						{
							//this.props.isAuthenticated && this.state.user =='com'?
							this.props.isAuthenticated && iscompany =='true'?
								<li >
									<Link to="/postlist">
										<span><img src="/static/frontend/images/icon5.png" alt=""/></span>
										Jobs
									</Link>
								</li>
							:
								null
						}
						{
							this.props.isAuthenticated?
								<li >
									<Link to="/message/0">
										<span><img src="/static/frontend/images/icon6.png" alt=""/></span>
										Message
									</Link>
								</li>:null
						}	
							
							<li >
								<Link to="/article">
									<span><img src="/static/frontend/images/icon10.png" alt=""/></span>
									Articles
								</Link>
							</li>
							<li >
								<Link to="/document">
									<span><img src="/static/frontend/images/icon12.png" alt=""/></span>
									Document
								</Link> 
							</li>
						
						</ul>
					</nav>
					<div className="menu-btn">
						<a href="#" title=""><i className="fa fa-bars"></i></a>
					</div>
				{ 
					this.props.isAuthenticated ?
					<div className="user-account">
						<div className="user-info">
							<img src={userinfo.avatar_link} alt=""/>
							{iscompany == 'true'? <a href="#" title="">{userinfo.company_name}</a> : <a href="#" title="">{userinfo.user_object.first_name +" "+ userinfo.user_object.last_name}</a>}
							<i className="la la-sort-down"></i>
						</div>
						<div className="user-account-settingss" id="users">
							<h3>Online Status</h3>
							<ul className="on-off-status">
								<li>
									<div className="fgt-sec">
										<input type="radio" name="cc" id="c5"/>
										<label htmlFor="c5">
											<span></span>
										</label>
										<small>Online</small>
									</div>
								</li>
								<li>
									<div className="fgt-sec">
										<input type="radio" name="cc" id="c6"/>
										<label htmlFor="c6">
											<span></span>
										</label>
										<small>Offline</small>
									</div>
								</li>
							</ul>
							{ iscompany == 'true'?<h3><Link to="/companyedit">Edit Profile</Link></h3> :<h3><Link to = "/personedit">Edit Profile</Link></h3>}
							<h3>
								<Link to="/upgrade">Upgrade	Account</Link>
							</h3>
							<h3>Setting</h3>
							{/* <ul className="us-links">
								<li><a href="profile-account-setting.html" title="">Account Setting</a></li>
								<li><a href="#" title="">Privacy</a></li>
								<li><a href="#" title="">Faqs</a></li>
								<li><a href="#" title="">Terms & Conditions</a></li>
							</ul> */}
							{/* <h3 className="tc"><a onClick={this.props.logout}>Logout</a></h3> */}
							<h3 className="tc"><a onClick={this.logout}>Logout</a></h3>
						</div>
					</div>
					:
					<div className="user-account">
						<div className="user-login">
							<i className="la la-user"></i>
							<a href="/signin" title="">Login</a>
						</div>
					</div>
				}
				</div>
			</div>
			<ToastContainer />
		</header>
		)
	}
}
const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error
  };
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);