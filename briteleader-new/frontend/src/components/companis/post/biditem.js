import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import EllipsisText from "react-ellipsis-text";
import ShowMoreText from 'react-show-more-text';
import { Redirect } from 'react-router';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import * as base from '../../env'

const token = localStorage.getItem('token');
var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
export default class BidItem extends Component {
    constructor(props){
        super(props);
        this.state={
            profile:false,
            message:false,
            bidman:''
        }
    }
    componentDidMount(){
        var url = base.base_url+'/pro/professional/'+this.props.info.professional;
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
            console.log('bidman',res);
            this.setState({bidman:res.data.profile})
		})
		.catch(err => {
			console.log(err)
		});
    }
    goprofile=()=>{
        this.setState({profile:true});
    }
    gomessage=()=>{
        this.setState({message:true});
    }
	render() {
        if (this.state.profile) {
            return <Redirect push to={"/profile/"+this.props.info.professional } />;
          }
        if (this.state.message) {
            return <Redirect push to={"/message/3"+this.state.id} />;
        }
        if(this.state.bidman !== ''){
            return (
                <div className = 'row bid-item'>
                    <div className='col col-lg-2 bid-img'>
                        <img src = {this.state.bidman.avatar_link}/>
                    </div>
                    <div className = ' col col-lg-8 bid-item-info'>
                        <div className=' bid-item-detail'>
                            <h3 className = ''>{this.state.bidman.user_object.first_name + this.state.bidman.user_object.last_name}</h3>
                            <hr/>
                        </div>
                        <div className = 'row'>
                            {/* <div className = 'col col-lg-4'>
                                <h3>Skill : </h3>
                            </div> */}
                            <div className = 'col col-lg-4'></div>
                            <div className = 'col col-lg-4'></div>
                        </div>
                        <div className = 'bid-letter'>
                            <h4>cover letter: </h4> 
                            <ShowMoreText
                                className = 'showmoretext'
                                lines={2}
                                more='Show more'
                                less='Show less'
                                anchorClass=''
                                onClick={this.executeOnClick}
                                expanded={false}
                                width={750}
                            >
                                {this.props.info.description}
                            </ShowMoreText>
                        </div>
                    </div>
                    <div className = 'col col-lg-2 bid-btns '>
                         <button className='form-control btn btn-primary' onClick = {this.goprofile}>Profile</button>
                         <button className='form-control btn btn-danger' onClick = {this.gomessage}>Message</button>

                    </div>
                </div>
            )
        }else{
            return(
                <div className = 'Loader' >
                        Please Waiting......
    
                    <Loader
                            type="Plane"
                            color="#00BFFF"
                            height={100}
                            width={100}
    
                        />
                </div>
             );
        }
	}
}

