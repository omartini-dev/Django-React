import React, { Component } from 'react';
import Home from './home';
import ComHome from './comhome';
import Createcom from './companis/create/layout'
import Createper from './companis/create/layout1'
import { connect } from 'react-redux';
import * as actions from '../store/actions/content';
import axios from 'axios';
import * as base from './env'
import { Carousel } from 'react-responsive-carousel';

const iscompany = localStorage.getItem('iscompany');
const isempty = localStorage.getItem('city');
const token =localStorage.getItem('token');

class Homepart extends Component {
    constructor(props){
        super(props);
        this.state={
            iscompany:null
        }
    }

    componentDidMount(){
        // var url = base.base_url+ '/profile/profile/get_object';
		// axios.defaults.headers.common['Authorization'] ="token " + token;
		// axios.get(url)
		// .then(res => {
		// 	this.setState({userprofile:res.data})
		// 	this.props.setUserProfile(res.data)
		// })
		// .catch(err => {
		// 	console.log(err)
        // });
    }
	render() {
        return(
            <div className='wel-body'>
               <div className = 'wel-banner'>
                   <div className = 'row banner-text'>
                       <div className = 'col-lg-8'>
                            <h3>World's largest freelancing and job portal </h3>
                            <h3>social networking marketplace.</h3>
                            <p>We connect over 3 Million employers and freelancers globally from over 237 </p>
                             <p>   countries, regions, and territories</p>
                       </div>
                        

                   </div>
                    <img src='/static/frontend/images/banner/plane-1 (11).jpg'/>
               </div>
               <section id="about">
                    <div className="container">
                        <div className="row about-container">

                        <div class="col-lg-6 content order-lg-1 order-2">
                            <p className='dg-p'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>

                            <div className="icon-box wow fadeInUp">
                            <div className="icon"><i className="fa fa-shopping-bag"></i></div>
                            <h4 className="title"><a href="">Eiusmod Tempor</a></h4>
                            <p className="description">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
                            </div>

                            <div className="icon-box wow fadeInUp" data-wow-delay="0.2s">
                            <div className="icon"><i className="fa fa-photo"></i></div>
                            <h4 className="title"><a href="">Magni Dolores</a></h4>
                            <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            </div>

                            <div className="icon-box wow fadeInUp" data-wow-delay="0.4s">
                            <div className="icon"><i className="fa fa-bar-chart"></i></div>
                            <h4 className="title"><a href="">Dolor Sitema</a></h4>
                            <p className="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
                            </div>

                        </div>

                        <div className="col-lg-6 background order-lg-2 order-1 wow fadeInUp">
                            <img src="/static/frontend/images/banner/pilote.png" className="img-fluid" alt=""/>
                        </div>
                        </div>

                        <div className="row about-extra">
                        <div className="col-lg-6 wow fadeInUp">
                            <img src="/static/frontend/images/banner/pilote1.png" className="img-fluid" alt=""/>
                        </div>
                        <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
                            <h4>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h4>
                            <p>
                            Ipsum in aspernatur ut possimus sint. Quia omnis est occaecati possimus ea. Quas molestiae perspiciatis occaecati qui rerum. Deleniti quod porro sed quisquam saepe. Numquam mollitia recusandae non ad at et a.
                            </p>
                            <p>
                            Ad vitae recusandae odit possimus. Quaerat cum ipsum corrupti. Odit qui asperiores ea corporis deserunt veritatis quidem expedita perferendis. Qui rerum eligendi ex doloribus quia sit. Porro rerum eum eum.
                            </p>
                        </div>
                        </div>

                        <div className="row about-extra">
                        <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
                            <img src="/static/frontend/images/banner/pilote2.png" className="img-fluid" alt=""/>
                        </div>

                        <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
                            <h4>Neque saepe temporibus repellat ea ipsum et. Id vel et quia tempora facere reprehenderit.</h4>
                            <p>
                            Delectus alias ut incidunt delectus nam placeat in consequatur. Sed cupiditate quia ea quis. Voluptas nemo qui aut distinctio. Cumque fugit earum est quam officiis numquam. Ducimus corporis autem at blanditiis beatae incidunt sunt. 
                            </p>
                            <p>
                            Voluptas saepe natus quidem blanditiis. Non sunt impedit voluptas mollitia beatae. Qui esse molestias. Laudantium libero nisi vitae debitis. Dolorem cupiditate est perferendis iusto.
                            </p>
                            <p>
                            Eum quia in. Magni quas ipsum a. Quis ex voluptatem inventore sint quia modi. Numquam est aut fuga mollitia exercitationem nam accusantium provident quia.
                            </p>
                        </div>
                        
                        </div>

                    </div>
                    </section>
               <section id="services" className="section-bg">
                <div className="container">
                    <div className="row">
                        <div className = 'col-lg-12 how-head wow bounceInUp'data-wow-duration="1.4s">
                            <h3>How it works</h3>
                        </div>
                    <div className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-duration="1.4s">
                        <div className="box">
                        <div className="icon"><i className = 'fas fa-edit'></i> </div>
                        <h4 className="title"><a href="">Job Posting</a></h4>
                        <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 wow bounceInUp" data-wow-duration="1.4s">
                        <div className="box">
                        <div className="icon"><i className="fas fa-address-book"></i></div>
                        <h4 className="title"><a href="">Contact list</a></h4>
                        <p className="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
                        <div className="box">
                        <div className="icon"><i class="fas fa-mail-bulk"></i></div>
                        <h4 className="title"><a href="">Send Message</a></h4>
                        <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 wow bounceInUp" data-wow-delay="0.1s" data-wow-duration="1.4s">
                        <div className="box">
                        <div className="icon"><i class="fab fa-amazon-pay"></i></div>
                        <h4 className="title"><a href="">Payment</a></h4>
                        <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-5 offset-lg-1 wow bounceInUp" data-wow-delay="0.2s" data-wow-duration="1.4s">
                        <div className="box">
                        <div className="icon"><i class="far fa-file-pdf"></i></div>
                        <h4 className="title"><a href="">New Docments</a></h4>
                        <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 wow bounceInUp" data-wow-delay="0.2s" data-wow-duration="1.4s">
                        <div className="box">
                        <div className="icon"><i class="fas fa-passport"></i></div>
                        <h4 className="title"><a href="">Eiusmod Tempor</a></h4>
                        <p className="description">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
                        </div>
                    </div>

                    </div>

                </div>
                </section>
                <section id="why-us" className="wow fadeIn">
                    <div className="container">
                        <header className="section-header">
                        <h3>Why choose us?</h3>
                        <p>Laudem latine persequeris id sed, ex fabulas delectus quo. No vel partiendo abhorreant vituperatoribus.</p>
                        </header>

                        <div className="row row-eq-height justify-content-center">

                        <div className="col-lg-4 mb-4">
                            <div className="card wow bounceInUp">
                                <i className="fas fa-users"></i>
                            <div className="card-body">
                                <h5 className="card-title">Corporis dolorem</h5>
                                <p className="card-text">Deleniti optio et nisi dolorem debitis. Aliquam nobis est temporibus sunt ab inventore officiis aut voluptatibus.</p>
                                <a href="#" className="readmore">Read more </a>
                            </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-4">
                            <div className="card wow bounceInUp">
                            <i className="fa fa-diamond"></i>
                            <div className="card-body">
                                <h5 className="card-title">Voluptates dolores</h5>
                                <p className="card-text">Voluptates nihil et quis omnis et eaque omnis sint aut. Ducimus dolorum aspernatur.</p>
                                <a href="#" className="readmore">Read more </a>
                            </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-4">
                            <div className="card wow bounceInUp">
                                <i className="fa fa-object-group"></i>
                            <div className="card-body">
                                <h5 className="card-title">Eum ut aspernatur</h5>
                                <p className="card-text">Autem quod nesciunt eos ea aut amet laboriosam ab. Eos quis porro in non nemo ex. </p>
                                <a href="#" className="readmore">Read more </a>
                            </div>
                            </div>
                        </div>

                        </div>

                        <div className="row counters">

                        <div className="col-lg-3 col-6 text-center">
                            <span data-toggle="counter-up">274</span>
                            <p>Clients</p>
                        </div>

                        <div className="col-lg-3 col-6 text-center">
                            <span data-toggle="counter-up">421</span>
                            <p>Projects</p>
                        </div>

                        <div className="col-lg-3 col-6 text-center">
                            <span data-toggle="counter-up">1,364</span>
                            <p>Hours Of Support</p>
                        </div>

                        <div className="col-lg-3 col-6 text-center">
                            <span data-toggle="counter-up">18</span>
                            <p>Hard Workers</p>
                        </div>
                
                        </div>

                    </div>
                    </section>
            </div>
        );
		
	}
}

const mapStateToProps = state => {

	return {
		userprofile: state.contentReducer.userprofile
	};
};
const mapDispatchToProps = dispatch => {
	return {
		setUserProfile: (userprofile) =>dispatch(actions.setUserProfile(userprofile))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepart)