import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Link, Route } from 'react-router-dom';
import Portfoliomodal from '../modals/portfoliobox';
import ModalImage from "react-modal-image";
import { Lightbox } from "react-modal-image";
//import Gallery from './gallery';

export default class RProSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			  currImg: 0,
			  passport:'',
			  license:'',
			  medical:'',
			  logbook:'',
			  toggler:false,
			  open:false,
			  modalshow:false,
		};
		this.gotoNext = this.gotoNext.bind(this)
		this.gotoPrevious = this.gotoPrevious.bind(this)
		this.closeViewer = this.closeViewer.bind(this)
	}
	closeViewer () {
		this.setState({
		  currImg: 0,
		  isOpen: false,
		})
	  }
	  gotoPrevious () {
		this.setState({
		  currImg: this.state.currImg - 1
		})
	  }
	  gotoNext () {
		this.setState({
		  currImg: this.state.currImg + 1
		})
	  }
	  passportChangeImage=(event)=>{
		this.setState({passport:URL.createObjectURL(event.target.files[0])})
	  }
	  licenseChangeImage=(event)=>{
		this.setState({license:URL.createObjectURL(event.target.files[0])})
	  }
	  medicalChangeImage=(event)=>{
		this.setState({medical:URL.createObjectURL(event.target.files[0])})
	  }
	  settoggler = () =>{
		this.setState((prevState)=>({toggler: !prevState.toggler}));
	  }
	  clicklitag = (e)=>{
		  e.preventDefault();
		  this.setState({modalshow:true});
	  }
	render() {
		return (
			<div className="right-sidebar person-right">
				
				<div className="widget widget-portfolio">
					<div className="wd-heady">
						<h3>Portfolio</h3>
						<img src="/static/frontend/images/photo-icon.png" alt=""/>
					</div>
					
					<div className="pf-gallery">
					
						<ul>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="https://placeimg.com/256/256/any" alt=""/></a></li>
							<li>
								<a href="#" onClick = {this.clicklitag} title="">
								<img src="/static/frontend/images/resources/pf-gallery3.png" alt=""/>

								</a>
							</li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery3.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery4.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery5.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery6.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery7.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery8.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery9.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery10.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery11.png" alt=""/></a></li>
							<li><a href="#" onClick = {this.clicklitag} title=""><img src="/static/frontend/images/resources/pf-gallery12.png" alt=""/></a></li>
						</ul>
						
							
					</div>
				
					
				</div>
				{/* <Portfoliomodal show={this.state.modalshow}  onHide={()=>{this.setState({modalshow:false})}}/> */}
				{/* <div className='upload passport'>
					{this.props.authuser == 'com'? <h3>Passport</h3>:
					<h3>Passport <input type="file" id="passport" accept="image/*" onChange={this.passportChangeImage} /><label htmlFor="passport"><i className="fa fa-plus-square"></i></label></h3>}
					<hr/>
					<img src = {this.state.passport} />
				</div>
				<div className = 'upload license'>
					{this.props.authuser =='com' ? <h3>Lincese</h3> :
					<h3>Lincese <input type="file" id="license"accept="image/*"  onChange={this.licenseChangeImage}/><label htmlFor="license"><i className="fa fa-plus-square"></i></label></h3>}
					<hr/>
					<img src = {this.state.license} />
				</div>
				<div className = 'upload medical'>
					{this.props.authuser == 'com' ? <h3>Medical</h3> :
					<h3>Medical <input type="file" id="medical" accept="image/*" onChange={this.medicalChangeImage}/><label htmlFor="medical"><i className="fa fa-plus-square"></i></label></h3>}
					<hr/>
					<img src = {this.state.medical} />
				</div>
				<div className = 'upload logbook'>
					{this.props.authuser =='com'? <h3>Logbook</h3> :
					<h3>Logbook <input type="file" id="passport"  /><label htmlFor="passport"><i className="fa fa-plus-square"></i></label></h3>}
					<hr/>
					
				</div> */}
			</div>
		)
	}
}
