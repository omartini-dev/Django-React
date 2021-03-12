import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Contactlist from './contactlist';
import Ownmsg from './ownmsg';
import Othermsg from './othermsg';
import ScrollToBottom from 'react-scroll-to-bottom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import * as base from '../env'
import TextareaAutosize from 'react-textarea-autosize';

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token =localStorage.getItem('token');
class MessageLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            msgs:[
                
            ],
            message:'',
			receiverid:'',
			msglist:[],
			chatman:{id:0, first_name: "", last_name: "", avatar: "users/avatar/blank-avatar.jpg", unread: 0, company_name:''}
		};
	}
	
	//http://f2f776e0.ngrok.io
	ws = new WebSocket(base.websock+'/chat/dragon/')

    componentDidMount(){
		
		this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            }
    
            this.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({dataFromServer: message},()=>{
				if(this.state.dataFromServer.sender == userinfo.id && this.state.dataFromServer.receiver == this.state.receiverid){
					var add = {own:'true',msg:this.state.dataFromServer.message,date:'now',img:'https://placeimg.com/128/128/any'};
					this.setState({msgs:[...this.state.msgs, add] } );
            		this.setState({message:''});
				}
				if(this.state.dataFromServer.sender == this.state.receiverid && this.state.dataFromServer.receiver == userinfo.id ){
					var add = {own:'false',msg:this.state.dataFromServer.message,date:'now',img:'https://placeimg.com/128/128/any'};
					this.setState({msgs:[...this.state.msgs, add] } );
            		this.setState({message:''});
				}
				
            })
            }
    
            this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
			}

			//get list http://f7db63ac.ngrok.io
			var url = base.chat_url+'/chat/listuser?sender='+userinfo.id;
			axios.defaults.headers.common['Authorization'] ="token " + token;
            axios.get(url)
            .then(res => {
                if(res.data.length !== 0){
                   res.data.map((item,index)=>{
                       this.setState({msglist:[item , ...this.state.msglist]},()=>{
						   if(this.props.match.params.id != 0){
							   
							   var delnum = 0;
								var newurl = base.base_url+ '/pro/professional/'+this.props.match.params.id+"/";
								axios.defaults.headers.common['Authorization'] ="token " + token;
								axios.get(newurl)
								.then(res => {
									//id,fir,las,avatar,unread,com_name
									delnum = res.data.user;

									var imgurl = res.data.profile.avatar_link;
									var index1 = res.data.profile.avatar_link.indexOf("users/avatar")
									if( index1 != -1){
											imgurl =res.data.profile.avatar_link.substring(index1);
									}
									this.setState({msglist:[{id:res.data.profile.user,first_name:res.data.profile.user_object.first_name,last_name:res.data.profile.user_object.last_name,avatar:imgurl,unread:0,company_name:res.data.profile.company_name},...this.state.msglist]},()=>{

										this.state.msglist.map((list,index)=>{
		
											if(list.id == delnum && index > 0){
		
												var array = [...this.state.msglist];
												array.splice(index,1);
												this.setState({msglist:array})
											}
									   })

									})

									

								})
								.catch(err => {
									console.log(err)
								});
								
						   }
					   })
				   })
				   

                }else{
					var newurl = base.base_url+ '/pro/professional/'+this.props.match.params.id+"/";
								axios.defaults.headers.common['Authorization'] ="token " + token;
								axios.get(newurl)
								.then(res => {
									//id,fir,las,avatar,unread,com_name
									var imgurl = res.data.profile.avatar_link;
									var index1 = res.data.profile.avatar_link.indexOf("users/avatar")
									if( index1 != -1){
											imgurl =res.data.profile.avatar_link.substring(index1);
									}
									this.setState({msglist:[{id:res.data.profile.user,first_name:res.data.profile.user_object.first_name,last_name:res.data.profile.user_object.last_name,avatar:imgurl,unread:0,company_name:res.data.profile.company_name},...this.state.msglist]})
								})
								.catch(err => {
									console.log(err)
								});
				}
            })
            .catch(err => {
                console.log(err)
            });
    }
    addmessage=()=>{
        if(this.state.message !=''){
			
			
			this.ws.send(JSON.stringify({
                'message': this.state.message,
                'sender':userinfo.id,
                'receiver':this.state.receiverid
            }));
            
        }
    }
    Inputmessage=(e)=>{
        e.preventDefault();
        this.setState({message:e.target.value});
    }
    adddialog=(val)=>{
        this.state.msglist.map((item,index)=>{
			if(item.id == val){
				this.setState({chatman:item})
			}
		})
		this.setState({receiverid:val,msgs:[]},()=>{
			var url = base.chat_url+'/chat/chat/?sender='+userinfo.id+'&listener='+this.state.receiverid;
			axios.defaults.headers.common['Authorization'] ="token " + token;
			axios.get(url)
			.then(res => {
				// 
				if(res.data.count !== 0){
					res.data.results.map((item,index)=>{
						if(item.sender == userinfo.id){
							var array = {own:'true',msg:item.message,date:item.created_at ,img:'https://placeimg.com/128/128/any'};
						}else{
							var array = {own:'false',msg:item.message,date:item.created_at ,img:'https://placeimg.com/128/128/any'};
						}
						this.setState({msgs:[array, ...this.state.msgs ] });
					})
				}
				
			})
			.catch(err => {
				console.log(err)
			});

		})
    }
 render(){
     return(
			<div className="container">
				<div className="messages-sec">
					<div className="row">
						<div className="col-lg-4 col-md-12 no-pdd">
							<div className="msgs-list">
								<div className="msg-title">
									<h3>Messages</h3>
									<ul>
										<li><a href="#" title=""><i className="fa fa-cog"></i></a></li>
										<li><a href="#" title=""><i className="fa fa-ellipsis-v"></i></a></li>
									</ul>
								</div>
								<div className="messages-list">
									<ul>
                                        {
                                            this.state.msglist.map((item,index)=>{
                                                return( <Contactlist key= {index} active = 'active' not= '0'  info = {item} onclickadd = {this.adddialog} />  )
                                            })
                                        }
									</ul>
								</div>
							</div>
						</div>
						<div className="col-lg-8 col-md-12 pd-right-none pd-left-none">
							<div className="main-conversation-box">
								<div className="message-bar-head">
									<div className="usr-msg-details">
										<div className="usr-ms-img">
											<img src={"https://soleo-coming-static.s3.amazonaws.com/media/"+this.state.chatman.avatar} alt=""/>
										</div>
										<div className="usr-mg-info">
											{ userinfo.id_company? <h3>{this.state.chatman.company_name }</h3> : <h3>{this.state.chatman.first_name +" "+this.state.chatman.last_name }</h3>}
											{/* <p>Online</p> */}
										</div>
									</div>
									<a href="#" title=""><i className="fa fa-ellipsis-v"></i></a>
								</div>
								<div  >
                                <ScrollToBottom className="messages-box " >
                                {
                                        
                                        this.state.msgs.map((list,index) => {
                                           return (
                                                list.own =='false'?<Othermsg key={index} info = {list}/>:<Ownmsg key={index} info = {list}/>
                                           )
                                       })
                                       
                                   }
                                </ScrollToBottom>
                                    
 								</div>
								<div className="message-send-area">
                                    <div className="row mf-field">
                                		<TextareaAutosize maxRows = {3} placeholder="Enter your message..." value = {this.state.message} className = 'form-control small-msg-input col-lg-9 col-sm-9 col-9' onChange={this.Inputmessage}/>
                                        <button className = 'col-lg-2 col-sm-2 col-2' type="button" onClick = {this.addmessage}>Send</button>
                                    </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
     );
 }   
}
const mapStateToProps = state => {
	return {
		profile: state.contentReducer.profile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageLayout));