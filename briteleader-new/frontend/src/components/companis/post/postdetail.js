import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/content';
import Biditem from './biditem';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import Popmsg from '../../message/topmessage';
import * as base from '../../env'

const token =localStorage.getItem('token');
const jobtypes = {P:"PartTime",F:"FullTime"};
const joblist = {P:"Pilot",C:"Cabin Crew",M:"Maintenence",O:"Office"}
class Postdetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            jobdetail:[],
            bidlist:[],
		};
    }
    
    componentDidMount(){

        var url =base.base_url+ '/job/jobs/'+this.props.match.params.id+'/';
        axios.defaults.headers.common['Authorization'] ="token " + token;
        axios.get(url)
        .then(res => {
            if(res.data.count !== 0){
                this.setState({jobdetail:res.data})

            }
        })
        .catch(err => {
            console.log(err)
        });

        var url1 = base.base_url+ '/bid/bids/?jobs='+this.props.match.params.id;
        axios.defaults.headers.common['Authorization'] ="token " + token;
        axios.get(url1)
        .then(res => {
            if(res.data.count !== 0 ){
                this.setState({bidlist:res.data.results})
            }
            
        })
        .catch(err => {
            console.log(err)
        });

    }

    showbiddetail=(e)=>{
    }
 render(){
     if(this.state.jobdetail!== []  ){
     return(
			<div className="container">
				<div className = 'p-com-name'>
                    <h3></h3>
                </div>
                <div className = 'p-com-list-container'>
                    <h3>{this.state.jobdetail.title}</h3>
                    <hr/>
                    <div className = 'row p-com-list'>
                        <div className = 'col col-lg-3'>
                            <h3>{jobtypes[this.state.jobdetail.job_type]} : ${this.state.jobdetail.rate}/hr</h3>
                        </div>
                        <div className = 'col col-lg-3'>
                            <h3>Level : {this.state.jobdetail.exp_lv} years</h3>
                        </div>
                        <div className = 'col col-lg-3'>
                            <h3>Job Type :{joblist[this.state.jobdetail.position]} </h3>
                        </div>
                        <div className = 'col col-lg-3'>
                            <h3>Country : {this.state.jobdetail.country} </h3>
                        </div>
                    </div>
                    <div className='p-j-descript'>
                        <span>
                            {this.state.jobdetail.description}
                        </span>
                    </div>
                    <hr/>
                </div>
                <div className = 'p-bid-list'>
                    {/* <Biditem /> */}
                    {
                        this.state.bidlist.map((item,index)=>{

                            return(
                                <li key = {index} data-index_id = {index} data-id={item.id} onClick={this.showbiddetail}> <Biditem info = { item } />  </li>
                            )
                        })
                    }

                </div>
                <Popmsg/>
			</div>
     );
     }else{
         return(
             <div>
                <Loader
                    type="Plane"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    //timeout={3000} //3 secs

                />
             </div>
         )
     }
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Postdetail))