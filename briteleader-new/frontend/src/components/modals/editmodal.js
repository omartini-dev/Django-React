import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import * as base from '../env'



const token = localStorage.getItem('token');

class Editmodal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            postfolio:'',//"/static/frontend/images/about3.png",
            postdesc :'',
            posttitle:'',
            imagefile:'',
            changedimg:false,
		};
    }
 
    postfolioChangeImage = (event) =>{
        this.setState({postfolio:URL.createObjectURL(event.target.files[0]),imagefile:event.target.files[0],changedimg:true});

    }
    postfoliodesc = (event)=>{
        this.setState({postdesc:event.target.value });
    }
    posttitlefoliodesc=(e)=>{
        this.setState({posttitle:e.target.value});
    }
    addportfolio = () =>{
        //post airticle
        axios.defaults.headers.common['Authorization'] = "token " + token;
        var url = base.base_url+ '/art/list/'+this.props.editinfo.id;
        if(this.state.changedimg){
                let form_data = new FormData();
                form_data.append('media', this.state.imagefile, this.state.imagefile.name);
                form_data.append('title',this.state.posttitle);
                form_data.append('content',this.state.postdesc);
                axios.patch(url, form_data, {
                  headers: {
                      'content-type': 'multipart/form-data'
                  }
                })
                .then(res => {
                    ("posted art edited" ,res)
                    this.setState({changedimg:false})
                    this.props.onHide();
                })
                .catch(err => {
                    console.log("commonfield",err)
                });
        }else{
            let form_data = new FormData();
                form_data.append('title',this.state.posttitle);
                form_data.append('content',this.state.postdesc);
                axios.patch(url, form_data, {
                  headers: {
                      'content-type': 'multipart/form-data'
                  }
                })
                .then(res => {
                    ("posted art edited" ,res)
                    
                    this.props.onHide();
                })
                .catch(err => {
                    console.log("commonfield",err)
                });
        }
       
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.editinfo!=prevProps.editinfo){
            this.setState({posttitle:this.props.editinfo.title,postdesc:this.props.editinfo.content})
        }
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
            Edit Article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Dgmodal">
            <div className = 'post-modal-body'>
                <div className = 'post-modal-desc'>
                    <h4>Title</h4>
                    <input type = 'text' className='form-control' value={this.state.posttitle}  onChange={ this.posttitlefoliodesc}/>
                </div>
                <div className = 'post-modal-desc'>
                    <h4>Description</h4>
                    <textarea className='form-control' value={this.state.postdesc} onChange={ this.postfoliodesc}/>
                </div>
                <div className="add-dp" id="OpenImgUpload">
                    <input type="file" id="file3" onChange={this.postfolioChangeImage}/>
                    <label htmlFor="file3"><i className="fas fa-camera"></i></label>												
                </div>
                <img src = {this.state.postfolio}/>
            </div>
        </Modal.Body>
        <Modal.Footer className="Dgmodal">
            <p>( Article Image will not change if you not change Image )</p>
            <Button variant="success" onClick={this.addportfolio}>Edit</Button>
            <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
     );
 }   
}
const mapStateToProps = state => {
	return {
        profile: state.contentReducer.profile,
        editinfo:state.contentReducer.editArticle,
	};
};
const mapDispatchToProps = dispatch => {
	return {
        getProfile: () => dispatch(actions.getProfile()) ,
        setpostinfo:(postinfo) => dispatch(actions.setpostinfo(postinfo))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Editmodal)