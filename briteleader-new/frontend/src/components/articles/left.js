import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Link, Route } from 'react-router-dom';

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
export default class Comitem extends Component {
    constructor(props){
        super(props)
    }
    
	render() {
		return (
            <div >
                <div className="main-left-sidebar no-margin ">
                    <div className="user-data full-width">

                        <div className="user-profile">
                            <div className="username-dt">
                                <div className="com-usr-pic">
                                    <img src={userinfo.avatar_link} alt=""/>
                                </div>
                            </div>
                            <div className="user-specs">
                                
                                {
                                    userinfo.is_company? <h3>{userinfo.company_name}</h3>:<h3>{userinfo.user_object.first_name + userinfo.user_object.last_name}</h3>
                                }
                                {/* <span>Graphic Designer at Self Employed</span> */}
                            </div>
                        </div>
                        <ul className="user-fw-status">
                            {
                                userinfo.is_company?<li> <h4>Followers </h4> <span>{userinfo.follower}</span> </li> :<li>  <h4>Following</h4> <span>{userinfo.following}</span>  </li>
                            }
                            
                            
                        </ul>
                    </div>
                </div>
                <div className="widget widget-about">
                    <img src="/static/frontend/images/resources/airplane.jpg" alt=""/>
                    <h3>Track Time on Workwise</h3>
                    <span>Pay only for the Hours worked</span>
                    
                </div>
            </div>
		)
	}
}

