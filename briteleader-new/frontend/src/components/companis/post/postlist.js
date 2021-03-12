import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/content';
import Postitem from './postitem';
import { Redirect } from 'react-router';
import Cominfo from '../../articles/left'
import axios from 'axios';
import Popmsg from '../../message/topmessage';
import * as base from '../../env'

const token =localStorage.getItem('token');
var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);

class Postlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            redirect:false,
            id:'',
            comId:'',
            gotopost:false,
            joblist:[],
		};
    }
    showdetail=(e)=>{
        e.preventDefault();
        var linkid = e.currentTarget.dataset.id;
        this.setState({redirect:true,id:linkid});
    }
    gocreatepost=()=>{
        this.setState({gotopost:true});
    }

    componentDidMount(){
        var url = base.base_url+ '/company/company_profile/mydetail/';
		axios.defaults.headers.common['Authorization'] = "token " + token;
        axios.get(url)
        .then(res =>{
            this.setState({comId:res.data[0].company.id},()=>{
                var url = base.base_url+ '/job/jobs/?company_id='+this.state.comId;
                axios.defaults.headers.common['Authorization'] ="token " + token;
                axios.get(url)
                .then(res => {
                    this.setState({joblist:res.data.results})
                })
                .catch(err => {
                    console.log(err)
                });
                    })
                })
        .catch(err=>{
            console.log(err)
        })

    }
 render(){
    if (this.state.redirect) {
        return <Redirect push to={"/postdetail/"+this.state.id} />;
      }
    if (this.state.gotopost) {
    return <Redirect push to={"/postcom"} />;
    }

     return(
			<div className="container">
                <div className = 'joblist row'>
                    <div className = 'col col-lg-3'>
                        <Cominfo />
                    </div>
                    <div className = 'col col-lg-9'>
                        <div className = 'row p-com-name'>
                            <h3 className = 'col-lg-10'>Jostlist</h3>
                            <button className = 'col-lg-2 btn btn-success' onClick={this.gocreatepost}>Post Job</button> 
                        </div>
                        <div className = 'p-com-list-container'>
                            <h3>My Postings</h3>
                            <hr/>
                            <div className = 'p-com-list'>
                                <ul>
                                    
                                    {
                                       this.state.joblist.map((item,index)=>{

                                            return(
                                                <li key = {index} data-index_id = {index} data-id={item.id} onClick={this.showdetail}> <Postitem info = { item } />  </li>
                                            )
                                        })
                                    }
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
				<Popmsg/>
			</div>
     );
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
export default connect(mapStateToProps, mapDispatchToProps)(Postlist)