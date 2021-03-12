import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/content';
import Info from '../../profile/info';
import ProMain from '../../profile/main';
import Portmodal from '../../modals/portfolio';
import Portfoliobox from '../../modals/portfoliobox';
import { ValidatorForm  } from 'react-form-validator-core';
import TextValidator from '../../login/textvalidator.js';
import axios from 'axios';
import * as base from '../../env';
import { Redirect } from 'react-router';


var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token = localStorage.getItem('token');

const jobtypes = {P:"PartTime",F:"FullTime"};
const joblist = {P:"Pilot",C:"Cabin Crew",M:"Maintenence",O:"Office"}

class PerLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            profile: [],
            proimg:"",
            probanimg:'',
            modalshow:false,
            portfolio:[{img:'https://placeimg.com/256/256/any',desc:''}],

            redirect:false,
            phone:'',
            country:'',
            state:'',
            city:'',
            social1:'',
            social2:'',
            iscountry:false,
            isstate:false,
            iscity:false,

            imagefile:null,
        };
        this.delportfolio =this.delportfolio.bind(this);
    }
    componentDidMount(){
    this.props.getProfile();

    var url = base.base_url+'/profile/profile/'+ userinfo.id+'/';
    axios.defaults.headers.common['Authorization'] ="token " + token;
    axios.get(url)
    .then(res => {
        this.setState({phone:res.data.phone_number , country:res.data.country , state: res.data.state, city:res.data.city, social1:res.data.social_link1,social2:res.data.social_link2,probanimg:res.data.cover,proimg:res.data.avatar_link})         
    })
    .catch(err => {
        console.log("commonfield",err)
    });

    
}
prohandleChangeImage=(event)=>{
    this.setState({proimg:URL.createObjectURL(event.target.files[0])})
    this.setState({imagefile:event.target.files[0]},()=>{

        let form_data = new FormData();
        form_data.append('avatar', this.state.imagefile, this.state.imagefile.name);
        let url = base.base_url+'/profile/profile/'+ userinfo.id+'/' ;
        axios.patch(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log("uploadimages",res.data);
        })
        .catch(err => console.log("uploadimages",err))

    })
}
probanhandleChangeImage=(event)=>{
    this.setState({probanimg:URL.createObjectURL(event.target.files[0])})
    this.setState({imagefile:event.target.files[0]},()=>{

        let form_data = new FormData();
        form_data.append('cover', this.state.imagefile, this.state.imagefile.name);
        let url = base.base_url+'/profile/profile/'+ userinfo.id +'/';
        axios.patch(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log("uploadimages",res.data);
        })
        .catch(err => console.log("uploadimages",err))

    })
}

setportfolio=(e)=>{
    e.preventDefault();
    this.setState({modalshow:true});
}
delportfolio=(e)=>{
    e.preventDefault();
    this.props.portfolio.splice(e.currentTarget.dataset.index_id,1);
    this.setState({portfolio:this.props.portfolio});
}
componentDidUpdate(prevProps) {
    if(this.props.portfolio!=prevProps.portfolio){
      this.setState({portfolio:this.props.portfolio});
    }
}
Inputvaluechange = (e)=>{
    this.setState({[e.target.name]:e.target.value},()=> {
        
        if(this.state.country !== '' ) this.setState({iscountry:false})
        if(this.state.state !== '' ) this.setState({isstate:false})
        if(this.state.city !== '' ) this.setState({iscity:false})
    })

}

