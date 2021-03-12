import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Feeds from './feeds';
import Bids from './bids';
import Info from './info';
import Jobs from './jobs';
import Payments from './payments';
import PList from './plist';
import Reviews from './reviews';
import axios from "axios";

class ProMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: [],
		};
	}

	componentDidMount(){
		this.props.getProfile();
	}
	render() {
		return (
			<div className="main-ws-sec">
			<Tabs>
				<div className="user-tab-sec rewivew">
					<h3>John Doe</h3>
					<div className="star-descp clearfix">
						<span>Graphic Designer at Self Employed</span>
						<ul>
							<li><i className="fa fa-star"></i></li>
							<li><i className="fa fa-star"></i></li>
							<li><i className="fa fa-star"></i></li>
							<li><i className="fa fa-star"></i></li>
							<li><i className="fa fa-star-half-o"></i></li>
						</ul>
						<a href="#" title="">Status</a>
					</div>
					<div className="tab-feed st2 settingjb">
						<TabList>
							<Tab className="animated fadeIn" selectedClassName="active">
									<img src="/static/frontend/images/ic1.png" alt=""/>
									<span>Feed</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<img src="/static/frontend/images/ic2.png" alt=""/>
									<span>Info</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<img src="/static/frontend/images/ic4.png" alt=""/>
									<span>Jobs</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<img src="/static/frontend/images/ic5.png" alt=""/>
									<span>Bids</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<img src="/static/frontend/images/ic3.png" alt=""/>
									<span>Portfolio</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<img src="/static/frontend/images/review.png" alt=""/>
									<span>Reviews</span>
							</Tab>
							<Tab className="animated fadeIn" selectedClassName="active">
									<img src="/static/frontend/images/ic6.png" alt=""/>
									<span>Payment</span>
							</Tab>
						</TabList>
					</div>
				</div>
				<TabPanel className="fade" selectedClassName="animated fadeIn current">
					<Feeds />
				</TabPanel>
				<TabPanel className="fade" selectedClassName="animated fadeIn current">
					<Info/>
				</TabPanel>

				<TabPanel className="fade" selectedClassName="animated fadeIn current">
					<Jobs />
				</TabPanel>

				<TabPanel className="fade" selectedClassName="animated fadeIn current">
					<Bids />
				</TabPanel>
				<TabPanel className="fade" selectedClassName="animated fadeIn current">
					<PList />
				</TabPanel>
				<TabPanel className="fade" selectedClassName="animated fadeIn current">
					<Reviews />
				</TabPanel>
				<TabPanel className="fade" selectedClassName="animated fadeIn current">
					<Payments />
				</TabPanel>
				</Tabs>
			</div>
		)
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
export default connect(mapStateToProps, mapDispatchToProps)(ProMain)