import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Flatpickr from 'react-flatpickr'
import Switch from 'react-switch'
import * as base from '../env'
import axios from 'axios';

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token = localStorage.getItem('token');

class FlightInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            checked:false,
            checked1:false,
            checked2:false,
            checked3:false,
            checked4:false,
            checked5:false,
            checked6:false,
            checked7:false,
            checked8:false,
            checked9:false,
            checked10:false,
            checked11:false,

            selfname:'',
            flydate:'',
            origin:'',
            destination:'',
            blockdep:'',
            blockdepval:0,
            blockarr:'',
            blockarrval:0,
            blocktime:'00:00',blocktimeval:0,
            tofftime:'',tofftimeval:0,
            ldgtime:'',ldgtimeval:0,
            flytime:'',flytimeval:0,
            totaltime:'00:00',totaltimeval:0,

            actype:'',
            registration:'',

            command:'',
            crew2:'',
            crew3:'',
            crew4:'',

            eventtitle:'',
            eventdesc:'',

            blocktimin:0,
            flytimin:0,

            newmember:true,
            //PRETIME
            presinglengin:'00:00',presinglenginval:0,
            premultiengin:'00:00',premultienginval:0,
            prenight:'00:00',prenightval:0,
            preifr:'00:00',preifrval:0,
            prepic:'00:00',prepicval:0,
            precopilot:'00:00',precopilotval:0,
            Grand:'00:00',Grandval:0,
            //CALC TIME
            s_e_time:'00:00',
            m_e_time:'00:00',
            night_time:'00:00',
            ifr_time:'00:00',
            pic_time:'00:00',
            co_time:'00:00',
            grand_time:'00:00',
            //Total time
            t_s_time:'00:00',t_s_timeval:0,
            t_m_time:'00:00',t_m_timeval:0,
            t_night_time:'00:00',t_night_timeval:0,
            t_ifr_time:'00:00',t_ifr_timeval:0,
            t_pic_time:'00:00',t_pic_timeval:0,
            t_co_time:'00:00',t_co_timeval:0,
            t_grand_time:'00:00',t_grand_timeval:0,
            //Flight hours
            f_s_t:'00:00',f_s_t_val:0,
            f_m_t:'00:00',f_m_t_val:0,
            f_mp_t:0,
            f_nf_t:0,
            f_ifr_t:0,
            f_pic_t:0,
            f_co_t:0,
            f_df_t:0,
            f_if_t:0,
		};
    }
    prexperiencet1=(val)=>{
        let total = this.state.presinglenginval + val;
        let grand = this.state.f_m_t_val + val;
        let Total = grand + this.state.Grandval;
        this.setState({
            f_s_t_val:val,//calculated
            s_e_time: parseInt(val / 60) +':'+ parseInt(val % 60),//showcalcul
            t_s_timeval:total,
            t_s_time:parseInt(total / 60) +':'+ parseInt(total % 60),
            grand_time :parseInt(grand / 60) +':'+ parseInt(grand % 60),
            t_grand_time:parseInt(Total / 60) +':'+ parseInt(Total % 60),
            t_grand_timeval:Total,
        })
    }
    prexperiencet2=(val)=>{
        let total = this.state.premultienginval +val;
        let grand = this.state.f_s_t_val + val;
        let Total = grand + this.state.Grandval;
        this.setState({
            f_m_t_val:val,
            m_e_time:parseInt(val / 60) +':'+ parseInt(val % 60),//showcalcul
            t_m_timeval:total,
            t_m_time:parseInt(total / 60) +':'+ parseInt(total % 60),
            grand_time :parseInt(grand / 60) +':'+ parseInt(grand % 60),
            t_grand_time:parseInt(Total / 60) +':'+ parseInt(Total % 60),
            t_grand_timeval:Total,

        })
    }
    prexperiencet3=(val)=>{
        this.setState({ f_mp_t:val })
    }
    prexperiencet4=(val)=>{
        let total = this.state.prenightval + val;
        this.setState({
            f_nf_t:val,
            night_time:parseInt(val / 60) +':'+ parseInt(val % 60),//showcalcul
            t_night_timeval:total,
            t_night_time:parseInt(total / 60) +':'+ parseInt(total % 60),
        })
    }
    prexperiencet5=(val)=>{
        let total = this.state.preifrval + val;
        this.setState({
            f_ifr_t:val,
            ifr_time:parseInt(val / 60) +':'+ parseInt(val % 60),//showcalcul
            t_ifr_timeval:total,
            t_ifr_time:parseInt(total / 60) +':'+ parseInt(total % 60),
        })
    }
    prexperiencet6=(val)=>{
        let total = this.state.prepicval + val;
        this.setState({
            f_pic_t:val,
            pic_time:parseInt(val / 60) +':'+ parseInt(val % 60),//showcalcul
            t_pic_timeval:total,
            t_pic_time:parseInt(total / 60) +':'+ parseInt(total % 60),
        })
    }
    prexperiencet7=(val)=>{
        let total = this.state.precopilotval + val;
        this.setState({
            f_co_t:val,
            co_time:parseInt(val / 60) +':'+ parseInt(val % 60),//showcalcul
            t_co_timeval:total,
            t_co_time:parseInt(total / 60) +':'+ parseInt(total % 60),
        })
    }
    prexperiencet8=(val)=>{
        this.setState({  f_df_t:val })
    }
    prexperiencet9=(val)=>{
        this.setState({f_if_t:val})
    }
    // changetime=(time1)=>{
    //     var myarray = time1.split(' '); 
    //     console.log("asdfasdfasdf",myarray[0])
       
    //     if(myarray.length==2){
    //         let day = myarray[0];
    //         let time2 = myarray[1];
    //         let hours = time2.split(':');
    //         let hour = hours[0];
    //          return (day * 24 + hour * 1) *60 +hours[1] *1;
    //     }else{
    //         let time2 = myarray[0];
    //         let hours = time2.split(':');
    //         let hour = hours[0];
    //         return hour * 60 + hours[1] *1 ;
    //     }

    // }
    componentDidUpdate(prevProps) {
        
    }
    prexperience2=(val)=>{
        let hour = parseInt((val * 1 + this.state.flytimin *1)/60);
        let min = parseInt((val * 1 + this.state.flytimin *1) % 60);
        if (min <10){
            min = '0'+min
        }
        this.setState({blocktime:parseInt(val / 60) +':'+ parseInt(val % 60),blocktimin:val,totaltime: hour+':'+min , blocktimeval:val})


      }
    prexperience1=(val)=>{
        let hour = parseInt((val * 1 + this.state.blocktimin *1)/60);
        let min = parseInt((val * 1 + this.state.blocktimin *1) % 60);
        if (min <10){
            min = '0'+min
        }
        this.setState({flytime:parseInt(val / 60) +':'+ parseInt(val % 60),flytimin:val,totaltime: hour+':'+min ,flytimeval :val })
    }

    Inputvaluechange = (e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            console.log("blockdep",this.state.blockdep)
        })
    }
    showtime=(val)=>{
        let th = parseInt(val / 60);
        if(th < 0 && Math.abs(th) < 10){
            th = '- 0'+ Math.abs(th);
        }else if(th >=0 && th < 10){
            th = '0' + th;
        }
        
        let tm = parseInt(val % 60);
        if(tm < 0 && Math.abs(tm) < 10) {
            tm = '- 0'+ Math.abs(tm);
        }else if(tm >= 0 && tm < 10 ){
            tm = '0' + tm
        }
        return  th +':'+ tm;
    }
    Inputvaluechangetime=(e)=>{
        if([e.target.name] == 'blockdep'){
            let hours = e.target.value.split(':');
            let depval = hours[0] * 60 + hours[1] *1 ;
            let blocktime = this.state.blockarrval - depval;
            let show = this.showtime(blocktime);
            this.setState({blockdep:e.target.value,blockdepval:depval,blocktimeval:blocktime,blocktime:show})
        }
        if([e.target.name] == 'blockarr'){
            let hours = e.target.value.split(':');
            let arrval = hours[0] * 60 + hours[1] *1 ;
            let blocktime = arrval - this.state.blockdepval;
            let show = this.showtime(blocktime)
            this.setState({blockarr:e.target.value,blockarrval:arrval,blocktimeval:blocktime,blocktime:show })
        }
        if([e.target.name] == 'tofftime'){
            let hours = e.target.value.split(':');
            let toffval = hours[0] * 60 + hours[1] *1 ;
            let totaltime = this.state.ldgtimeval - toffval;
            let show = this.showtime(totaltime)
            this.setState({tofftime:e.target.value,tofftimeval:toffval,totaltimeval:totaltime,totaltime:show })
        }
        if([e.target.name] == 'ldgtime'){
            let hours = e.target.value.split(':');
            let ldgval = hours[0] * 60 + hours[1] *1 ;
            let totaltime = ldgval - this.state.tofftimeval;
            let show = this.showtime(totaltime)
            this.setState({ldgtime:e.target.value,ldgtimeval:ldgval,totaltimeval:totaltime,totaltime:show })
        }
    }
    handleChange=(checked)=>{
        this.setState({checked})
    }
    handleChange1=(checked1)=>{
        this.setState({checked1})
    }
    handleChange2=(checked2)=>{
        this.setState({checked2})
    }
    handleChange3=(checked3)=>{
        this.setState({checked3})
    }
    handleChange4=(checked4)=>{
        this.setState({checked4})
    }
    handleChange5=(checked5)=>{
        this.setState({checked5})
    }
    
    handleChange6=(checked6)=>{
        this.setState({checked6},()=>{
            if(this.state.checked6){
                this.setState({checked8:false,checked10:false})
            }
        })
    }
    handleChange7=(checked7)=>{
        this.setState({checked7},()=>{
            if(this.state.checked7){
                this.setState({f_s_t:this.state.blocktime,f_s_t_val:this.state.blocktimeval,checked9:false,f_m_t:'00:00',f_m_t_val:0})
            }else{
                this.setState({f_s_t:'00:00',f_s_t_val:0})
            }
        })
        
    }
    handleChange8=(checked8)=>{
        this.setState({checked8},()=>{
            if(this.state.checked8){
                this.setState({checked6:false,checked10:false})
            }
        })
    }
    handleChange9=(checked9)=>{
        this.setState({checked9},()=>{
            if (this.state.checked9){
                this.setState({f_m_t:this.state.blocktime,f_m_t_val:this.state.blocktimeval,checked7:false,f_s_t:'00:00',f_s_t_val:0})
            }else{
                this.setState({f_m_t:'00:00',f_m_t_val:0})
            }
        })
    }
    handleChange10=(checked10)=>{
        this.setState({checked10},()=>{
            if(this.state.checked10){
                this.setState({checked6:false,checked8:false})
            }
        })
    }
    handleChange11=(checked11)=>{
        this.setState({checked11})
    }

    handleDateChange=(e)=>{

		this.setState({flydate:this.formatDate(e.toString())});
	}
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
        }
       
        saveflightinfo=()=>{
            var flight_data={date:this.state.flydate ,departure_airport: this.state.origin,on_block_time:this.state.blocktimeval,take_off_number:this.state.tofftime,landing_number :this.state.ldgtime,block_arrive:this.state.blockarr,block_departure:this.state.blockdep,flight_time:this.state.flytimeval,arrival_airport:this.state.destination};

            var flight_con = {is_night_time:this.state.checked, is_copilot:this.state.checked1,is_dual:this.state.checked2,is_ifr:this.state.checked3,is_instructor:this.state.checked4,is_pic:this.state.checked5};

            var air_info = {aircraft_type:this.state.actype,aircraft_registration:this.state.registration,is_single_engine_ac:this.state.checked7,is_multi_engine_ac:this.state.checked9,is_jet_ac:this.state.checked11 ,is_single_pilot:this.state.checked6,is_multi_piolt:this.state.checked8};
            
            var crew_mem ={self_name:this.state.selfname, pic_name:this.state.command,other_crew_2:this.state.crew2,other_crew_3:this.state.crew3,other_crew_4:this.state.crew4};

            var event = {remarks:this.state.eventtitle, event_description:this.state.eventdesc };

            var flight_time = {single_engine_time:this.state.f_s_t_val , multi_engine_time:this.state.f_m_t_val , multi_pilot_time:this.state.f_mp_t, night_flight_time:this.state.f_nf_t, ifr_flight_time:this.state.f_ifr_t ,pic_time:this.state.f_pic_t ,copilot_time:this.state.f_co_t,dual_time:this.state.f_df_t ,instructor_time:this.state.f_if_t ,total_time:this.state.f_s_t_val * 1 +this.state.f_m_t_val * 1 };

            var total_time = {single_engine_hours_actual:this.state.t_s_timeval ,multi_engine_hours_actual:this.state.t_m_timeval ,total_night_hours_actual:this.state.t_night_timeval ,total_ifr_hours_actual:this.state.t_ifr_timeval , total_pic_hours_actual:this.state.t_pic_timeval ,total_copilot_hours_actual:this.state.t_co_timeval ,total_flight_hours_actual:this.state.t_grand_timeval}

            var whole = {
                date:this.state.flydate ,departure_airport: this.state.origin,on_block_time:this.state.blocktimeval * 60 ,take_off_number:this.state.tofftime,landing_number :this.state.ldgtime,block_arrive:this.state.blockarr,block_departure:this.state.blockdep,flight_time:this.state.totaltimeval *60 ,arrival_airport:this.state.destination,is_night_time:this.state.checked, is_copilot:this.state.checked1,is_dual:this.state.checked2,is_ifr:this.state.checked3,is_instructor:this.state.checked4,is_pic:this.state.checked5,aircraft_type:this.state.actype,aircraft_registration:this.state.registration,is_single_engine_ac:this.state.checked7,is_multi_engine_ac:this.state.checked9,is_jet_ac:this.state.checked11 ,is_single_pilot:this.state.checked6,is_multi_piolt:this.state.checked8,self_name:this.state.selfname, pic_name:this.state.command,other_crew_2:this.state.crew2,other_crew_3:this.state.crew3,other_crew_4:this.state.crew4,remarks:this.state.eventtitle, event_description:this.state.eventdesc,single_engine_time:this.state.f_s_t_val*60 , multi_engine_time:this.state.f_m_t_val*60 , multi_pilot_time:this.state.f_mp_t*60, night_flight_time:this.state.f_nf_t*60, ifr_flight_time:this.state.f_ifr_t*60 ,pic_time:this.state.f_pic_t *60,copilot_time:this.state.f_co_t*60,dual_time:this.state.f_df_t*60 ,instructor_time:this.state.f_if_t*60 ,total_time:(this.state.f_s_t_val * 1 +this.state.f_m_t_val * 1)*60 }//,single_engine_hours_actual:this.state.t_s_timeval*60 ,multi_engine_hours_actual:this.state.t_m_timeval*60 ,total_night_hours_actual:this.state.t_night_timeval*60 ,total_ifr_hours_actual:this.state.t_ifr_timeval*60 , total_pic_hours_actual:this.state.t_pic_timeval*60 ,total_copilot_hours_actual:this.state.t_co_timeval*60 ,total_flight_hours_actual:this.state.t_grand_timeval*60}
            
                console.log("fight_time",flight_time);
                this.props.setflightime(flight_time);
           
                var url2 = base.base_url+'/logbook/pilot_logbook/';
                axios.defaults.headers.common['Authorization'] = "token " + token;
                axios.post(url2,whole)
                .then(res => {
                    this.props.onHide();
                   
                })
                .catch(err => {
                    console.log("commonfield",err)
                });
            
        }
 render(){
     console.log("token",token)
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
            Flight Detail
			<Button className = 'portfolioclose' variant="secondary" onClick={this.props.onHide}><i className = 'fa fa-close'></i></Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Dgmodalflight">
            <Tabs>
                <div className = 'row flight-row'>
                    <div className = 'col-lg-3 dg-fly-tab'>
                        <TabList>
                            <Tab className="animated fadeIn dg-tab-li" selectedClassName="active">
                                    <span>Flight Data</span>
                            </Tab>
                            <Tab className="animated fadeIn dg-tab-li" selectedClassName="active">
                                    <span>Flight Conditions</span>
                            </Tab>
                            <Tab className="animated fadeIn dg-tab-li" selectedClassName="active">
                                    <span>Aircraft Info</span>
                            </Tab>
                            <Tab className="animated fadeIn dg-tab-li" selectedClassName="active">
                                    <span>Crew Members</span>
                            </Tab>
                            <Tab className="animated fadeIn dg-tab-li" selectedClassName="active">
                                    <span>Events</span>
                            </Tab>
                            <Tab className="animated fadeIn dg-tab-li" selectedClassName="active">
                                    <span>Flight Time</span>
                            </Tab>
                        </TabList>
                    </div>
                    <div className = 'col-lg-9 flight-detail'>
                        <TabPanel className="fade" selectedClassName="animated fadeIn current">
                            <div className="row">
                                <div className="col-lg-6 no-righ-pd">
                                    <div className="datefm">
                                        <i className="fa fa-calendar"></i>
                                        <Flatpickr
                                        className = 'form-control'
                                        // value={this.props.ptarget=='experience'?this.state.pdata.end_date:''}
                                        onChange={ this.handleDateChange} />
                                    </div> 
                                </div>
                                <div className = 'col-lg-6'></div>
                               <hr/>
                               <div className = 'col col-lg-4'>
                                    <input type='text' placeholder = 'ORIGIN'  value={this.state.origin}    onChange = {this.Inputvaluechange} name = 'origin' className = 'form-control data-info'/>
                                    <input type='text' placeholder = 'DESTINATION' value={this.state.destination} onChange = {this.Inputvaluechange} name = 'destination' className = 'form-control data-info'/>
                                    
                               </div>
                               <div className = 'col col-lg-4'>
                                    <p>Block DEP</p>
                                    <input type='time' placeholder = 'TOFF TIME'   onChange = {this.Inputvaluechangetime} name = 'blockdep' className = 'form-control data-info1'/>
                                    <p>Block ARR</p>
                                    <input type='time' placeholder = 'Block ARR'  onChange = {this.Inputvaluechangetime} name = 'blockarr' className = 'form-control data-info1 '/>
                                    <h3 className = 'for-time'>Block Time :</h3>
                                    <h1 className = 'totaltime'>{this.state.blocktime}</h1>
                                    {/* <Timestyle onchangetime = { this.prexperience2}/> */}
                               </div>
                               <div className = 'col col-lg-4'>
                                   <p>TOFF Time</p>
                                    <input type='time' placeholder = 'TOFF TIME'   onChange = {this.Inputvaluechangetime} name = 'tofftime' className = 'form-control data-info1'/>
                                    <p>LDG Time</p>
                                    <input type='time' placeholder = 'LDG TIME'    onChange = {this.Inputvaluechangetime} name = 'ldgtime' className = 'form-control data-info1 '/>
                                    <h3 className ='for-time '>Flight Time :</h3>
                                    <h1 className = 'totaltime'>{this.state.totaltime}</h1>
                               </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="fade" selectedClassName="animated fadeIn current">
                            <h3>Flight Date : {this.state.flydate}</h3>
                            <div className = 'row flight-switch'>
                                <h3 className = 'col-lg-4'>IFR :</h3> <Switch onChange={this.handleChange } className = 'col-lg-8'name = 'abc' checked={this.state.checked} />
                            </div>
                            <div className = 'row flight-switch'>
                                <h3 className = 'col-lg-4'>Night :</h3> <Switch onChange={this.handleChange1 } className = 'col-lg-8'name = 'abc' checked={this.state.checked1} />
                            </div>
                            <div className = 'row flight-switch'>
                                <h3 className = 'col-lg-4'>PIC :</h3> <Switch onChange={this.handleChange2} className = 'col-lg-8'name = 'abc' checked={this.state.checked2} />
                            </div>
                            <div className = 'row flight-switch'>
                                <h3 className = 'col-lg-4'>CO-PILOT :</h3> <Switch onChange={this.handleChange3} className = 'col-lg-8'name = 'abc' checked={this.state.checked3} />
                            </div>
                            <div className = 'row flight-switch'>
                                <h3 className = 'col-lg-4'>DUAL :</h3> <Switch onChange={this.handleChange4} className = 'col-lg-8'name = 'abc' checked={this.state.checked4} />
                            </div>
                            <div className = 'row flight-switch'>
                                <h3 className = 'col-lg-4'>INSTRUCTOR:</h3> <Switch onChange={this.handleChange5} className = 'col-lg-8'name = 'abc' checked={this.state.checked5} />
                            </div>
                        </TabPanel>

                        <TabPanel className="fade" selectedClassName="animated fadeIn current">
                        <h3>Flight Date : {this.state.flydate}</h3>
                            <div className="row">
                                <div className = 'col col-lg-6'>
                                    <input type='text' placeholder = 'A/C TYPE' onChange = {this.Inputvaluechange} name= 'actype' className = 'form-control data-info'/>
                                </div>
                                <div className = 'col col-lg-6'>
                                    <input type='text' placeholder = 'REGISTRATION' onChange = {this.Inputvaluechange} name = 'registration' className = 'form-control data-info'/>
                                </div>
                                <hr/>
                                <div className = 'col col-lg-4'>
                                    <div className = 'depart-switch'>
                                        <h3>SINLE PILOT</h3>
                                        <Switch onChange={this.handleChange6} className = 'col-lg-8' checked={this.state.checked6} />
                                    </div>
                                    <div className = 'depart-switch'>
                                        <h3>SINLE ENGINE</h3>
                                        <Switch onChange={this.handleChange7} className = 'col-lg-8' checked={this.state.checked7} />
                                    </div>
                                    
                                </div>
                                <div className = 'col col-lg-4'>
                                    <div className = 'depart-switch'>
                                        <h3>MULTI PILOT</h3>
                                        <Switch onChange={this.handleChange8} className = 'col-lg-8' checked={this.state.checked8} />
                                    </div>
                                    <div className = 'depart-switch'>
                                        <h3>MULTI ENGINE</h3>
                                        <Switch onChange={this.handleChange9} className = 'col-lg-8' checked={this.state.checked9} />
                                    </div>
                                    
                                </div>
                                <div className = 'col col-lg-4'>
                                    <div className = 'depart-switch'>
                                        <h3>SIMULATOR</h3>
                                        <Switch onChange={this.handleChange10} className = 'col-lg-8' checked={this.state.checked10} />
                                    </div>
                                    <div className = 'depart-switch'>
                                        <h3>JET</h3>
                                        <Switch onChange={this.handleChange11} className = 'col-lg-8' checked={this.state.checked11} />
                                    </div>
                                </div>

                            </div>
                        </TabPanel>

                        <TabPanel className="fade" selectedClassName="animated fadeIn current">
                        <h3>Flight Date : {this.state.flydate}</h3>
                            <div className ='row'>
                                <div className = 'col col-lg-4 datalabel'>
                                    <h3 className = 'data-info'>PILOT IN COMMAND :</h3>
                                </div>
                                <div className = 'col col-lg-8'>
                                    <input type='text' placeholder = 'command' onChange = {this.Inputvaluechange} name ='command' className = 'form-control data-info'/>
                                </div>
                                <div className = 'col col-lg-4 datalabel'>
                                    <h3 className = 'data-info'>CREW2 :</h3>
                                </div>
                                <div className = 'col col-lg-8'>
                                    <input type='text' placeholder = 'crew2' onChange = {this.Inputvaluechange} name ='crew2' className = 'form-control data-info'/>
                                </div>
                                <div className = 'col col-lg-4 datalabel'>
                                    <h3 className = 'data-info'>CREW3 :</h3>
                                </div>
                                <div className = 'col col-lg-8'>
                                    <input type='text' placeholder = 'crew3' onChange = {this.Inputvaluechange} name ='crew3' className = 'form-control data-info'/>
                                </div>
                                <div className = 'col col-lg-4 datalabel'>
                                    <h3 className = 'data-info'>CREW4 :</h3>
                                </div>
                                <div className = 'col col-lg-8'>
                                    <input type='text' placeholder = 'crew4' onChange = {this.Inputvaluechange} name ='crew4' className = 'form-control data-info'/>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="fade" selectedClassName="animated fadeIn current">
                        <h3>Flight Date : {this.state.flydate}</h3>
                            <div className =''>
                                 <input type = 'text' placeholder = 'TITLE(optional)' value = {this.state.eventtitle} onChange = {this.Inputvaluechange} name ='eventtitle' className = 'form-control'/>
                                 <textarea type = 'text' placeholder = 'DESCRIPTION (optional)' value = {this.state.eventdesc} onChange = {this.Inputvaluechange} name ='eventdesc' className = 'form-control event-desc'/>
                            </div>
                        </TabPanel>
                        <TabPanel className="fade" selectedClassName="animated fadeIn current">
                        <h3>Flight Date : {this.state.flydate}</h3>
                            <div className ='row'>
                                <div className = 'col-lg-4'>
                                    <h3 className ='for-time '>Single Engine Time :</h3>
                                    <h3 className = 'show-time'>{this.state.f_s_t}</h3>
                                    <h3 className ='for-time '>Multi Engine Time :</h3>
                                    <h3 className = 'show-time'>{this.state.f_m_t}</h3>
                                    <h3 className ='for-time '>Multi Pilot Time :</h3>
                                    <Timestyle onchangetime = { this.prexperiencet3} disable = {this.state.checked8}/>
                                </div>
                                <div className = 'col-lg-4'>
                                    <h3 className ='for-time '>Night Flight Time :</h3>
                                    <Timestyle onchangetime = { this.prexperiencet4} disable = {this.state.checked1}/>
                                    <h3 className ='for-time '>IFR Flight Time :</h3>
                                    <Timestyle onchangetime = { this.prexperiencet5} disable = {this.state.checked} />
                                    <h3 className ='for-time '>PIC Flight Time :</h3>
                                    <Timestyle onchangetime = { this.prexperiencet6} disable = {this.state.checked2}/>
                                </div>
                                <div className = 'col-lg-4'>
                                    <h3 className ='for-time '>COPILOT Flight Time :</h3>
                                    <Timestyle onchangetime = { this.prexperiencet7} disable = {this.state.checked3}/>
                                    <h3 className ='for-time '>Dual Flight Time :</h3>
                                    <Timestyle onchangetime = { this.prexperiencet8} disable = {this.state.checked4}/>
                                    <h3 className ='for-time '>Instructor Flight Time :</h3>
                                    <Timestyle onchangetime = { this.prexperiencet9} disable = {this.state.checked5}/>
                                </div>
                                   
                            </div>
                        </TabPanel>
                        
                    </div>
                </div>
                

                    
                    
            </Tabs>
        </Modal.Body>
        <Modal.Footer className="Dgmodal">
            <Button type="submit" value="submit" className = 'btn btn-success'  variant="success" onClick={this.saveflightinfo}>Save</Button>
            <Button variant="secondary"  className = 'btn btn-success' onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
     );
 }   
}

class Timestyle extends React.Component {
    constructor(props){
      super(props);
      this.state={
        time:'',
        min:''
      }
    }
    changetime =(e)=>{
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({time: e.target.value},()=>{
            this.props.onchangetime(this.state.time * 60 + this.state.min * 1)
         })
      }
      
    }
    changemin=(e)=>{
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        if(e.target.value  > 59){
          this.setState({min:''})
        }else{
          this.setState({min: e.target.value},()=>{
            this.props.onchangetime(this.state.time *60 +this.state.min * 1)
          })
        }
      }
      
    }
    
    render(){
      return(
        <div className ={this.props.disable?"dg-time-div t_normol":"dg-time-div t_disable" } >
            <input type='text' className='front-time'  maxLength='6' placeholder='0000' value = {this.state.time} onChange = {this.changetime} disabled={!this.props.disable} />:<input type='text'  value={this.state.min} onChange = {this.changemin} className ='end-time' placeholder='00' maxLength='2'disabled={!this.props.disable}/>  
        </div>
      );
    }
  }
const mapStateToProps = state => {
	return {
        totalexp:state.contentReducer.totalexp
	};
};
const mapDispatchToProps = dispatch => {
	return {
        getProfile: () => dispatch(actions.getProfile()) ,
        setflightime:(data)=>dispatch(actions.setflightime(data))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FlightInfo)