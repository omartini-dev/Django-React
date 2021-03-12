import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import Subitem from './subflight';
import Table from 'react-bootstrap/Table'
import * as base from '../env'
import axios from 'axios';

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token = localStorage.getItem('token');

export default class Lastflight extends Component {
    constructor(props){
        super(props);
        this.state={
            flightlists:[]
        }
    }
    componentDidMount(){

        var url = base.base_url+'/logbook/pilot_logbook';
        axios.defaults.headers.common['Authorization'] = "token " + token;
		axios.get(url)
		.then(res => {
            res.data.results.map((result)=>{
                this.setState({flightlists:[ {id:result.flight_data.id,origin:result.flight_data.departure_airport,dest:result.flight_data.arrival_airport,block:result.flight_data.on_block_time,date:result.flight_data.date,pic:result.crew_members_data.pic_name},...this.state.flightlists]})
            })
           
		})
		.catch(err => {
			console.log(err)
		}); 
    }
	render() {
		return (
            <div className='flight-table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>ORIGIN</th>
                        <th>DESTINATION</th>
                        <th>BOLCK TIME</th>
                        <th>PIC</th>
                        <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {
                        this.state.flightlists.map((list,index)=>{
                            return(
                                <tr key={index}> 
                                        <td>{index +1}</td>
                                        <td>{list.origin}</td>
                                        <td>{list.dest}</td>
                                        <td>{list.block}</td>
                                        <td>{list.pic}</td>
                                        <td>{list.date}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    </Table>
            </div>
		)
	}
}



