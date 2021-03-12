import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import * as base from '../env'
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



const token = localStorage.getItem('token');

class Postmodal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            postfolio:'',//"/static/frontend/images/about3.png",
            postdesc :'',
            posttitle:'',
            imagefile:'',
            spiner:false
		};
    }
 
    postfolioChangeImage = (event) =>{
        this.setState({postfolio:URL.createObjectURL(event.target.files[0])});

        this.setState({imagefile:event.target.files[0]});
    }
    postfoliodesc = (event)=>{
        this.setState({postdesc:event.target.value });
    }
    posttitlefoliodesc=(e)=>{
        this.setState({posttitle:e.target.value});
    }
    addportfolio = () =>{
        this.setState({spiner:true})
        //post airticle
        axios.defaults.headers.common['Authorization'] = "token " + token;
        var url = base.base_url+ '/art/list/';
        let form_data = new FormData();
        if(this.state.imagefile && this.state.imagefile!='')
            form_data.append('media', this.state.imagefile, this.state.imagefile.name);
        form_data.append('title',this.state.posttitle);
        form_data.append('content',this.state.postdesc);
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            ("posted art" ,res)
            this.props.setpostinfo(res.data);
            this.setState({postfolio:''});
            this.setState({spiner:false})
            this.props.onHide();
        })
        .catch(err => {
            console.log("commonfield",err)
        });

       
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
            Post Article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Dgmodal">
            {
                this.state.spiner?
                    <div className = 'post-spiner'>
                            <Loader
                                    type="Plane"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                    timeout={0} //3 secs

                                />
                    </div>: null
                }
            <div className = 'post-modal-body'>
                <div className = 'post-modal-desc'>
                    <h4>Title</h4>
                    <input type = 'text' className='form-control'  onChange={ this.posttitlefoliodesc}/>
                </div>
                <div className = 'post-modal-desc'>
                    <h4>Description</h4>
                    <textarea className='form-control'  onChange={ this.postfoliodesc}/>
                </div>
                <div className="add-dp" id="OpenImgUpload">
                    <input type="file" id="file3" onChange={this.postfolioChangeImage}/>
                    <label htmlFor="file3"><i className="fas fa-camera"></i></label>												
                </div>
                <img src = {this.state.postfolio}/>
            </div>
        </Modal.Body>
        <Modal.Footer className="Dgmodal">
            <Button variant="success" onClick={this.addportfolio}>Post</Button>
            <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
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
        setpostinfo:(postinfo) => dispatch(actions.setpostinfo(postinfo))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Postmodal)