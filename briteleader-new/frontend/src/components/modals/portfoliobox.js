import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Portfoliobox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: [],
		};
    }
 
    
 render(){
     return(
        <Modal
         show = {this.props.show}
         onHide = {this.props.onHide}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
        >
        <Modal.Header  className="Dgmodal">
          <Modal.Title className = "Dgmodaltitle" id="contained-modal-title-vcenter">
            Post Article
			<Button className = 'portfolioclose' variant="secondary" onClick={this.props.onHide}><i className = 'fa fa-close'></i></Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Dgmodal">
            <div className = 'portfolio-modal-body '>
                <div className = ' air-img'>
					<img src = {this.props.info.aircraft_image}/>
				</div>
                
            </div>
			<div className = ' air-desc'>
					
	 				<h4> Type : {this.props.info.aircraft_type}</h4>
					<h4> Number : {this.props.info.aircraft_number}</h4>
					<h4> {this.props.info.base} ~ {this.props.info.destinations} </h4>
					<hr/>
	 				<h4>{this.props.info.description}</h4>
				</div>
        </Modal.Body>
        <Modal.Footer className="Dgmodal">
            
        </Modal.Footer>
        </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Portfoliobox)