import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';

export default class Subflight extends Component {
    constructor(props){
        super(props);

    }
	render() {
		return (
            <div className = 'col col-lg-5 sub-flight'>
                <div className='row  '>
                    <div className = 'col col-lg-5 plane-fa'>
                        <i className="fas fa-2x fa-plane-departure"></i>
                    </div>
                    <div className = 'col col-lg-7'>
                        <div className = 'totalhr'>
                            <h5>{this.props.info.name}</h5>
                            <p>HRS : {this.props.info.time} </p>
                        </div>
                    </div>
                </div>
                <hr/>
                   
            </div>
            
		)
	}
}

