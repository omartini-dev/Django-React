import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ValidatorForm  } from 'react-form-validator-core';
import TextValidator from '../login/textvalidator.js';
import axios from 'axios';
import * as base from '../env'

class Portmodal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            portfolio:"",
            portdesc :'',
            air_type:'',
            air_num:'',
            air_base:'',
            air_dest:'',
            air_desc:'',

            imagefile:'',
            
		};
    }
 
    portfolioChangeImage = (event) =>{
        this.setState({portfolio:URL.createObjectURL(event.target.files[0])});

        this.setState({imagefile:event.target.files[0]});
    }
    portfoliodesc = (event)=>{
        this.setState({portdesc:event.target.value });
    }
    addportfolio = () =>{
        
        
    }
    TypehandleChange =(e)=>{
      this.setState({air_type: e.target.value});
    }
    BasehandleChange =(e)=>{
      this.setState({air_base: e.target.value});
    }
    NumhandleChange =(e)=>{
      this.setState({air_num: e.target.value});
    }
    DesthandleChange =(e)=>{
      this.setState({air_dest: e.target.value});
    }
    handleportSubmit=()=>{
      if(this.state.portfolio != ''){
        
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = "token " + token;
        var url = base.base_url+ '/company/company_profile/';
        let form_data = new FormData();
                form_data.append('aircraft_image', this.state.imagefile, this.state.imagefile.name);
                form_data.append('description',this.state.portdesc);
                form_data.append('aircraft_type',this.state.air_type);
                form_data.append('aircraft_number',this.state.air_num);
                form_data.append('destinations',this.state.air_dest);
                form_data.append('base',this.state.air_base);
                form_data.append('type',this.state.portfolio);
                axios.post(url, form_data, {
                  headers: {
                      'content-type': 'multipart/form-data'
                  }
                })
                .then(res => {
                    let airinfo = {};
                    airinfo.id = res.data.id;
                    airinfo.img = res.data.type;
                    airinfo.desc = res.data.description;
                    airinfo.type = res.data.aircraft_type;
                    airinfo.num = res.data.aircraft_number;
                    airinfo.base = res.data.base;
                    airinfo.dest = res.data.destinations;

                    this.props.setportfolioinfo(airinfo);
                    this.setState({air_type:'',air_num:'',air_base:'',air_dest:'',air_desc:'',portfolio:''})
                    this.props.onHide();
                })
                .catch(err => {
                    console.log("commonfield",err)
                });
        
      }
    }
    closebtnclick=()=>{
      this.setState({air_type:'',air_num:'',air_base:'',air_dest:'',air_desc:'',portfolio:''})
      this.props.onHide();
    }
 render(){
     return(
     
        <Modal
         show = {this.props.show}
         onHide = {this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header  className="Dgmodal">
          <Modal.Title id="contained-modal-title-vcenter">
            Add Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Dgmodal">
        <ValidatorForm
              ref = 'portform'
              onSubmit = {this.handleportSubmit} >
          <div className='row'>
            <div className = 'col col-lg-5 portfolioimg '>
                <h4>Upload your portfoilo</h4>
                <div className="add-dp add-craft" id="OpenImgUpload">
                    <input type="file" id="file3" onChange={this.portfolioChangeImage}/>
                    <label htmlFor="file3"><i className="fas fa-camera"></i></label>												
                </div>
                <img src = {this.state.portfolio}/>
            </div>
            <div className = 'col col-lg-7 portfolioimg row'>
            
                <div className = 'col col-lg-6'>
                  <TextValidator
                    onChange={this.TypehandleChange}
                    name = "text"
                    type = 'text'
                    className = 'form-control dginput'
                    value = {this.state.air_type}
                    placeholder="AirCraft Type"
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />

                  <TextValidator
                    onChange={this.BasehandleChange}
                    name = "text"
                    type = 'text'
                    className = 'form-control dginput'
                    value = {this.state.air_base}
                    placeholder="Base"
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <div className = 'col col-lg-6'>
                <TextValidator
                    onChange={this.NumhandleChange}
                    name = "text"
                    type = 'number'
                    className = 'form-control dginput'
                    value = {this.state.air_num}
                    placeholder="AirCraft Number"
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                  <TextValidator
                    onChange={this.DesthandleChange}
                    name = "text"
                    type = 'text'
                    className = 'form-control dginput'
                    value = {this.state.air_dest}
                    placeholder="Destination"
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                </div>
                <h4>Description</h4>
                <textarea className='form-control' onChange={ this.portfoliodesc}/>
            </div>
          </div>
          <div className = 'formbtns'>
            <button type="submit" value="submit" className = 'btn btn-success'>Save</button>
            <button type="button" value="button" className = 'btn btn-primary' onClick={this.closebtnclick}>Close</button>
          </div>
         
          </ValidatorForm>
        </Modal.Body>
        {/* <Modal.Footer className="Dgmodal">
            <Button type="submit" value="submit" variant="success" onClick={this.addportfolio}>Save</Button>
            <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer> */}
        
      </Modal>
      
     );
 }   
}
const mapStateToProps = state => {
	return {
        profile: state.contentReducer.profile,

	};
};
const mapDispatchToProps = dispatch => {
	return {
        getProfile: () => dispatch(actions.getProfile()) ,
    
        setportfolioinfo:(portfoilo) => dispatch(actions.setportfolioinfo(portfoilo))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Portmodal)