import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Feeds from './feeds';
import Bids from './bids';
import ShowInfo from './showinfo';
import Jobs from './jobs';
import Payments from './payments';
import PList from './plist';
import Reviews from './reviews';
import axios from "axios";
import { Link, Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import * as base from '../env'


const token = localStorage.getItem('token');

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

class ProMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: '',
			proname:''
		};
	}

	componentDidMount(){
		//this.props.getProfile();
		//
		var url = base.base_url+ '/pro/professional/'+this.props.match.params.id+"/proinfo";
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			console.log(res.data)
			if(res.data.count !== 0){
					this.setState({profile:res.data});
					this.props.setProfile(res.data);
			}
		})
		.catch(err => {
			console.log(err)
		});
	}
	render() {
		return (
			<div className="main-ws-person-sec">
				<div className="user-tab-sec p-rewivew row">
					<div className = 'col col-lg-9'>
						<h3>{this.state.profile !=''?this.state.profile.profile.profile.user_object.first_name + this.state.profile.profile.profile.user_object.last_name:''}</h3>
						<div className="star-descp clearfix">
							{/* <span>Graphic Designer at Self Employed</span> */}
						</div>
					</div>
					<div className = 'col col-lg-3'>
						<div className="message-btn">
							{userinfo.is_company?<Link to = { '/message/'+this.props.match.params.id } ><i className="fas fa-email"></i> Message</Link>:null}	
						</div>
					</div>
					
				</div>
					<ShowInfo />
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		profile: state.contentReducer.profile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		//getProfile: () => dispatch(actions.getProfile()) ,
		setProfile: (profile)=>dispatch(actions.setProfile(profile))
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProMain))