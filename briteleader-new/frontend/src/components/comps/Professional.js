import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import { Link, Route } from 'react-router-dom';
import EllipsisText from "react-ellipsis-text";
import StarRatingComponent from 'react-star-rating-component';

export default class Professional extends Component {
	render() {
		return (
			<div className = 'col-lg-3 Dg-com-user'>
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

