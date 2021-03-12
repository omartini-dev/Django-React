import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import Contactlist from './contactlist';
import ScrollToBottom from 'react-scroll-to-bottom';
import Smownmsg from './smownmsg';
import Smothermsg from './smothermsg';
import axios from 'axios';
import * as base from '../env';
import TextareaAutosize from 'react-textarea-autosize';

const styles = {
    top1:{
        top:window.innerHeight -50
    },
    top2:{
        top:window.innerHeight -550
    }
}
var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token =localStorage.getItem('token');
export default class Smallmsg extends Component {
    constructor(props){
        super(props);
        this.state={
            top:styles.top1,
            show:false,
            width:50,
            height:window.innerHeight-50,
            height1:'',
            height2:'',
            msgs:[
                // {own:'true',msg:'cras ulricies ligula dragon troika',date:'sat,Aug23,1:08 PM',img:'https://placeimg.com/128/128/any'},
                // {own:'false',msg:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor.',date:'sat,Aug23,1:08 PM',img:'https://placeimg.com/128/128/any'},
                
            ],
            message:'',
            // chatSocket:new WebSocket
            otheravatar:'',
        }

    }
    updateDimensions() {
        
          let update_height = Math.round(window.innerHeight-50);
          let update_height2 = Math.round(window.innerHeight-550);
          this.setState({ height1: update_height,height2:update_height2 },()=>{
            if(this.state.show){
                console.log("truess")
                this.setState({height:this.state.height1})
            }else{
                console.log("falses")
                this.setState({height:this.state.height2})
            }
          });
          
       
      }
    showpopmsg=(e)=>{
        e.preventDefault();
        if(this.state.show == false){
            this.setState({height:this.state.height1,show:true})
        }else{
            this.setState({height:this.state.height2,show:false})
        }
    }
    closepopmsg=(e)=>{
        this.props.onclickclose(this.props.num);
    }
    showsmallmsg=(e)=>{
        e.preventDefault();

        
    }
    componentDidMount() {
        this.updateDimensions();
        // f7db63ac.ngrok.io
        window.addEventListener("resize", this.updateDimensions.bind(this));
        //get messages
        var url = base.chat_url+'/chat/chat/?sender='+userinfo.id+'&listener='+this.props.info.id;
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
            // 
            if(res.data.count !== 0){
                res.data.results.map((item,index)=>{
                    if(item.sender == userinfo.id){
                        var array = {own:'true',msg:item.message,date:item.created_at ,img:item.senderprofile.avatar};

                    }else{
                        var array = {own:'false',msg:item.message,date:item.created_at ,img:item.listenerprofile.avatar};
                        this.setState({otheravatar:item.listenerprofile.avatar})
                    }
                    this.setState({msgs:[array, ...this.state.msgs ] });
                })
            }
            
		})
		.catch(err => {
			console.log(err)
        });

    }

    inputmessage=(e)=>{
        this.setState({message:e.target.value})
    }
    sendmessage=()=>{
        if(this.state.message !==''){
            
            const{chatSocket} = this.props.websock;
            this.props.websock.send(JSON.stringify({
                'message': this.state.message,
                'sender':userinfo.id,
                'receiver':this.props.info.id
            }));
        }
    }
    componentDidUpdate(prevProps) {

        
        if(this.props.currentemsgs!=prevProps.currentemsgs){
          if(this.props.currentemsgs.sender == userinfo.id && this.props.currentemsgs.receiver == this.props.info.id){
            var array = {own:'true',msg:this.props.currentemsgs.message,date:'sat,Oct21,1:08 PM',img:'https://placeimg.com/128/128/any'};
            this.setState({msgs:[...this.state.msgs, array] ,message:''});
          }
          if(this.props.currentemsgs.sender == this.props.info.id && this.props.currentemsgs.receiver == userinfo.id){
            var array = {own:'false',msg:this.props.currentemsgs.message,date:'sat,Oct21,1:08 PM',img:this.state.otheravatar};
            this.setState({msgs:[...this.state.msgs, array] ,message:''});
          }
            
        }
        
        
    }
    
	render() {
		return (
            <div className='message-section'>
                <div className = 'pop-message1' style = {{top:this.state.height,right:(this.props.num +1) * 370}}>
                    <div className = 'pop-header'>
                        <h3>{this.props.info.name}</h3>
                        {userinfo.is_company == 'true' ?this.props.info.company_name : this.props.info.first_name + this.props.info.last_name }
                        <a href='#' onClick = {this.closepopmsg}><i className = 'fa fa-close'></i></a>
                        <a href='#' onClick = {this.showpopmsg}><i className = 'fa fa-clone'></i></a>
                    </div>
                    <div className = 'pop-body1'>
                        <ScrollToBottom className="sm-messages-box row" >
                            {
                                this.state.msgs.map((list,index) => {
                                    return (
                                        list.own =='true'?<Smownmsg  key={index} info = {list}/>:<Smothermsg key={index} info = {list}/>
                                    )
                                })
                                
                                
                            }
                            
                        </ScrollToBottom>
                        <div className='row sm-msg-input'>
                            <div className = 'col-lg-9'>
                                <TextareaAutosize maxRows = {3} placeholder="Enter your message..." value = {this.state.message} className = 'form-control small-msg-input' onChange={this.inputmessage}/>
                            </div>
                            <div className = 'col-lg-3'>
                                <button className = 'sm-send-btn btn btn-success'  onClick={this.sendmessage}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
		)
	}
}
