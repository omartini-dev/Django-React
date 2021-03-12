import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/content';
import ComItem from './companyItem.js';
import Popmsg from '../../message/topmessage';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import * as base from '../../env'

const token = localStorage.getItem('token');

class ComLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comprofile: [
				
			],
		};
    }
	componentDidMount() {
		//get messages
		var url = base.base_url+'/company/company/';
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			console.log(res)
			if(res.data.count !== 0){
                res.data.results.map((result)=>{
					let tmp = {id: result.id,name:result.profile.company_name,imgurl:result.profile.avatar_link ,establish :result.establish,userid:result.user }
                    this.setState({comprofile:[tmp, ...this.state.comprofile]})
                })
            }
			
		})
		.catch(err => {
			console.log(err)
		});
	}
    
 render(){
     return(
        <section className="companies-info">
			<div className="container">
				<div className="company-title">
					<h3>All Companies</h3>
				</div>
				<div className="companies-list">
					<div className="row"> 
                        
						{
							this.state.comprofile.map((item,index)=>{
								return(
									<ComItem key = {index} data = {item}/>
								);
							})
						}
                    </div>
                    
                </div>
				<div className="process-comm">
					<div className="spinner">
						<div className="bounce1"></div>
						<div className="bounce2"></div>
						<div className="bounce3"></div>
					</div>
				</div>
			</div>
			<Popmsg/>
		</section>
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
export default connect(mapStateToProps, mapDispatchToProps)(ComLayout)