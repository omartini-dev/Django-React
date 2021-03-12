import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';


var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

export default class LProSidebar extends Component {
	constructor(props){
		super(props);
		this.state = {
			userimg:"/static/frontend/images/resources/user-pro-img.png",
		}
	}
	userimgchange=(event)=>{
		this.setState({userimg : URL.createObjectURL(event.target.files[0])})
	}
	render() {
		return (
			<div className="main-person-left-sidebar">
				<div className="user_profile">
					<div className="user-pro-img">
						<img src={this.props.userimg} alt=""/>
						{
							userinfo.is_company?null:<div className="add-dp" id="OpenImgUpload">
							<input type="file" id="fileuser" onChange = {this.userimgchange}/>
							<label htmlFor="fileuser"><i className="fas fa-camera"></i></label>												
						</div>
						}
						
					</div>
					<div className="user_pro_status">
						<ul className="flw-status">
							<li>
								<span>Following</span>
								<b>34</b>
							</li>
							<li>
								<span>Followers</span>
								<b>155</b>
							</li>
						</ul>
					</div>
					<ul className="social_links">
						<li><a href="#" title=""><i className="fa fa-facebook-square"></i> Http://www.facebook.com/john...</a></li>
						<li><a href="#" title=""><i className="fa fa-twitter"></i> Http://www.Twitter.com/john...</a></li>
						
					</ul>
				</div>
				<div className="widget widget-about">
                    <img src="/static/frontend/images/resources/airplane.jpg" alt=""/>
                    <h3>Track Time on Workwise</h3>
                    <span>Pay only for the Hours worked</span>
                    
                </div>
				{/* <div className="suggestions full-width">
					<div className="sd-title">
						<h3>People Viewed Profile</h3>
						<i className="la la-ellipsis-v"></i>
					</div>
					<div className="suggestions-list">
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s1.png" alt=""/>
							<div className="sgt-text">
								<h4>Jessica William</h4>
								<span>Graphic Designer</span>
							</div>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s2.png" alt=""/>
							<div className="sgt-text">
								<h4>John Doe</h4>
								<span>PHP Developer</span>
							</div>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s3.png" alt=""/>
							<div className="sgt-text">
								<h4>Poonam</h4>
								<span>Wordpress Developer</span>
							</div>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s4.png" alt=""/>
							<div className="sgt-text">
								<h4>Bill Gates</h4>
								<span>C & C++ Developer</span>
							</div>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s5.png" alt=""/>
							<div className="sgt-text">
								<h4>Jessica William</h4>
								<span>Graphic Designer</span>
							</div>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s6.png" alt=""/>
							<div className="sgt-text">
								<h4>John Doe</h4>
								<span>PHP Developer</span>
							</div>
						</div>
						
					</div> */}
				{/* </div> */}
			</div>
		)
	}
}

