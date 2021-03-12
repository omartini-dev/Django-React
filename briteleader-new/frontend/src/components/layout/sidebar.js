import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

export default class Sidebar extends Component {
	render() {
		return (
			<div className="main-left-sidebar no-margin">
			{ 
				this.props.isAuthenticated ?
				<div className="user-data full-width">
					<div className="user-profile">
						<div className="username-dt">
							<div className="usr-pic">
								<img src="/static/frontend/images/resources/user-pic.png" alt=""/>
							</div>
						</div>
						<div className="user-specs">
							<h3>John Doe</h3>
							<span>Graphic Designer at Self Employed</span>
						</div>
					</div>
					<ul className="user-fw-status">
						<li>
							<h4>Following</h4>
							<span>34</span>
						</li>
						<li>
							<h4>Followers</h4>
							<span>155</span>
						</li>
						<li>
							<a href="my-profile.html" title="">View Profile</a>
						</li>
					</ul>
				</div>
				:
				null
			}
				<div className="suggestions full-width">
					<div className="sd-title">
						<h3>Suggestions</h3>
						<i className="la la-ellipsis-v"></i>
					</div>
					<div className="suggestions-list">
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s1.png" alt=""/>
							<div className="sgt-text">
								<h4>Jessica William</h4>
								<span>Graphic Designer</span>
							</div>
							<span><i className="la la-plus"></i></span>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s2.png" alt=""/>
							<div className="sgt-text">
								<h4>John Doe</h4>
								<span>PHP Developer</span>
							</div>
							<span><i className="la la-plus"></i></span>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s3.png" alt=""/>
							<div className="sgt-text">
								<h4>Poonam</h4>
								<span>Wordpress Developer</span>
							</div>
							<span><i className="la la-plus"></i></span>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s4.png" alt=""/>
							<div className="sgt-text">
								<h4>Bill Gates</h4>
								<span>C & C++ Developer</span>
							</div>
							<span><i className="la la-plus"></i></span>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s5.png" alt=""/>
							<div className="sgt-text">
								<h4>Jessica William</h4>
								<span>Graphic Designer</span>
							</div>
							<span><i className="la la-plus"></i></span>
						</div>
						<div className="suggestion-usd">
							<img src="/static/frontend/images/resources/s6.png" alt=""/>
							<div className="sgt-text">
								<h4>John Doe</h4>
								<span>PHP Developer</span>
							</div>
							<span><i className="la la-plus"></i></span>
						</div>
						<div className="view-more">
							<a href="#" title="">View More</a>
						</div>
					</div>
				</div>
				<div className="tags-sec full-width">
					<ul>
						<li><a href="#" title="">Help Center</a></li>
						<li><a href="#" title="">About</a></li>
						<li><a href="#" title="">Privacy Policy</a></li>
						<li><a href="#" title="">Community Guidelines</a></li>
						<li><a href="#" title="">Cookies Policy</a></li>
						<li><a href="#" title="">Career</a></li>
						<li><a href="#" title="">Language</a></li>
						<li><a href="#" title="">Copyright Policy</a></li>
					</ul>
					<div className="cp-sec">
						<img src="/static/frontend/images/logo2.png" alt=""/>
						<p><img src="/static/frontend/images/cp.png" alt=""/>Copyright 2019</p>
					</div>
				</div>
			</div>
		)
	}
}
