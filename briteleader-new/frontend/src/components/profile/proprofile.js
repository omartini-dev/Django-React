import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import LProSidebar from './lsidebar';
import RProSidebar from './rsidebar';
import ProMain from './main';
import PersonMain from './personmain';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import * as base from '../env'

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token = localStorage.getItem('token');
class Proprofile extends Component {
	constructor(props){
		super(props);
		this.state={
			userimg:'',
			bannerimg:"https://placeimg.com/1903/500/any",
		}
	}
	bannerimgchange=(event)=>{
		this.setState({bannerimg:URL.createObjectURL(event.target.files[0])})
	}
	componentDidMount(){
		var url = base.base_url+ '/pro/professional/'+this.props.match.params.id+"/";
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			
			this.setState({bannerimg:res.data.profile.cover,userimg:res.data.profile.avatar_link})
		})
		.catch(err => {
			console.log(err)
		});
	}
	render() {
			if(this.state.userimg !=''){
				return (
					<div>
						<div className=" container com-banner-m">
							<img src={this.state.bannerimg} alt="" />
						</div>
						<main>
							<div className="main-section">
								<div className="container">
									<div className="main-section-data">
										<div className="row">
											<div className="col-lg-3">
												<LProSidebar userimg = {this.state.userimg} {...this.prop} />
											</div>
											<div className="col-lg-9">
												<PersonMain {...this.prop} />
											</div>
											{/* <div className="col-lg-3">
												<RProSidebar authuser ='com' {...this.prop} />
											</div> */}
										</div>
									</div>
								</div>
							</div>
						</main>
					</div>
				)
			}else{
				return(
					<div >
						<Loader
								type="Plane"
								color="#00BFFF"
								height={100}
								width={100}
								timeout={3000} //3 secs
		
							/>
					</div>
				 );
			}
	}
}

export default withRouter(Proprofile);