userFormValue1 = (e)=>{
    if (this.refs.joblist) {
        this.setState({List:this.refs.joblist.value,isemptyList:true})
      }
}
saveperinfo=()=>{
    if(this.state.country == '') {this.setState({iscountry:true}); return;}
    if(this.state.state == '') {this.setState({isstate:true}); return;}
    if(this.state.city == '') {this.setState({iscity:true}); return;}

    var url = base.base_url+'/profile/profile/'+ userinfo.id+'/';
    axios.defaults.headers.common['Authorization'] ="token " + token;
    axios.patch(url,{
        country:this.state.country,
        state:this.state.state,
        city:this.state.city,
        phone_number:this.state.phone,
        social_link1:this.state.social1,
        social_link2:this.state.social2,
    })
    .then(res => {
        console.log('added')         
        this.setState({redirect:true})
    })
    .catch(err => {
        console.log("commonfield",err)
    });


}
 render(){
    if (this.state.redirect) {
        return <Redirect push to="/jobs" />;
      }
     return(
			<div className="container">
				<div className="person-title">
					<h3>Edit Profile</h3>
                    <button className = 'btn btn-success' onClick = {this.saveperinfo}>Save</button>
				</div>
				<div className="person-list">
					<div className="row"> 
                    <div className = 'probanner'>
                        <div className="add-dp" id="OpenImgUpload">
                            <input type="file" id="file1" onChange={this.probanhandleChangeImage}/>
                            <label htmlFor="file1"><i className="fas fa-camera"></i></label>												
                        </div>
                        <img src={this.state.probanimg }/>
                    </div>
                        <div className = 'col-lg-4 person-left'>
                            <div className='personal'>
                                <div className="user_profile">
                                    <div className="user-pro-img">
                                        <img src={this.state.proimg} alt=""/>
                                        <div className="add-dp" id="OpenImgUpload">
                                            <input type="file" id="file2" onChange={this.prohandleChangeImage}/>
                                            <label htmlFor="file2"><i className="fas fa-camera"></i></label>												
                                        </div>
                                    </div>
                                    <div className="user_pro_status">
                                        <h3>{userinfo.user_object != null? userinfo.user_object.first_name +"  "+ userinfo.user_object.last_name : null}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className='info-list'>

                                {/* <h4>Major</h4>
                                <select className = 'form-control'  name = 'List'  ref="joblist"
                                onChange={ this.userFormValue1 }
                                >
								    <option value = '-1'>Select a Major type</option>
                                    <option value = 'P'>Pilot</option>
                                    <option value = 'C'>Cabin Crew</option>
                                    <option value = 'M'>Maintenence</option>
                                    <option value = 'O'>Office</option>

                                </select>
                                <hr/> */}
                                <h4>Phone number</h4>
                                <input type='text' className ='form-control' name = 'phone' value = {this.state.phone} onChange = {this.Inputvaluechange}/>
                                <hr/>
                                <h4>Country*</h4>
                                <input type='text' className ='form-control' name = 'country' value = {this.state.country} onChange = {this.Inputvaluechange}/>
                                { this.state.iscountry ?<p className = 'errormsg'>This field is required</p>:null }
                                <hr/>
                                <h4>State*</h4>
                                <input type='text' className ='form-control' name = 'state' value = {this.state.state} onChange = {this.Inputvaluechange}/>
                                { this.state.isstate ?<p className = 'errormsg'>This field is required</p>:null }
                                <hr/>
                                <h4>City*</h4>
                                <input type='text' className ='form-control' name = 'city' value = {this.state.city} onChange = {this.Inputvaluechange}/>
                                { this.state.iscity ?<p className = 'errormsg'>This field is required</p>:null }
                                <hr/>
                                <h4>Face_book</h4>
                                <input type='text' className ='form-control' name = 'social1' value = {this.state.social1} onChange = {this.Inputvaluechange}/>
                                <hr/>
                                <h4>Twitter</h4>
                                <input type='text' className ='form-control' name = 'social2' value = {this.state.social2} onChange = {this.Inputvaluechange}/>
                                
                            </div>
                            {/* <div className = 'portfolio'>
                               
                            <h3 ><a  title="" >Portfolio</a> <a href="#" title="" onClick={this.setportfolio}><i className="fa fa-plus-square"></i></a></h3>
                                <Portmodal show={this.state.modalshow} onHide={()=>{this.setState({modalshow:false})}}/>
                                <hr/>
                                <div className='row'>
                                    {
                                        this.state.portfolio.map((list,index) => {
                                            return (
                                                <div key={index} className = 'col-lg-6 '>
                                                    <a href="#" title="" data-index_id = {index} 
                                                        onClick={this.delportfolio}>
                                                        <i  className="fa fa-close"></i></a>
                                                    <img  src ={list.img}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                
                            </div> */}

                        </div>
                        <div className='col-lg-8 person-info'>
                            <ProMain />
                        </div>
                        
                    </div>
                    
                </div>
				
			</div>
     );
 }   
}
const mapStateToProps = state => {
	return {
        profile: state.contentReducer.profile,
        portfolio:state.contentReducer.portfolio,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PerLayout)