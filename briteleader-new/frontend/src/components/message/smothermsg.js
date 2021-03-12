import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';

export default class Smothermsg extends Component {
    constructor(props){
        super(props);

    }
	render() {
		return (
            <div className='row msgdiv  justify-content-start'>
                
                <div className = 'sm-msg-img col-lg-2'>
                    <img src={"https://soleo-coming-static.s3.amazonaws.com/media/"+this.props.info.img} alt=""/>
                </div>
                <div className = 'sm-msg '>
                   <pre>{this.props.info.msg}</pre> 
                </div>
            </div>
		)
	}
}

