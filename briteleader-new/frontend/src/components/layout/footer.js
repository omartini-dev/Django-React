import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import * as actions from '../../store/actions/auth';

class Footer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<footer>
				<div className="footy-sec mn no-margin">
					<div className="container">
						<ul>
							<li><a href="help-center.html" title="">Help Center</a></li>
							<li><a href="about.html" title="">About</a></li>
							<li><a href="#" title="">Privacy Policy</a></li>
							<li><a href="#" title="">Community Guidelines</a></li>
							<li><a href="#" title="">Cookies Policy</a></li>
							<li><a href="#" title="">Career</a></li>
							<li><a href="forum.html" title="">Forum</a></li>
							<li><a href="#" title="">Language</a></li>
							<li><a href="#" title="">Copyright Policy</a></li>
						</ul>
						<p><img src="/static/frontend/images/copy-icon2.png" alt="" />Copyright 2019</p>
						<img className="fl-rgt" src="/static/frontend/images/logo2.png" alt=""/>
					</div>
				</div>
			</footer>
		)
	}
}
export default Footer;