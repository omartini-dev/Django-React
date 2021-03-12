import React, { Component } from 'react';
import Home from './home';
import ComHome from './comhome';
import Createcom from './companis/create/layout'
import Createper from './companis/create/layout1'
import { connect } from 'react-redux';
import * as actions from '../store/actions/content';
import axios from 'axios';
import Jobs from './jobs/layout';
import * as base from './env'

const iscompany = localStorage.getItem('iscompany');
const isempty = localStorage.getItem('city');
const token =localStorage.getItem('token');

class Homepart extends Component {
    constructor(props){
        super(props);
        this.state={
            iscompany:null
        }
    }

    componentDidMount(){
        var url = base.base_url+ '/profile/profile/get_object';
		axios.defaults.headers.common['Authorization'] ="token " + token;
		axios.get(url)
		.then(res => {
			this.setState({userprofile:res.data})
			this.props.setUserProfile(res.data)
		})
		.catch(err => {
			console.log(err)
        });
    }
	render() {
        console.log("hompart ",isempty)
        if(isempty === 'null'){
            return (
                <div >
                    { iscompany === 'true'? <Createcom {...this.props}  /> :<Createper {...this.props} />}
                </div>
            )
        }else{
            return (
                <div >
                   { iscompany === 'true'? <ComHome {...this.props}  /> :<Jobs {...this.props} />}
                </div>
            )
        }
		
	}
}

const mapStateToProps = state => {

	return {
		userprofile: state.contentReducer.userprofile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		setUserProfile: (userprofile) =>dispatch(actions.setUserProfile(userprofile))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepart)