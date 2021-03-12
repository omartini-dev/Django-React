import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Link, Route } from 'react-router-dom';

export default class Comitem extends Component {
	render() {
        
		return (
            <div className = 'comment-msg'>
                <div className = 'row'>
                    <div className = 'col col-lg-2'>
                        <img  src = {"https://soleo-coming-static.s3.amazonaws.com/media/"+this.props.data.profile.avatar}/>
                    </div>
                    <div className = 'col col-lg-9 other-msg'>
                        <h3>{this.props.data.profile.is_company? this.props.data.profile.company_name : this.props.data.profile.first_name + this.props.data.profile.last_name }</h3>
                        <p>{this.props.data.text}</p>

                    </div>
                </div>
            </div>
		)
	}
}

