import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import Popmsg from '../message/topmessage';
import axios from 'axios';
import * as base from '../env'
import {withRouter} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAs } from 'file-saver';

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const usertoken = localStorage.getItem('token');

const jobs = []
class Docdetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            bookdetail:''
		};
    }
 
    
    componentDidUpdate(prevProps) {
        
       console.log("match",this.props.match.params.id)
        
    }
    componentDidMount(){
        var url= base.base_url+'/doc/doc/'+this.props.match.params.id;
		axios.get(url)
		.then(res => {
            console.log('bookdetail',res)
            this.setState({bookdetail:res.data})
		})
		.catch(err => {
			console.log(err)
		});
    }
   handleToken=(token, addresses)=>{
    console.log('toekn',token);
        var url2 = `${base.base_url}/pay/buydoc?token=`+ token.id+'&price='+this.state.bookdetail.price+'&doc_id='+this.state.bookdetail.id;
        axios.defaults.headers.common['Authorization'] = "token " + usertoken;
        axios.get(url2)
        .then(res => {
            
            let url =`${base.base_url}/doc/doc/`+this.state.bookdetail.id+'/pdfview/'
             axios.defaults.headers.common['Authorization'] = "token " + usertoken;
            console.log("usertoken",usertoken)
            axios.get(url,{
                responseType: 'arraybuffer',
            })
                .then(res => {
                    var blob = new Blob([res.data], {type : 'application/pdf'});
                    saveAs(blob,this.state.bookdetail.title)

                    toast.success("Success! Check email for details", {
                        position: toast.POSITION.TOP_CENTER
                    });
                })
                .catch(err => {
                    console.log("commonfield",err)
                });
           
            
        })
        .catch(err => {
            console.log("commonfield",err)
        });

   }
 render(){
     return(
        <main>
            <ToastContainer />
            <div className="main-section">
                <div className="container">
                    <div className="book-section-data row">
                        <div className = 'book-face col-lg-4'>
                            <img src={this.state.bookdetail.cover}/>
                        </div>
                        <div className = 'book-detail col-lg-8'>
                                <h3 className='book-title'>{this.state.bookdetail.title} </h3>
                                <hr/>
                                <div className = 'mx-0 price-info row align-item-end'>
                                    <h4 className = 'col-lg-3 p-0'> Price : $ {this.state.bookdetail.price}</h4>
                                    <h5 className = 'col-lg-3 p-0'> <p>Publish :</p> {this.state.bookdetail.publish_date}</h5>
                                    <h5 className = 'col-lg-3 p-0'> <p>Category :</p> {this.state.bookdetail.category}</h5>
                                    <h5 className = 'col-lg-3 p-0'> <p>Group :</p> {this.state.bookdetail.group}</h5>
                                </div>
                                <h3 className='book-desc'>Description</h3>
                                <p>{this.state.bookdetail.description}
                                </p>
                                <StripeCheckout
                                    stripeKey="pk_test_56gHGiWiSFd15FqUZ5rwu36s00qRYOaCez"
                                    token={this.handleToken}
                                    // billingAddress
                                    // shippingAddress
                                    amount={this.state.bookdetail.price * 100}
                                    name={this.state.bookdetail.title}
                                />
                        </div>
                    </div>
                </div> 
            </div>
            <Popmsg/>
        </main>
     );
     }
}
const mapStateToProps = state => {

	return {
        profile: state.contentReducer.profile,
        postfile:state.contentReducer.postinfo
        
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Docdetail))