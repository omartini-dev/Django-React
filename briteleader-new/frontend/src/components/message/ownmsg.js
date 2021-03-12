import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';

export default class Ownmsg extends Component {
    constructor(props){
        super(props);

    }
	render() {
		return (
            <div className="main-message-box ta-right">
                <div className="message-dt">
                    <div className="message-inner-dt">
                        <p>{this.props.info.msg}</p>
                    </div>
                    <span>{this.props.info.date}</span>
                </div>
                {/* <div className="messg-usr-img">
                    <img src={this.props.info.img} alt=""/>
                </div> */}
            </div>
		)
	}
}

