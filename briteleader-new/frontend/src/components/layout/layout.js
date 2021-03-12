import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './header';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Footer from '../profile/overviewbox';

class Layout extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={this.props.ptarget==null || this.props.pstate=='close'?"wrapper":"wrapper overlay"}>
				<Header {...this.props} />
				{this.props.children}
				<Footer {...this.props}/>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		ptarget: state.contentReducer.ptarget,
		paction: state.contentReducer.paction,
		pstate: state.contentReducer.pstate
	};
};
export default withRouter(connect(mapStateToProps)(Layout));