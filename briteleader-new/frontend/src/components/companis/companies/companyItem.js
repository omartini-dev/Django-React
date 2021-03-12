import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/content';
import { Link, Route } from 'react-router-dom';

class ComItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: [],
		};
    }
    render(){
     return(
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="company_profile_info">
                <div className="company-up-info">
                    <div className='backcom'></div>
                    <img src={this.props.data.imgurl} alt=""/>
                    <h3>{this.props.data.name}</h3>
                    <h4>Establish : {this.props.data.establish}</h4>
                    <ul>
                        <li><a href="#" title="" className="follow">Follow</a></li>
                        <li><Link to = { '/message/'+this.props.data.userid } ><a title="" className="message-us"><i className="fa fa-envelope"></i></a></Link></li>
                    </ul>
                </div>
                < Link to={'/companyprofile'} className="view-more-pro">View Profile</Link>
            </div>
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
    export default connect(mapStateToProps, mapDispatchToProps)(ComItem)