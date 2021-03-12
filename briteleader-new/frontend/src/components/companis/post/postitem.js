import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';

const jobtype = {P:"Pilot",C:"Cabin Crew",M:"Maintenence",O:"Office"}
export default class Professional extends Component {
    constructor(props){
        super(props);
    }
	render() {
		return (
			<div className='p-com-item'>
                <h5>{this.props.info.title}</h5>
                <div className = 'row p-item'>
                    <div className = 'row col col-lg-10 col-sm-6'>
                        <div className = 'col col-lg-4'>
                            <h3>JobType : {jobtype[this.props.info.position]}</h3>
                            <span>published : {this.props.info.publish_date}</span>
                        </div>
                        <div className = 'col col-lg-4'>
                            <h3>Level : {this.props.info.exp_lv} year</h3>
                        </div>
                        <div className = 'col col-lg-4'>
                            <h3>Price : ${this.props.info.rate} /Hr</h3>
                        </div>

                        
                    </div>
                    <div className = 'col col-lg-2 col-sm-1'>
                        <h4>{this.props.info.bids_count}</h4>
                        <span>Proposals</span>
                    </div>
                    {/* <div className = 'col col-lg-2 col-sm-1'>
                        <h4>1</h4>
                        <span>Messages</span>
                    </div> */}
                    
                </div>
            </div>
		)
	}
}

