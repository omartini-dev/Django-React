import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as base from '../env'
import axios from 'axios';

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token = localStorage.getItem('token');

class Portfoliobox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      profile: [],
      singletime:'',
      multitime:'',
      nighttime:'',
      ifrtime:'',
      pictime:'',
      cotime:'',

      //calculated
      c_s_e:'00:00',
      c_s_e_val:0,
      c_m_e:'00:00',
      c_m_e_val:0,
      c_n_t:'00:00',
      c_n_t_val:0,
      c_if_t:'00:00',
      c_if_t_val:0,
      c_pic_t:'00:00',
      c_pic_t_val:0,
      c_co_t:'00:00',
      c_co_t_val:0,
      c_gra_t:'00:00',
      c_gra_t_val:0,

      //total
      t_s_e:'00:00',
      t_s_e_val:0,
      t_m_e:'00:00',
      t_m_e_val:0,
      t_n_t:'00:00',
      t_n_t_val:0,
      t_if_t:'00:00',
      t_if_t_val:0,
      t_pic_t:'00:00',
      t_pic_t_val:0,
      t_co_t:'00:00',
      t_co_t_val:0,
      t_gra_t:'00:00',
      t_gra_t_val:0,

      //prev
      preid:null,
      presinglenginval:0,
      premultienginval:0,
      prenightval:0,
      preifrval:0,
      prepicval:0,
      precopilotval:0,
      Grandval:0,
      Grand:'00:00',
		};
    }
 
    prexperience1=(val)=>{
      console.log("aaaaaaaaaaaaaaaaaaaa",this.state.c_s_e_val);
      let tmp = val + this.state.c_s_e_val
      let pretotal = val + this.state.premultienginval

      let realtotal = tmp + this.state.t_m_e_val
      this.setState({presinglenginval:val , t_s_e_val:tmp ,t_s_e:parseInt(tmp/60) +':' + parseInt(tmp% 60),Grand:parseInt(pretotal/60) +':' + parseInt(pretotal% 60),t_gra_t_val:realtotal,t_gra_t:parseInt(realtotal/60) +':' + parseInt(realtotal% 60)})
    }
    prexperience2=(val)=>{
      let pretotal = val + this.state.presinglenginval
      console.log("nnnnnnnnnnnnn",this.state.c_m_e_val)
      let tmp = val + this.state.c_m_e_val
      let realtotal = tmp + this.state.t_s_e_val
      this.setState({premultienginval:val , t_m_e_val:tmp ,t_m_e:parseInt(tmp/60) +':' + parseInt(tmp% 60),Grand:parseInt(pretotal/60) +':' + parseInt(pretotal% 60),t_gra_t_val:realtotal,t_gra_t:parseInt(realtotal/60) +':' + parseInt(realtotal% 60)})
    }
    prexperience3=(val)=>{
      let tmp = val + this.state.c_n_t_val
      this.setState({prenightval:val , t_n_t_val:tmp ,t_n_t:parseInt(tmp/60) +':' + parseInt(tmp% 60)})
    }
    prexperience4=(val)=>{
      let tmp = val + this.state.c_if_t_val
      this.setState({preifrval:val , t_if_t_val:tmp ,t_if_t:parseInt(tmp/60) +':' + parseInt(tmp% 60)})
    }
    prexperience5=(val)=>{
      let tmp = val + this.state.c_pic_t_val
      this.setState({prepicval:val , t_pic_t_val:tmp ,t_pic_t:parseInt(tmp/60) +':' + parseInt(tmp% 60)})
    }
    prexperience6=(val)=>{
      let tmp = val + this.state.c_co_t_val
      this.setState({precopilotval:val , t_co_t_val:tmp ,t_co_t:parseInt(tmp/60) +':' + parseInt(tmp% 60)})
    }
    componentDidUpdate(prevProps){
      if(this.props.calctime!=prevProps.calctime){
        
          if(this.props.calctime != []){
            let tmp = this.props.calctime.single_engine_time
            let tmp1 = this.props.calctime.multi_engine_time
            let tmp2 = this.props.calctime.night_flight_time
            let tmp3 = this.props.calctime.ifr_flight_time
            let tmp4 = this.props.calctime.pic_time
            let tmp5 = this.props.calctime.copilot_time
            let tmp6 = tmp + tmp1

            
            let s_e_t = this.changetime(this.props.totalexp.single_engine_hours_actual);
            let m_e_t = this.changetime(this.props.totalexp.multi_engine_hours_actual);
            let n_t = this.changetime(this.props.totalexp.total_night_hours_actual);
            let if_t = this.changetime(this.props.totalexp.total_ifr_hours_actual);
            let pic_t = this.changetime(this.props.totalexp.total_pic_hours_actual);
            let co_t = this.changetime(this.props.totalexp.total_copilot_hours_actual);
            let grand = s_e_t*1 + m_e_t*1;


            this.setState({
              preid:this.props.totalexp.id,
              c_s_e:parseInt(tmp/60)+':'+parseInt(tmp %60),c_s_e_val:tmp,
              c_m_e:parseInt(tmp1/60)+':'+parseInt(tmp1 %60),c_m_e_val:tmp1,
              c_n_t:parseInt(tmp2/60)+':'+parseInt(tmp2 %60),c_n_t_val:tmp2,
              c_if_t:parseInt(tmp3/60)+':'+parseInt(tmp3 %60),c_if_t_val:tmp3,
              c_pic_t:parseInt(tmp4/60)+':'+parseInt(tmp4 %60),c_pic_t_val:tmp4,
              c_co_t:parseInt(tmp5/60)+':'+parseInt(tmp5 %60),c_co_t_val:tmp5,
              c_gra_t:parseInt(tmp6/60)+':'+parseInt(tmp6 %60),c_gra_t_val:tmp6,
     
            },()=>{
              this.setState({
                  t_s_e:parseInt((tmp + s_e_t)/60)+':'+parseInt((tmp + s_e_t )%60),
                  t_s_e_val:tmp + s_e_t,
                  t_m_e:parseInt((tmp1 + m_e_t)/60)+':'+parseInt((tmp1 + m_e_t) %60),
                  t_m_e_val:tmp1 + m_e_t,
                  t_n_t:parseInt((tmp2 + n_t)/60)+':'+parseInt((tmp2 + n_t) %60),
                  t_n_t_val: tmp2 + n_t,
                  t_if_t:parseInt((tmp3 + if_t)/60)+':'+parseInt((tmp3 + if_t) %60),
                  t_if_t_val:tmp3 + if_t,
                  t_pic_t:parseInt((tmp4 + pic_t)/60)+':'+parseInt((tmp4 + pic_t) %60),
                  t_pic_t_val: tmp4 + pic_t,
                  t_co_t:parseInt((tmp5 + co_t)/60)+':'+parseInt((tmp5 + co_t) %60),
                  t_co_t_val: tmp5 + co_t,
                  t_gra_t:parseInt((tmp6 + grand)/60)+':'+parseInt((tmp6 + grand) %60),
                  t_gra_t_val: tmp6 + grand ,
                })
            })
            
          }
      }
      if(this.props.totalexp!=prevProps.totalexp){
          
        if(this.props.totalexp != null) {
            let s_e_t = this.changetime(this.props.totalexp.single_engine_hours_actual);
            let m_e_t = this.changetime(this.props.totalexp.multi_engine_hours_actual);
            let n_t = this.changetime(this.props.totalexp.total_night_hours_actual);
            let if_t = this.changetime(this.props.totalexp.total_ifr_hours_actual);
            let pic_t = this.changetime(this.props.totalexp.total_pic_hours_actual);
            let co_t = this.changetime(this.props.totalexp.total_copilot_hours_actual);
            let grand = s_e_t*1 + m_e_t*1;

            console.log("prev times 123",this.state.c_s_e)
            this.setState({

                preid:this.props.totalexp.id,
                presinglenginval:s_e_t,
                premultienginval:m_e_t,
                prenightval:n_t,
                preifrval:if_t,
                prepicval:pic_t,
                precopilotval:co_t,
                Grandval:grand,
                Grand:parseInt(grand/60)+':'+parseInt(grand %60),

                t_s_e:parseInt((this.state.c_s_e_val *1 + s_e_t)/60)+':'+parseInt((this.state.c_s_e_val *1 + s_e_t )%60),
                t_s_e_val:this.state.c_s_e_val + s_e_t,
                t_m_e:parseInt((this.state.c_m_e_val + m_e_t)/60)+':'+parseInt((this.state.c_m_e_val + m_e_t) %60),
                t_m_e_val:this.state.c_m_e_val + m_e_t,
                t_n_t:parseInt((this.state.c_n_t_val + n_t)/60)+':'+parseInt((this.state.c_n_t_val + n_t) %60),
                t_n_t_val: this.state.c_n_t_val + n_t,
                t_if_t:parseInt((this.state.c_if_t_val + if_t)/60)+':'+parseInt((this.state.c_if_t_val + if_t) %60),
                t_if_t_val:this.state.c_if_t_val + if_t,
                t_pic_t:parseInt((this.state.c_pic_t_val + pic_t)/60)+':'+parseInt((this.state.c_pic_t_val + pic_t) %60),
                t_pic_t_val: this.state.c_pic_t_val + pic_t,
                t_co_t:parseInt((this.state.c_co_t_val + co_t)/60)+':'+parseInt((this.state.c_co_t_val + co_t) %60),
                t_co_t_val: this.state.c_co_t_val + co_t,
                t_gra_t:parseInt((this.state.c_gra_t_val + grand)/60)+':'+parseInt((this.state.c_gra_t_val + grand) %60),
                t_gra_t_val: this.state.c_gra_t_val + grand ,

               })
        }
       }
    }
    changetime=(time1)=>{
      if(time1 != null){
      var myarray = time1.split(' '); 
      console.log("asdfasdfasdf",myarray[0])
     
      if(myarray.length==2){
          let day = myarray[0];
          let time2 = myarray[1];
          let hours = time2.split(':');
          let hour = hours[0];
           return (day * 24 + hour * 1) *60 +hours[1] *1;
      }else{
          let time2 = myarray[0];
          let hours = time2.split(':');
          let hour = hours[0];
          return hour * 60 + hours[1] *1 ;
      }
    }else{
      return 0;
    }
  }
  saveexperience=()=>{
    let whole = {
      single_engine_hours_actual:this.state.t_s_e_val * 60,
      multi_engine_hours_actual:this.state.t_m_e_val * 60,
      total_night_hours_actual:this.state.t_n_t_val * 60,
      total_ifr_hours_actual:this.state.t_if_t_val * 60,
      total_pic_hours_actual:this.state.t_pic_t_val * 60,
      total_copilot_hours_actual:this.state.t_co_t_val * 60,
      total_flight_hours_actual:this.state.t_gra_t_val * 60,
  }

  if(this.state.preid == null){
    var url2 = base.base_url+'/logbook/total/';
    axios.defaults.headers.common['Authorization'] = "token " + token;
    axios.post(url2,whole)
    .then(res => {
        this.props.onHide();
        
    })
    .catch(err => {
        console.log("commonfield",err)
    });
  }else{
    var url2 = base.base_url+'/logbook/total/'+this.state.preid+'/';
    axios.defaults.headers.common['Authorization'] = "token " + token;
    axios.patch(url2,whole)
    .then(res => {
        this.props.onHide();
        
    })
    .catch(err => {
        console.log("commonfield",err)
    });
  }
    
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
            Add Exprience
			    <Button className = 'portfolioclose' variant="secondary" onClick={this.props.onHide}><i className = 'fa fa-close'></i></Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="Dgmodal">
            <div className = 'exprience-modal-body '>
              <div className = 'row exp-in-header'>
                    <div className='col-lg-3 exp-info'><h3>TYPE</h3></div>
                    <div className='col-lg-3 exp-info'><h3>PREVIOUS</h3></div>
                    <div className='col-lg-3 exp-info'><h3>CALCULATED</h3> </div>
                    <div className='col-lg-3 exp-info'> <h3>TOTAL</h3></div>
                </div>
                <div className = 'row exp-in-body'>
                    <div className='col-lg-3 exp-info'><h3>SINGLE ENGINE</h3></div>
                    <div className='col-lg-3'><Timestyle val = {this.state.presinglenginval} onchangetime = { this.prexperience1}/></div>
                    <div className='col-lg-3 exp-info'><h4>{this.state.c_s_e}</h4> </div>
                    <div className='col-lg-3 exp-info'> <h4>{this.state.t_s_e}</h4></div>
                </div>
                <div className = 'row exp-in-body'>
                    <div className='col-lg-3 exp-info'><h3>MULTI ENGINE</h3></div>
                    <div className='col-lg-3'><Timestyle val = {this.state.premultienginval} onchangetime = { this.prexperience2}/></div>
                    <div className='col-lg-3 exp-info'><h4>{this.state.c_m_e}</h4> </div>
                    <div className='col-lg-3 exp-info'> <h4>{this.state.t_m_e}</h4></div>
                </div>
                <div className = 'row exp-in-body'>
                    <div className='col-lg-3 exp-info'><h3>NIGHT</h3></div>
                    <div className='col-lg-3'><Timestyle val = {this.state.prenightval} onchangetime = { this.prexperience3}/></div>
                    <div className='col-lg-3 exp-info'><h4>{this.state.c_n_t}</h4> </div>
                    <div className='col-lg-3 exp-info'> <h4>{this.state.t_n_t}</h4></div>
                </div>
                <div className = 'row exp-in-body'>
                    <div className='col-lg-3 exp-info'><h3>IFR</h3></div>
                    <div className='col-lg-3'><Timestyle val = {this.state.preifrval} onchangetime = { this.prexperience4}/></div>
                    <div className='col-lg-3 exp-info'><h4>{this.state.c_if_t}</h4> </div>
                    <div className='col-lg-3 exp-info'> <h4>{this.state.t_if_t}</h4></div>
                </div>
                <div className = 'row exp-in-body'>
                    <div className='col-lg-3 exp-info'><h3>PIC</h3></div>
                    <div className='col-lg-3'><Timestyle val = {this.state.prepicval} onchangetime = { this.prexperience5}/></div>
                    <div className='col-lg-3 exp-info'><h4>{this.state.c_pic_t}</h4> </div>
                    <div className='col-lg-3 exp-info'> <h4>{this.state.t_pic_t}</h4></div>
                </div>
                <div className = 'row exp-in-body'>
                    <div className='col-lg-3 exp-info'><h3>CO-PILOT</h3></div>
                    <div className='col-lg-3'><Timestyle val = {this.state.precopilotval} onchangetime = { this.prexperience6}/></div>
                    <div className='col-lg-3 exp-info'><h4>{this.state.c_co_t}</h4> </div>
                    <div className='col-lg-3 exp-info'> <h4>{this.state.t_co_t}</h4></div>
                </div>
                <div className = 'row exp-in-body'>
                    <div className='col-lg-3 exp-info'><h3>GRAND TOTAL</h3></div>
                    <div className='col-lg-3 exp-info'><h4>{this.state.Grand}</h4></div>
                    <div className='col-lg-3 exp-info'><h4>{this.state.c_gra_t}</h4> </div>
                    <div className='col-lg-3 exp-info'> <h4>{this.state.t_gra_t}</h4></div>
                </div>

                
				    </div>
        </Modal.Body>
        <Modal.Footer className="Dgmodal">
            <Button variant="success" onClick={this.saveexperience}>Save</Button>
            <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
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
  componentDidMount(){
    this.setState({time:parseInt(this.props.val / 60),min:parseInt(this.props.val % 60)})
  }
  render(){
    return(
      <div className = 'dg-time-div'>
          <input type='text' className='front-time'  maxLength='6' placeholder='0000' value = {this.state.time} onChange = {this.changetime}/>:<input type='text'  value={this.state.min} onChange = {this.changemin} className ='end-time' placeholder='00' maxLength='2'/>  
      </div>
    );
  }
}
const mapStateToProps = state => {
	return {
    profile: state.contentReducer.profile,
    calctime:state.contentReducer.calctime,
    totalexp:state.contentReducer.totalexp
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfoliobox)