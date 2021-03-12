import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import Subitem from './subflight';
import * as base from '../env'
import axios from 'axios';
import * as actions from '../../store/actions/content';
import { connect } from 'react-redux';
import Exprience from '../modals/addexp';

const time1 = '01:56:20';

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token = localStorage.getItem('token');

class Totalflight extends Component {
    constructor(props){
        super(props);
        this.state={
            totalflyinfo:[
                {name:'TT Night',time:'0',entry:'--'},
                {name:'TT IFR',time:'0',entry:'--'},
                {name:'TT ME',time:'0',entry:'--'},
                {name:'TT PIC',time:'0',entry:'--'},
            ],
            Totalflight:0,
            modalshow:false,

            


        }
    }
    Addexprience=()=>{
        this.setState({modalshow:true})
    }
    componentDidMount(){
        console.log(this.changetime(time1))
        var tmparray = this.state.totalflyinfo;
       this.changetime(time1)
        var url = base.base_url+'/logbook/pilot/myinfo/';
        axios.defaults.headers.common['Authorization'] = "token " + token;
		axios.get(url)
		.then(res => {
            tmparray[0].time = this.changetime(res.data.total_experience.total_night_hours_actual)
            tmparray[1].time = this.changetime(res.data.total_experience.total_ifr_hours_actual)
            tmparray[2].time = this.changetime(res.data.total_experience.total_copilot_hours_actual)
            tmparray[3].time = this.changetime(res.data.total_experience.total_pic_hours_actual)
            this.setState({totalflyinfo:tmparray , Totalflight :this.changetime(res.data.total_experience.total_flight_hours_actual)})
            this.props.settotalexprience(res.data.total_experience)
		})
		.catch(err => {
			console.log(err)
		}); 
    }
    changetime=(time1)=>{
        var myarray = time1.split(' '); 
       
        if(myarray.length==2){
            let day = myarray[0];
            let time2 = myarray[1];
            let hours = time2.split(':');
            let hour = hours[0];
             return day * 24 + hour * 1;
        }else{
            let time2 = myarray[0];
            let hours = time2.split(':');
            let hour = hours[0];
            return hour *1 ;
        }

    }
	render() {
		return (
            <div className='row justify-content-end '>
                
               <div className = 'row col col-lg-3'>
                   <div className = 'totalhr'>
                       <h5>Total Hours ( /hrs )</h5>
                       <h1 className = 'align-self-center'>{this.state.Totalflight}</h1>
                   </div>
                   <button className = 'btn btn-success w-100' onClick ={this.Addexprience}>Total Hours</button>
               </div>
               <div className = ' row col col-lg-9 justify-content-end'>
                   {
                       this.state.totalflyinfo.map((info,index)=>{
                           return(
                            <Subitem key={index} info = {info}/>

                           );
                       })
                   }
                   
               </div>

               <Exprience show={this.state.modalshow} onHide={()=>{this.setState({modalshow:false})}} />
            </div>

		)
	}
}
const mapStateToProps = state => {
	return {
		profile:state.contentReducer.profile,
	};
};
const mapDispatchToProps = dispatch => {
	return {
        settotalexprience: (totalexp) => dispatch(actions.settotalexp(totalexp))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Totalflight);
