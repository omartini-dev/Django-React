import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';

export default class Contactlist extends Component {
    constructor(props){
        super(props);

    }
    senddatatoparent=()=>{
        this.props.onclickadd(this.props.info.id);
    }
	render() {
		return (
            <li className={this.props.active} onClick = {this.senddatatoparent}>
                <div className="usr-msg-details">
                    <div className="usr-ms-img">
                        <img src={"https://soleo-coming-static.s3.amazonaws.com/media/"+this.props.info.avatar} alt=""/>
                        {this.props.active === 'active'?<span className="msg-status"></span> :''}
                    </div>
                    <div className="usr-mg-info">
                        <h3>{this.props.info.first_name + this.props.info.last_name }</h3>
                        <p>Lorem ipsum dolor </p>
                    </div>
                    {/* <span className="posted_time">1:55 PM</span> */}
                        {this.props.not != 0 ?<span className="msg-notifc"> { this.props.not }</span> :null}
                </div>
            </li>
		)
	}
}

