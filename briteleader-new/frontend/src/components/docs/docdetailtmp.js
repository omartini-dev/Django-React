import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Popmsg from '../message/topmessage';
import axios from 'axios';
import * as base from '../env'
import {withRouter} from 'react-router-dom';
import { Document, Page } from "react-pdf";
import PDFViewer from 'mgr-pdf-viewer-react';
//import PDFViewer from 'pdf-viewer-reactjs'
//import file1 from './movielist.pdf'
// import "react-pdf/dist/Page/AnnotationLayer.css";

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

const jobs = []
class Docdetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            modalshow:false,
            articles:null,
            numPages: null,
            pageNumber: 1,
            scale:1,
		};
    }
 
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }
    componentDidUpdate(prevProps) {
        
       console.log("match",this.props.match.params.id)
        
    }
    componentDidMount(){
       
    }
    changezoomout = (e)=>{
        this.setState({scale:this.state.scale - 0.2},()=>{
            console.log('scale',this.state.scale)
        })
    }
    changezoomin=(e)=>{
        this.setState({scale:this.state.scale + 0.2},()=>{
            console.log('scale',this.state.scale)
        })
    }
 render(){
    const { pageNumber, numPages } = this.state;
    
     return(
        <main>
            <div className="main-section">
                <div className="container">
                    <div className="main-section-data">
                        <button className = 'btn zoomout'onClick={this.changezoomout}> <i className = 'fa fa-search-minus'></i></button> 
                        <button className = 'btn zoomin' onClick={this.changezoomin}> <i className = 'fa fa-search-plus'></i></button> 
                        <PDFViewer 
                            document={{
                                url: 'http://localhost:8000/api/doc/doc/'+this.props.match.params.id+'/pdfview/'
                            }} 
                            scale={this.state.scale}
                        />
                        
                    </div>
                </div> 
            </div>
            {/* <Popmsg/> */}
        </main>
     );
     }
}
const mapStateToProps = state => {

	return {
        profile: state.contentReducer.profile,
        postfile:state.contentReducer.postinfo
        
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Docdetail))