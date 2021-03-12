import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/content';
import Portmodal from '../../modals/portfolio';
import DatePicker from "react-datepicker";
import { ValidatorForm  } from 'react-form-validator-core';
import TextValidator from '../../login/textvalidator.js';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import * as base from '../../env'
import { Redirect } from 'react-router';

const token = localStorage.getItem('token');
class ComLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            combanimg : '/static/frontend/images/banner/plane-11(2).jpg',
            personimg : 'https://soleo-coming-static.s3.amazonaws.com/media/users/avatar/blank-avatar.jpg',
            imagefile :null,
            profile: [],
            modalshow:false,
            portfolio:[{img:'https://placeimg.com/256/256/any',desc:''}],
            newcreate:true,
            redirect:false,

            Id:'',
            userid:'',
            comid:'',
            companyname:'',
            coverimg:null,
            avatarimg:null,
            sociallink1:'',
            sociallink2:'',
            overview:'',
            country:'',
            state:'',
            city:'',
            zipcode:'',
            phone:'',
            establish:new Date(),
            employee:'',
            
		}
    }
 
    componentDidMount(){

        const token = localStorage.getItem('token');
        var url = base.base_url+'/company/company_profile/mydetail/';
		axios.defaults.headers.common['Authorization'] = "token " + token;
		axios.get(url)
		.then(res => {
            console.log("^^^^^^^^^^^^^",res)
            if(res.data === "failed"){
                this.setState({newcreate:true})
            }else{
                this.setState({newcreate:false})
                var date = new Date(res.data[0].company.establish);
                this.setState({
                    Id: res.data[0].company.profile.id,
                    comid:res.data[0].company_id,
                    userid:res.data[0].company.user,
                    companyname:res.data[0].company.profile.company_name,
                    coverimg:res.data[0].company.profile.cover,
                    avatarimg:res.data[0].company.profile.avatar_link,
                    sociallink1:res.data[0].company.profile.social_link1,
                    sociallink2:res.data[0].company.profile.social_link2,
                    overview:res.data[0].company.profile.overview,
                    country:res.data[0].company.profile.country,
                    state:res.data[0].company.profile.state,
                    city:res.data[0].company.profile.city,
                    zipcode:res.data[0].company.profile.zip_code,
                    phone:res.data[0].company.profile.phone_number,
                    employee:res.data[0].company.employees,
                    establish:date,
                    combanimg:res.data[0].company.profile.cover,
                    personimg:res.data[0].company.profile.avatar_link,

                })
                res.data.map((item,index)=>{
                    var list={}
                    list.id = item.id;
                    list.img =item.aircraft_image;
                    list.desc = item.description;
                    list.type = item.aircraft_type;
                    list.num = item.aircraft_number;
                    list.base = item.base;
                    list.dest = item.destinations;
                    
                    this.props.setportfolioinfo(list);
                })
            }
			
		})
		.catch(err => {
			console.log(err)
		});
    }
    
    setportfolio=(e)=>{
        e.preventDefault();
        this.setState({modalshow:true});
    }
    delportfolio=(e)=>{
        e.preventDefault();
        var delid = e.currentTarget.dataset.index_id;
        var url = base.base_url+'/company/company_profile/'+e.currentTarget.dataset.id+'/';
                axios.delete(url)
                .then(res => {
                    this.props.portfolio.splice(delid ,1);
                    this.setState({portfolio:this.props.portfolio});
                })
                .catch(err => {
                    console.log("commonfield",err);
                });
        
    }
    componentDidUpdate(prevProps) {
        if(this.props.portfolio!=prevProps.portfolio){
          this.setState({portfolio:this.props.portfolio});
        }
        if(this.props.userprofile !== prevProps.userprofile && this.state.newcreate ){
            this.setState({companyname:this.props.userprofile.company_name,Id:this.props.userprofile.id,userid:this.props.userprofile.user})
        }
        
    }
    Inputvaluechange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
   
    handleChange = date => {
        this.setState({
            establish: date
        });
      };
    
    handleSubmit=()=>{
        //
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = "token " + token;
        // if(this.state.newcreate === true){
            console.log("dragon id",this.state.Id);
            if(this.state.Id !==''){
                var url =base.base_url+ '/profile/profile/'+ this.state.Id+'/';
                axios.patch(url,{
                    company_name:this.state.companyname,
                    country:this.state.country,
                    state:this.state.state,
                    city:this.state.city,
                    zip_code:this.state.zipcode,
                    phone_number:this.state.phone,
                    social_link1:this.state.sociallink1,
                    social_link2:this.state.sociallink2,
                    overview:this.state.overview
    
                })
                .then(res => {
                    console.log('added')   
                    localStorage.setItem('city', this.state.city);       
                    console.log("city",localStorage.getItem('city'))
                    this.setState({redirect:true});   
                })
                .catch(err => {
                    console.log("commonfield",err)
                });

                //emplyee,establish
                var url2 = base.base_url+'/company/company/';
                if(this.state.newcreate === true){
                    var datetime = this.state.establish.toLocaleDateString('en-US');
                    var estab =this.datetostring(datetime);

                    axios.post(url2,{
                        employees:this.state.employee,
                        establish:estab,
                        user:this.state.userid
        
                    })
                    .then(res => {
                                    
                    })
                    .catch(err => {
                        console.log("commonfield",err)
                    });

                }
                else{
                    var datetime = this.state.establish.toLocaleDateString('en-US');
                    var estab =this.datetostring(datetime);

                    axios.patch(url2+this.state.comid+'/',{
                        employees:this.state.employee,
                        establish:estab,
                        user:this.state.userid
        
                    })
                    .then(res => {
                        console.log("update info",res);       
                    })
                    .catch(err => {
                        console.log("commonfield",err)
                    });
                }
            }
        
    }
    datetostring=(datetime)=>{
        var res = datetime.split("/");
        var mm = res[0];
        var dd = res[1];
        var yy = res[2];
        if(dd<10){ dd = "0"+dd; }
        if(mm<10){ mm = "0"+mm; }
        return yy+'-'+mm+'-'+dd;
    }

    combanhandleChangeImage= (e)=>{
        var src = URL.createObjectURL(e.target.files[0])
        this.setState({combanimg:URL.createObjectURL(e.target.files[0])})
        this.setState({imagefile:e.target.files[0]},()=>{

            let form_data = new FormData();
            form_data.append('cover', this.state.imagefile, this.state.imagefile.name);
            let url = base.base_url+'/profile/profile/'+ this.state.Id+'/';
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
    compersonhandleChangeImage =(e)=>{
        this.setState({personimg:URL.createObjectURL(e.target.files[0])})
        this.setState({imagefile:e.target.files[0]},()=>{

            let form_data = new FormData();
            form_data.append('avatar', this.state.imagefile, this.state.imagefile.name);
            let url = base.base_url+'/profile/profile/'+ this.state.Id+'/';
            axios.patch(url, form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => {
            })
            .catch(err => console.log("uploadimages",err))

        })
    }
 render(){
    if (this.state.redirect) {
        window.location.href = "/";
      }
     return(
			<div className="container">
                <div className="companies-list">
                    <div className ="com-banner">
                        <img src = {this.state.combanimg} />
                        <div className="add-dp combanbtn" id="OpenImgUpload">
                            <input type="file" id="file9" onChange={this.combanhandleChangeImage}/>
                            <label htmlFor="file9"><i className="fas fa-camera"></i></label>												
                        </div>
                    </div>
					<div className="row com-Header"> 
                      <div className = "col-lg-4">
                        <div className="com-mark">
                            <img src = {this.state.personimg} />
                            <div className="add-dp commarkbtn" id="OpenImgUpload">
                                <input type="file" id="file8" onChange={this.compersonhandleChangeImage}/>
                                <label htmlFor="file8"><i className="fas fa-camera"></i></label>												
                            </div>

                        </div>
                      </div>
                      <div className = "col-lg-6 com-basicinfo">
                          <h3>Company Name</h3>
                          <hr/>
                        <div className="form-group has-icon com-name ">
                            <span className="fa fa-group form-control-feedback"></span>
                            <input type="text" className="form-control" name= 'companyname' value = {this.state.companyname } placeholder="Company Name" onChange ={this.Inputvaluechange}/>
                        </div>
                        <h3>Social Infomation</h3>
                        <hr/>
                        <div className="form-group has-icon">
                            <span className="fa fa-facebook form-control-feedback"></span>
                            <input type="mail" className="form-control" name = 'sociallink1' value = {this.state.sociallink1} placeholder=" Facebook  Url" onChange={this.Inputvaluechange}/>
                        </div>
                        <div className="form-group has-icon">
                            <span className="fa fa-twitter form-control-feedback"></span>
                            <input type="mail" className="form-control" name = 'sociallink2' value = {this.state.sociallink2}placeholder=" Twitter  Url" onChange={this.Inputvaluechange}/>
                        </div>
                      </div>
                    </div>
                    <div className ="com-info">
                        <h3>OverView</h3>
                        <textarea className='form-control com-overview' name='overview' value = {this.state.overview} onChange = {this.Inputvaluechange}/>
                    </div>
                    <ValidatorForm
                        ref = 'form'
                        onSubmit = {this.handleSubmit} >
                    <div className ="com-info row">
                        <div className='com-info-input col-lg-4'>
                            <h3>Country</h3>
                            <TextValidator
                                onChange={this.Inputvaluechange}
                                name = "country"
                                type = 'text'
                                className = 'form-control dgcom-input'
                                value = {this.state.country}
                                placeholder="Country"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                           
                        </div>
                        <div className='com-info-input col-lg-4'>
                            <h3>State</h3>
                            <TextValidator
                                onChange={this.Inputvaluechange}
                                name = "state"
                                type = 'text'
                                className = 'form-control dgcom-input'
                                value = {this.state.state}
                                placeholder="State"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                        <div className='com-info-input col-lg-4'>
                            <h3>City</h3>

                            <TextValidator
                                onChange={this.Inputvaluechange}
                                name = "city"
                                type = 'text'
                                className = 'form-control dgcom-input'
                                value = {this.state.city}
                                placeholder="City"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                        <div className='com-info-input col-lg-3'>
                            <h3>Zip Code</h3>

                            <TextValidator
                                onChange={this.Inputvaluechange}
                                name = "zipcode"
                                type = 'number'
                                className = 'form-control dgcom-input'
                                value = {this.state.zipcode}
                                placeholder="Zip code"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                        <div className='com-info-input col-lg-3'>
                            <h3>Phone</h3>

                            <TextValidator
                                onChange={this.Inputvaluechange}
                                name = "phone"
                                type = 'text'
                                className = 'form-control dgcom-input'
                                value = {this.state.phone}
                                placeholder="Phone"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                        
                        <div className='com-info-input col-lg-3'>
                            <h3>Employee</h3>
                            <TextValidator
                                onChange={this.Inputvaluechange}
                                name = "employee"
                                type = 'number'
                                className = 'form-control dgcom-input'
                                value = {this.state.employee}
                                placeholder="Employee"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                        <div className='com-info-input col-lg-3'>
                            <h3>Establish</h3>
                            <DatePicker
                                className = 'form-control'
                                selected={this.state.establish}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className = 'com-info'>
                        <h3 ><a  title="" >Profile (Aircrafts)</a> <a href="#" title="" onClick={this.setportfolio}><i className="fa fa-plus-square"></i></a></h3>
                            <Portmodal show={this.state.modalshow} onHide={()=>{this.setState({modalshow:false})}}/>
                            <hr/>
                            <div className='row'>
                                {
                                    this.state.portfolio.map((list,index) => {
                                        return (
                                            <div key={index} className = 'col-lg-3 '>
                                                <a href="#" title="" data-index_id = {index} data-id={list.id}
                                                    onClick={this.delportfolio}>
                                                    <i  className="fa fa-close"></i></a>
                                                <img  src ={list.img}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    </div>
                    <div className = "com-info">
                        <button type = 'submit' value = 'submit' className = 'form-control btn btn-primary'>Save </button>
                    </div>
                    </ValidatorForm>
                </div>
				
			</div>
     );
 }   
}
const mapStateToProps = state => {
	return {
        userprofile: state.contentReducer.userprofile,
        portfolio:state.contentReducer.portfolio,
	};
};
const mapDispatchToProps = dispatch => {
	return {
        getProfile: () => dispatch(actions.getProfile()) ,
        setportfolioinfo:(portfoilo) => dispatch(actions.setportfolioinfo(portfoilo))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ComLayout)