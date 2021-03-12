import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';


class Jobright extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: [],
		};
    }
 
 render(){
     return(
        <div className="col-lg-3">
            <div className="right-sidebar">
                <div className="widget widget-about">
                    <img src="/static/frontend/images/wd-logo.png" alt=""/>
                    <h3>Track Time on Workwise</h3>
                    <span>Pay only for the Hours worked</span>
                    <div className="sign_link">
                        <i className="fa fa-2x fa-facebook-official" aria-hidden="true"></i>
                        <i className="fa fa-2x fa-twitter-square" aria-hidden="true"></i>
                        <i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="widget widget-jobs">
                    <div className="sd-title">
                        <h3>Top Jobs</h3>
                        <i className="la la-ellipsis-v"></i>
                    </div>
                    <div className="jobs-list">
                        <div className="job-info">
                            <div className="job-details">
                                <h3>Senior Product Designer</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                            </div>
                            <div className="hr-rate">
                                <span>$25/hr</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget widget-jobs">
                    <div className="sd-title">
                        <h3>Most Viewed This Week</h3>
                        <i className="la la-ellipsis-v"></i>
                    </div>
                    <div className="jobs-list">
                        <div className="job-info">
                            <div className="job-details">
                                <h3>Senior Product Designer</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                            </div>
                            <div className="hr-rate">
                                <span>$25/hr</span>
                            </div>
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
		profile: state.contentReducer.profile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Jobright)