import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Joblist from './joblist';
import axios from 'axios';
import * as base from '../env'

const token =localStorage.getItem('token');
var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

class Jobcontent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            joblists:[]
		};
    }
 componentDidMount(){
     
    var url = base.base_url+ '/job/jobs/';
    axios.defaults.headers.common['Authorization'] = "token " + token;
    axios.get(url)
    .then(res =>{
        if(res.data.count != 0){
            res.data.results.map(result =>{
                 this.setState({joblists:[result , ...this.state.joblists]});
            });
        }
    })
    .catch(err=>{
        console.log(err)
    })
 }
 componentDidUpdate(prevProps) {
    if(this.props.searchval!=prevProps.searchval){
      
        var url = base.base_url+ '/job/jobs/'+this.props.searchval;
        axios.defaults.headers.common['Authorization'] = "token " + token;
        axios.get(url)
        .then(res =>{
            this.setState({joblists:[]},()=>{
                if(res.data.count != 0){
                    res.data.results.map(result =>{
                        this.setState({joblists:[result , ...this.state.joblists]});
                    });
                }
            })
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
   
    
}
 render(){

     return(
        <div className="col-lg-6">
            <div className="main-dgws-sec">
                <div className="posts-section">

                    {/* <Joblist job = {jobs[0]}/> */}
                    {
                        this.state.joblists.map(c=>{
                            return(
                                <Joblist key = {c.id} job = {c}/>
                            );
                        })
                    }
                   <div className="process-comm">
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
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
        //profile: state.contentReducer.profile
        searchval:state.contentReducer.searchval
	};
};
const mapDispatchToProps = dispatch => {
	return {
		//getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Jobcontent)