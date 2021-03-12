import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Jobleft from './jobleft';
import Jobright from './jobright';
import Jobcontent from './jobcontent';
import Popmsg from '../message/topmessage';
import * as base from '../env'

class JobLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: [],
		};
    }
    Searchfieldval=(val)=>{
       this.props.setsearchval(val);
         
    }

 render(){
     return(
         <div >
        <main>
            <div className="main-section">
                <div className="container">
                    <div className="main-section-data">
                        <div className="row">
                            <div className="col-lg-3">
                                <Jobleft onclickadd = {this.Searchfieldval}/>
                            </div>
                            <Jobcontent />
                            <Jobright/>
                        </div>
                    </div>
                </div> 
            </div>
        </main>
        <Popmsg />
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
        //getProfile: () => dispatch(actions.getProfile()) 
        setsearchval:(val)=>dispatch(actions.setsearchval(val))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(JobLayout)