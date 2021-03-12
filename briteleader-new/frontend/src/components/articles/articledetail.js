import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Popmsg from '../message/topmessage';
import axios from 'axios';
import * as base from '../env'
import {withRouter} from 'react-router-dom';
import Commentitem from './commentitem'
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

const jobs = []
class Articledetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            modalshow:false,
            articles:null,
		};
    }
 
    showmodal =() =>{
        this.setState({modalshow:true});
    }
    componentDidUpdate(prevProps) {
        if(this.props.postfile!=prevProps.postfile){
          
         this.setState({articles:[this.props.postfile, ...this.state.articles]})
        }
       console.log("match",this.props.match.params.id)
        
    }
    componentDidMount(){
        var url = base.base_url+'/art/list/'+this.props.match.params.id;
		axios.get(url)
		.then(res => {
            console.log("aaaaaaaaaaaaa",res.data)
            this.setState({articles:res.data})
		})
		.catch(err => {
			console.log(err)
		});
    }
 render(){
     if(this.state.articles == null){
        return(
			<div className = 'Dg-spiner'>
				<Loader
						type="Plane"
						color="#00BFFF"
						height={100}
						width={100}
						timeout={0} //3 secs

					/>
			</div>
		 );
     }else{
    
     return(
        <main>
            <div className="main-section">
                <div className="container">
                    <div className="main-section-data">
                        <div className="row">
                            <div className="col-lg-3 ">
                                <div className="main-left-sidebar no-margin art-left">
                                    <div className="user-data full-width">

                                        <div className="user-profile">
                                            <div className="username-dt">
                                                <div className="com-usr-pic">
                                                    <img src={"https://soleo-coming-static.s3.amazonaws.com/media/"+this.state.articles.profile.avatar} alt=""/>
                                                </div>
                                            </div>
                                            <div className="user-specs">
                                            {
                                                this.state.articles.profile.is_company? <h3>{this.state.articles.profile.company_name}</h3>:<h3>{this.state.articles.profile.first_name + this.state.articles.profile.last_name}</h3>
                                            }
                                                {/* <span>Graphic Designer at Self Employed</span> */}
                                            </div>
                                        </div>
                                        <ul className="user-fw-status">
                                            
                                               <li>   <h4>Following Comments </h4> <span>{this.state.articles.comments.length}</span>  </li> 
                                            
                                            
                                            
                                        </ul>
                                    </div>

                                    <div className="widget widget-about">
                                        <img src="/static/frontend/images/wd-logo.png" alt=""/>
                                        <h3>Track Time on Workwise</h3>
                                        <span>Pay only for the Hours worked</span>
                                        <div className="sign_link">
                                            <i className="fa fa-2x fa-facebook-official" aria-hidden="true"></i>
                                            <i className="fa fa-2x fa-twitter-square" aria-hidden="true"></i>
                                            <i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                    <div className="widget widget-about">
                                        <img src="/static/frontend/images/resources/airplane.jpg" alt=""/>
                                        <h3>Track Time on Workwise</h3>
                                        <span>Pay only for the Hours worked</span>
                                        
                                    </div>
                                </div>
                            </div>
                           <div className = 'col-lg-9 '>
                               <div className = 'post-detail-body'>
                                    <h3>{this.state.articles.title}</h3>
                                    <hr/>
                                    <img src={this.state.articles.media}/>
                                    <h3>Description</h3>
                                    <span>{this.state.articles.content}</span>
                               </div>
                               <div className = 'post-detail-comments'>
                                   <h4>Comments </h4>
                                    {
                                        this.state.articles.comments.map((item,index)=>{
                                            return(
                                                <Commentitem key={index} data={item}/>
                                            );
                                        })
                                    }
                               </div>
                           </div>
                           
                        </div>
                    </div>
                </div> 
            </div>
            <Popmsg/>
        </main>
     );
    }
 }   
}
const mapStateToProps = state => {

	return {
        profile: state.contentReducer.profile,
        postfile:state.contentReducer.postinfo
        
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Articledetail))