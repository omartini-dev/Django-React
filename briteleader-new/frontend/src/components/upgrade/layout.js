import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/content';
import {StripeProvider,injectStripe,Elements,CardNumberElement,CardExpiryElement,CardCVCElement} from 'react-stripe-elements';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as base from '../env'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

var tmpuser = localStorage.getItem('userinfo');
var userinfo = JSON.parse(tmpuser);
const token =localStorage.getItem('token');
const handleBlur = () => {
    console.log('[blur]');
  };
  const handleChange = (change) => {
    console.log('[change]', change);
  };
  const handleClick = () => {
    console.log('[click]');
  };
  const handleFocus = () => {
    console.log('[focus]');
  };
  const handleReady = () => {
    console.log('[ready]');
  };
  const createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
          padding,
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };


class UpgradeLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      stripe:null,
      plan:0,
      upgrade:false,
		};
    }
 
   
    showcard=()=>{
      return(
              <div className = 'card-desc'>
                    <div className = ' pay-card'>
                            <StripeProvider apiKey="pk_test_56gHGiWiSFd15FqUZ5rwu36s00qRYOaCez">
                                <Elements>
                                    <SplitForm/>
                                </Elements>
                            </StripeProvider>
                        
                    </div>
                </div>
      );
    }
    handleClickDelete=()=>{
      // toast("");warn ,success,error,info
      toast.success("Your account has been deleted! Please Relogin...", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    DelPre=()=>{
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Are you sure?</h1>
              <p>You want to delete/downgrade your account ?</p>
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  this.handleClickDelete();
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>
            </div>
          );
        }
      });
      this.setState({plan:0})
    }
    showdescription = ()=>{
      return(
              <div className = 'upgrade-desc'>
                <h3>Description</h3>
                <hr/>
                  <ul>
                    <li>
                      <div className = 'row'>
                        <div className = 'col-lg-2'>
                          <i className ='fa fa-2x fa-list'></i>
                        </div>
                        <div className = 'col-lg-10 list-desc'>Companies can Purchase Subscriptions to access to professional list and infomatins</div> 

                      </div>
                    </li>
                    <li>
                      <div className = 'row'>
                        <div className = 'col-lg-2'>
                          <i className ='fa fa-2x fa-list'></i>
                        </div>
                        <div className = 'col-lg-10 list-desc'>Professional can Purchase Subscriptions to access to company list and infomatins</div> 
                      </div>
                    </li>
                    <li>
                      <div className = 'row'>
                        <div className = 'col-lg-2'>
                          <i className ='fa fa-2x fa-file-pdf'></i>
                        </div>
                        <div className = 'col-lg-10 list-desc'>Professional and Company can purchase access to Documentation per unit Group</div> 
                      </div>
                    </li>
                    <li>
                      <div className = 'row'>
                        <div className = 'col-lg-2'>
                          <i className ='fa fa-2x fa-cubes'></i>
                        </div>
                        <div className = 'col-lg-10 list-desc'>Professional can purchase consulting pakages</div> 
                      </div>
                    </li>
                  </ul>
              </div>
      );
    }
    setUpgrade=()=>{

      this.setState({upgrade:true})
    }
    componentDidMount() {
      console.log("userinfoasdfa",userinfo)
      }
 render(){
     return(
        <section className="companies-info1">
			<div className="container">
      <ToastContainer />
				<div className="company-title">
					<h3 className = 'upgrade-title'>Upgrade Account</h3>
          <img src='/static/frontend/images/banner/upgrade.jpg'/>
          
				</div>
                <div className = 'row upgrade-body'>
                    <div className = 'col-lg-5 card-pos'>
                        <div className = 'card-detail'>
                          <p className = 'card-alarm'>Popular</p>
                            <p>PREMIUM</p>
                            <h3>$4.9<span>/month</span></h3>
                            <hr/>
                            <ul>
                                <li><i className = 'fa fa-check'></i> Access PRO List</li>
                                <li><i className = 'fa fa-check'></i> Access Company List</li>
                                <li><i className = 'fa fa-check'></i> Access plageform Docs</li>
                                <li><i className = 'fa fa-check'></i> Recommendation</li>
                                <li><i className = 'fa fa-check'></i> ... ...</li>
                                
                            </ul>
                            <hr/>
                            {
                              userinfo.is_subscribed? <button className = 'btn btn btn-danger form-control del-account' onClick = {this.DelPre}>Cancel Subscribe</button> :<button className = 'btn btn btn-success form-control three-month' onClick = {this.setUpgrade}>Upgrade</button>
                            }
                        </div>

                    </div>
                   <div className = ' col-lg-7'>
                        {this.state.upgrade? this.showcard() : this.showdescription()}
                   </div>
                </div>
                
				
			</div>
		</section>
     );
 }   
}
class BasicDesc extends React.Component {
  render(){
    return(
      <div className = 'col col-lg-7'>
        <h3>Basic</h3>
        <hr/>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    );
  }
}

class _SplitForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      spiner:false
    }
  }
    handleSubmit = (ev) => {
      ev.preventDefault();
      this.setState({spiner:true})
      if (this.props.stripe) {
        this.props.stripe
          .createToken()
          .then((payload) =>{
            console.log('[token]', payload.token.id)

            var url2 = `${base.base_url}/pay/setsubscribe?token=`+ payload.token.id;
            axios.defaults.headers.common['Authorization'] = "token " + token;
            axios.get(url2)
            .then(res => {
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa",res)    
                    this.setState({spiner:false})
                    toast.success("Your account has been Upgrade! Please Relogin ...", {
                      position: toast.POSITION.TOP_CENTER
                    });
            })
            .catch(err => {
                console.log("commonfield",err)
            });

          } );
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    };
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          {
            this.state.spiner ?
                    <div className = 'pay-spiner'>
                        <Loader
                                type="Plane"
                                color="yellow"
                                height={100}
                                width={100}
                                timeout={0} //3 secs

                            />
                    </div> : null
            }
            <div className = 'row'>
                <div className = 'col-lg-8'>
                    <label>
                        Card number
                        <CardNumberElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                        {...createOptions(this.props.fontSize)}
                        />
                    </label>
                    <label>
                        Expiration date
                        <CardExpiryElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                        {...createOptions(this.props.fontSize)}
                        />
                    </label>
                    <label>
                        CVC
                        <CardCVCElement
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onReady={handleReady}
                        {...createOptions(this.props.fontSize)}
                        />
                    </label>
                </div>
                <div className = 'col-lg-4 strip'>
                    Stripe
                    <img src="/static/frontend/images/resources/card.png" alt=""/>
                </div>
                
            </div>
          <button className = 'form-control btn btn-dg-success '>Pay (Upgrade Account)</button>
          <ToastContainer />
        </form>
      );
    }
  }
  const SplitForm = injectStripe(_SplitForm);


const mapStateToProps = state => {
	return {
		profile: state.contentReducer.profile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getProfile: () => dispatch(actions.getProfile()) 
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UpgradeLayout)