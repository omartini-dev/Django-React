import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import Contactlist from './contactlist';
import Smallmsg from './smallmsg';
import axios from 'axios';
import * as base from '../env'
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

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

export default class Popupmsg extends Component {
    constructor(props){
        super(props);
        this.state={
            top:styles.top1,
            show:true,
            width:50,
            height:window.innerHeight-50,
            height1:'',
            height2:'',
            msgcount:[
               
            ],
            msglist:[],
            dataFromServer:'',
        }

    }
    updateDimensions() {
          let update_height = Math.round(window.innerHeight-50);
          let update_height2 = Math.round(window.innerHeight-500);
          this.setState({ height1: update_height,height2:update_height2 },()=>{
            if(this.state.show){
                this.setState({height:this.state.height1})
            }else{
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
    
    adddialog=(val)=>{
        var addarray =''
        this.state.msglist.map((item,index)=>{
            var count =0;
            if(item.id === val){
                this.state.msgcount.map((i,index)=>{
                    if(i.id ==val){
                        count++;
                    }
                })
                if(count == 0){
                    addarray = item;
                    this.setState({msgcount:[...this.state.msgcount, addarray] } );
                }
            
                
            }
        })
         
    }
    
    //ws = new WebSocket('ws://localhost:8000/ws/chat/dragon/')
    ws = new WebSocket(base.websock+'/chat/dragon/')
    
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));

        //websocket
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            }
    
            this.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({dataFromServer: message})
            }
    
            this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            }

            //get msglist http://localhost:8000/chat/listuser?sender=1
            var url = base.chat_url+'/chat/listuser?sender='+userinfo.id;
            axios.defaults.headers.common['Authorization'] ="token " + token;
            axios.get(url)
            .then(res => {
                console.log("list",res)
                if(res.data.count !== 0){
                   res.data.map((item,index)=>{
                       this.setState({msglist:[item , ...this.state.msglist]})
                   })

                }
            })
            .catch(err => {
                console.log(err)
            });

      }
    closemsgdialog=(val)=>{
        
        var array = [...this.state.msgcount];
        array.splice(val,1);
        this.setState({msgcount:array})

    }
	render() {
        
                return (
                    <div className='message-section'>
                        <div className = 'pop-message' style = {{top:this.state.height,right:10}}>
                            <div className = 'pop-header'>
                                <h3>Contact List </h3>
                                <a href='#' onClick = {this.showpopmsg}><i className = 'fa fa-clone'></i></a>
                            </div>
                            <div className = 'pop-body'>
                                <ul>
                                    {this.state.msglist == null?
                                        <Loader
                                            type="Plane"
                                            color="#00BFFF"
                                            height={100}
                                            width={100}
                                            timeout={0} //3 secs
                    
                                        />
                                        :this.state.msglist.map((item,index)=>{
                                            return( <Contactlist key= {index} not={0} info = {item} onclickadd = {this.adddialog} />  )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        {
                            this.state.msgcount.map((item,index)=>{
                                return(
                                    <Smallmsg key = {index} num={index } websock = {this.ws} currentemsgs = {this.state.dataFromServer} info = {item} onclickclose = {this.closemsgdialog}/>
                                )
                            })
                        }
                    </div>
                )
            
	}
}
