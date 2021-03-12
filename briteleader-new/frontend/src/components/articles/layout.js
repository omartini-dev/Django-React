import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Item from './item';
import Postmodal from '../modals/postmodal';
import Popmsg from '../message/topmessage';
import axios from 'axios';
import * as base from '../env'

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

const jobs = []
class ArticleLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            modalshow:false,
            articles:[],
            articles1:[],
            myarticle:false,
            transform:'',
		};
    }
 
    showmodal =() =>{
        this.setState({modalshow:true});
    }
    componentDidUpdate(prevProps) {
        if(this.props.postfile!=prevProps.postfile){
          
         this.setState({articles:[this.props.postfile, ...this.state.articles]})
        }
        if(this.props.delartid != prevProps.delartid){
            this.setState({
                articles:this.state.articles.filter((item,index)=>{
                    item.id != this.props.delartid
                })
            ,myarticle:false})
        }
       
        
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    componentDidMount(){
        var url = base.base_url+'/art/list/';
		//axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
            if(res.data.count !== 0){
                res.data.results.map((result)=>{
                    this.setState({articles:[result, ...this.state.articles]})
                })
            }
		})
		.catch(err => {
			console.log(err)
        });
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll=(event)=>{
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const scrollTop =   (document.documentElement && document.documentElement.scrollTop) ||   document.body.scrollTop;
        if (scrollHeight - innerHeight - scrollTop < 100) {
            console.log("Almost Bottom Of This Browser");
          }

    }
    getmyarticles=()=>{
        var url = base.base_url+'/art/list/?publisher='+userinfo.id;
        //axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
            console.log("my",res.data)
            if(res.data.count !== 0){
                
                this.setState({articles:res.data.results,myarticle:true})
               
            }else{
                this.setState({articles:[]})
            }
		})
		.catch(err => {
			console.log(err)
		});
    }
    reloadArticle=(e)=>{
        e.preventDefault();
        var url = base.base_url+'/art/list/';
		axios.get(url)
		.then(res => {
            if(res.data.count !== 0){
                this.setState({articles:res.data.results,myarticle:false})
            }
		})
		.catch(err => {
			console.log(err)
		});
    }
 render(){
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
                                                    <img src={userinfo.avatar_link} alt=""/>
                                                </div>
                                            </div>
                                            <div className="user-specs">
                                            {
                                                userinfo.is_company? <h3>{userinfo.company_name}</h3>:<h3>{userinfo.user_object.first_name + userinfo.user_object.last_name}</h3>
                                            }
                                                <span>Graphic Designer at Self Employed</span>
                                            </div>
                                        </div>
                                        <ul className="user-fw-status">
                                            {
                                                userinfo.is_company?<li>   <h4>Followers</h4> <span>155</span>  </li> :<li>  <h4>Following</h4>  <span>34</span>  </li>
                                            }
                                            
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                           <div className = 'col-lg-6'>
                                <div className="post-topbar">
                                    <div className="user-picy">
                                        <a href = '#' onClick ={this.reloadArticle}><i className = 'fas fa-2x fa-sync-alt'></i></a>
                                    </div>
                                    <div className="post-st">
                                        <ul>
                                            <li><button className = 'form-control btn btn-success' onClick = {this.getmyarticles}>My Article</button>  </li>
                                            <li><button className = 'form-control btn btn-success' onClick = {this.showmodal}>Post Article</button>  </li>
                                        </ul>
                                    </div>
                                    <Postmodal show={this.state.modalshow}  onHide={()=>{this.setState({modalshow:false})}}/>
                                </div>
                            {
                                this.state.articles.map((article,index)=>{

                                    console.log("articles",article)
                                    return(
                                        <Item key = {index} info = {article} own={this.state.myarticle}/>
                                    );
                                })
                            }
                           </div>
                           <div className = 'col-lg-3 '>
                                <div className="right-sidebar art-right">
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
                        </div>
                    </div>
                </div> 
            </div>
            <Popmsg/>
        </main>
     );
 }   
}
const mapStateToProps = state => {

	return {
        profile: state.contentReducer.profile,
        postfile:state.contentReducer.postinfo,
        delartid:state.contentReducer.delartid
        
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleLayout)