import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import { Link, Route } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import Comitem from './commentitem'
import axios from 'axios';
import * as base from '../env';
import TextareaAutosize from 'react-textarea-autosize';
import Editmodal from '../modals/editmodal'
import { useAlert } from 'react-alert'

const menus = ["wordpress","PHP","laravel"];


var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token = localStorage.getItem('token');

class Artcontent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            showcomments :false,
            comments:[],
            mycomment:'',
            comcount:'',
            subtext:'',
            modalshow:false
        };
        
    }
    

    comments =(e) =>{
        e.preventDefault();
        this.setState((prevState)=>({showcomments: !prevState.showcomments}));
    }
    setlike =(e)=>{
        e.preventDefault();
    }
    handleChange=(e) =>{
        this.setState({ mycomment: e.target.value });
     }
     
    componentDidUpdate(prevProps) {
        console.log("props info",this.props.info)
        if(this.props.info!=prevProps.info){
           // let substring = this.props.info.content.substring(0,130)
            this.setState({comments:this.props.info.comments})
        }
    }
    componentDidMount(){
        let substring = this.props.info.content.substring(0,130)
        this.setState({subtext:substring})
    }
     postcomment=(e)=>{
        if(this.state.mycomment != ''){
            var url2 = base.base_url+'/art/comments/';
            axios.defaults.headers.common['Authorization'] = "token " + token;
            axios.post(url2,{
                article:this.props.info.id,
                text: this.state.mycomment,

            })
            .then(res => {
                this.setState ({comments:[res.data ,...this.state.comments]},()=>{
                    console.log("addcomment",this.state.comments)
                });
                this.setState({mycomment:''});    
            })
            .catch(err => {
                console.log("commonfield",err)
            });

            
        }
           
     }
    getcomments=(datas)=>{
        return(
            <div className='article-comments '>
                <hr/>
                <div className = 'coment-body'>
                    {
                        this.props.info.publisher == userinfo.id?
                            null:
                            <div className = 'row comment-post'>
                                 <TextareaAutosize className='form-control col-lg-9' onChange={this.handleChange}/>
                                <button className = ' btn btn-primary col-lg-2'onClick = {this.postcomment}>Post</button>
                            </div>
                    }
                </div>
                {
                       this.state.comments.map((c,index)=>{
                           console.log("props type",this.state.comments)
                           return(
                               <Comitem key = {index} data = {c}/>
                           );
                       })
                
                    
                }
                
            </div>
        );
    }
    editarticle=(e)=>{
        e.preventDefault();
        console.log('currentid',e.currentTarget.dataset.id)
        this.props.setEditArticle(this.props.info)
        this.setState({modalshow:true})
    }
    delarticle=(e)=>{
        e.preventDefault()
        var url = base.base_url+'/art/list/'+this.props.info.id;
		axios.delete(url)
		.then(res => {
            console.log('del',res)
            this.props.setDelArtid(this.props.info.id)
		})
		.catch(err => {
			console.log(err)
		});
    }
 render(){
    //  const{job} = this.props;
    //  const menus = job.jobskill;//["Menu1", "Menu2", "Menu3", "Menu4"]
    //  const menuList = menus.map((menu,index) => (<li key = {index}><a href="#" title="">{menu}</a></li>));
   
     return(
        <div className="art-post-bar">
            <div className="art-post-topbar">
                <div className="art-post-dt">
                    <img src={"https://soleo-coming-static.s3.amazonaws.com/media/"+this.props.info.profile.avatar} alt=""/>
                    <div className="art-post-name">
                        <h3>{this.props.info.profile.is_company ? this.props.info.profile.company_name:this.props.info.profile.first_name + this.props.info.profile.last_name}</h3>
                        {/* <span>{this.props.info.pub_date}</span> */}
                    </div>
                </div>
                {this.props.own?
                <div className = 'submenu'>
                    
                    <a href='#' data-id = {this.props.info.id} onClick ={this.editarticle}><i className = 'fas fa-edit'></i></a>
                    <a href='#' data-id = {this.props.info.id} onClick ={this.delarticle}><i className = 'fas fa-close'></i></a>
                    <Editmodal show={this.state.modalshow}  onHide={()=>{this.setState({modalshow:false})}} />
                </div>:null}
                
            </div>
            
            <div className="Art_descp">
                <div className = 'article-showmore'>
                    <h3>{this.props.info.title}</h3>
                </div>
                
                <img src = {this.props.info.media} />
              
                    <div className='sub-desc'>
                        <span>{this.state.subtext} <Link  to={'/artdetail/'+this.props.info.id} title=""><p> ...Show More</p></Link></span>
                        
                    </div>
            </div>
            
            <div className="job-status-bar">
                <ul className="like-com">
                    <li>
                        <a href="#" onClick = {this.setlike} className="active"><i className="fas fa-heart"></i> Like</a>
                        <img src="/static/frontend/images/liked-img.png" alt=""/>
                        <span>{this.props.info.like}</span>
                    </li>
                    <li><a href="#" className="com" onClick = {this.comments}><i className="fas fa-comment-alt"></i> Comments :{this.state.comcount} </a></li>
                </ul>
                {/* <a href="#"><i className="fas fa-eye"></i>Views {job.view}</a> */}
            </div>
            
            { this.state.showcomments == true ?this.getcomments(this.state.comments) : null }
        </div>
							
     );
 }   
}
Artcontent.defaultProps={
    info : ''
} 
const mapStateToProps = state => {
	return {
        profile: state.contentReducer.profile
        
	};
};
const mapDispatchToProps = dispatch => {
	return {
        getProfile: () => dispatch(actions.getProfile()) ,
        setEditArticle:(info)=>dispatch(actions.setEditArticle(info)),
        setDelArtid:(id)=>dispatch(actions.setDelArtid(id))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Artcontent)