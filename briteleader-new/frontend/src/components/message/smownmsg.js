import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';

export default class Smownmsg extends Component {
    constructor(props){
        super(props);

    }
	render() {
		return (
            <div className='row justify-content-end msgdiv'>
                
                <div className = 'sm-own-msg '>  
                   <pre>{this.props.info.msg}</pre>
                </div>
                {/* <div className = 'sm-msg-img col-lg-2'>
                    <img src='https://placeimg.com/128/128/any' alt=""/>
                </div> */}
                
            </div>
		)
	}
}

