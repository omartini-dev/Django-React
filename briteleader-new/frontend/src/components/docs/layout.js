import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import MainContent from '../layout/maincontent';
import Sidebar from '../layout/sidebar';
import { Link, Route } from 'react-router-dom';
import Popmsg from '../message/topmessage';
import axios from 'axios';
import * as base from '../env'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Redirect } from 'react-router';
import { saveAs } from 'file-saver';



const token = localStorage.getItem('token');
const joblist = {P:"Pilot",C:"Cabin Crew",M:"Maintenence",O:"Office"}
var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
class doclayout extends Component {
	constructor(props){
		super(props);
		this.state={
			comprofile:'',
            redirect:false,
            docid:'',
            doclist:[],
            topdocs:[],
            is_vip:false
		}
    }
    showdocdetail=(val,val1,title)=>{
        console.log("id" , val,val1)
        if( val1){

            let url =`${base.base_url}/doc/doc/`+val+'/pdfview/'
             axios.defaults.headers.common['Authorization'] = "token " + token;
            axios.get(url,{
                responseType: 'arraybuffer',
            })
                .then(res => {
                    var blob = new Blob([res.data], {type : 'application/pdf'});
                    saveAs(blob,title)
                   
                })
                .catch(err => {
                    console.log("commonfield",err)
                });
        }else{
            this.setState({redirect:true,docid:val})
        }
        
    }
	componentDidMount(){
		
		//fetch company info
		var url = base.base_url+'/profile/profile/get_object';
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			this.setState({comprofile:res.data},()=>{
                console.log('comprofile',this.state.comprofile)
            })
			this.props.setComProfile(res.data)
		})
		.catch(err => {
			console.log(err)
        });
        
        var url2= base.base_url+'/doc/doc';
        axios.get(url2)
		.then(res => {
            console.log("doclist",res);
			
            this.setState({doclist:res.data.results})
            for(let i=0; i<10 ; i++){
                if (res.data.results[i] != null){
                    this.setState({topdocs: [res.data.results[i], ...this.state.topdocs]})
                }
            }
		})
		.catch(err => {
			console.log(err)
        });

	}
	render() {
        // if(userinfo.is_subscribed == false){
        //     return<Redirect push to={"/"}/>
        // }
        if (this.state.redirect) {
            return <Redirect push to={"/docdetail/"+this.state.docid} />;
          }
		return (
			<div>
				<main>
               
					<div className="main-section">
						<div className="container">
							<div className="main-section-data">
								<div className="row">
									<div className="col-lg-3 col-md-4 pd-left-none no-pd">
										<div className="main-left-sidebar no-margin">
											<div className="user-data full-width">

												<div className="user-profile">
													<div className="username-dt">
														<div className="com-usr-pic">
															<img src={this.state.comprofile.avatar_link} alt=""/>
														</div>
													</div>
													<div className="user-specs">
														<h3>{this.state.comprofile.company_name}</h3>
														<span>{this.state.comprofile.desc}</span>
													</div>
												</div>
												<ul className="user-fw-status">
                                                    
													
													<li>
                                                    {
                                                        this.state.comprofile.is_company?<div><h4>Followers</h4>  <span>{this.state.comprofile.follower}</span> </div>:<div><h4>Following</h4><span>{this.state.comprofile.following}</span></div>
                                                    }
														
													</li>
												</ul>
											</div>
										</div>
										{/* <Search /> */}
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

									</div>
									<div className="col-lg-9 col-md-8 no-pd">
										<div className="main-doc-sec">
                                            <img src='/static/frontend/images/banner/bookbanner.jpg'/>
                                            
										</div>
                                        <div className = 'main-doc-sec-1'>
                                            <Carousel responsive={responsive} autoPlay = {true} infinite = {true} arrows = {false}>
                                                {
                                                    this.state.topdocs.map((list,index)=>{
                                                        return(
                                                            <Bookitem key = {index} info = {list} ongetid = {this.showdocdetail} data-id={list.id}/>
                                                        )
                                                    })
                                                }
                                            </Carousel>
                                        </div>
                                        <div className = 'main-doc-sec-1'>
                                            <div className="search-bar1">
                                                {/* <form>
                                                    <input type="text" name="search" placeholder="Search..."/>
                                                    <button type="submit"><i className="la la-search"></i></button>
                                                </form> */}
                                                <h3>Documents List</h3>
                                                <hr/>
                                            </div>
                                            <div className = 'doc-list'>
                                                <div className = ' row doc-header'>
                                                    <div className = 'col-lg-1 col-1'><h3>No</h3></div>
                                                    <div className = 'col-lg-5 col-5'><h3>Subject</h3></div>
                                                    <div className = 'col-lg-2 col-2'><h3>Publish</h3></div>
                                                    <div className = 'col-lg-3 col-3'><h3>Group</h3></div>
                                                    <div className = 'col-lg-1 col-1'><h3>Price</h3></div>
                                                </div>
                                                <div className = 'doc-box'>
                                                    {
                                                            this.state.doclist.map((list,index)=>{
                                                                return(
                                                                    index % 2 == 0 ? <Docitemeven ongetid = {this.showdocdetail} key = {index} data-id={list.id} info = {list} num = {index}/>:<Docitem ongetid = {this.showdocdetail} key = {index} data-id={list.id} info = {list} num = {index}/>
                                                                );
                                                            })
                                                        
                                                    }
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</main>
				<Popmsg />
			</div>
		)
	}
}
class Bookitem extends React.Component {
    constructor(props){
        super(props);
    
    }
    senddatatoparent=()=>{
        this.props.ongetid(this.props.info.id , this.props.info.purchased,this.props.info.title);
    }
    render(){
        return(
            <div className = 'book-item ' onClick = {this.senddatatoparent}>
                {
                    this.props.info.new_document? <div className = 'bookmark'> <p>New</p> </div> : null
                }
               
                <div className = 'bookface'>
                    <img src={this.props.info.cover}/>
                </div>
                <div className='booktitle'>
                    <h3>{this.props.info.title}</h3>
                </div>
                <div className = 'bookprice row'>
                    <p className = 'col-lg-6 p-0'>{this.props.info.publish_date}</p>
                    {
                        this.props.info.purchased? <p className = 'b-purchased col-lg-6 p-0'> Purchased</p>:<p className = 'b-price col-lg-6 p-0'>$ {this.props.info.price}</p>
                    }
                    
                </div>
                
            </div>
        )
    }
}
class Docitem extends React.Component {
    constructor(props){
        super(props);
    
    }
    senddatatoparent=()=>{
        this.props.ongetid(this.props.info.id,this.props.info.purchased,this.props.info.title);
    }
    render(){
        return(
            <div className = 'doc-item row  odd' onClick = {this.senddatatoparent}>
                <div className = 'col-lg-1 col-1'>{this.props.num + 1}</div>
                <div className = 'col-lg-5 col-5'>{this.props.info.title}</div>
                <div className = 'col-lg-2 col-2'>{this.props.info.publish_date}</div>
                <div className = 'col-lg-3 col-3'>{this.props.info.group}</div>
                {
                    this.props.info.purchased? <div className = 'col-lg-1 col-1'><i className= 'fa fa-check'></i></div> : <div className = 'col-lg-1 col-1'>{this.props.info.price}</div>
                }
            </div>
        )
    }
}
class Docitemeven extends React.Component {
    constructor(props){
        super(props);
    
    }
    senddatatoparent=()=>{
        this.props.ongetid(this.props.info.id,this.props.info.purchased,this.props.info.title);
    }
    render(){
        return(
            <div className = 'doc-item row  even' onClick = {this.senddatatoparent}>
                <div className = 'col-lg-1 col-1'>{this.props.num + 1}</div>
                <div className = 'col-lg-5 col-5'>{this.props.info.title}</div>
                <div className = 'col-lg-2 col-2'>{this.props.info.publish_date}</div>
                <div className = 'col-lg-3 col-3'>{this.props.info.group}</div>
                {
                    this.props.info.purchased? <div className = 'col-lg-1 col-1'><i className= 'fa fa-check'></i></div> : <div className = 'col-lg-1 col-1'>{this.props.info.price}</div>
                }
                
            </div>
        )
    }
}
const mapStateToProps = state => {

	return {
		userprofile: state.contentReducer.userprofile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		//getProfile: () => dispatch(actions.getProfile()) 
		setComProfile: (comprofile) =>dispatch(actions.setComProfile(comprofile))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(doclayout)