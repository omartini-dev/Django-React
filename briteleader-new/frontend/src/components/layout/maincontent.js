import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

export default class MainContent extends Component {
	componentDidMount(){
		$('.profiles-slider').slick({
			slidesToShow: 3,
			slck:true,
			slidesToScroll: 1,
			prevArrow:'<span class="slick-previous"></span>',
			nextArrow:'<span class="slick-nexti"></span>',
			autoplay: true,
			dots: false,
			autoplaySpeed: 2000,
			responsive: [
			{
				breakpoint: 1200,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
				dots: false
				}
			},
			{
				breakpoint: 991,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
			]


		});
	}
	render() {
		return (
			<div className="main-ws-sec">
				<div className="post-topbar">
					<div className="user-picy">
						<img src="/static/frontend/images/resources/user-pic.png" alt=""/>
					</div>
					<div className="post-st">
						<ul>
							<li><a className="post_project" href="#" title="">Post a Project</a></li>
							<li><a className="post-jb active" href="#" title="">Post a Job</a></li>
						</ul>
					</div>
				</div>
				<div className="posts-section">
					<div className="post-bar">
						<div className="post_topbar">
							<div className="usy-dt">
								<img src="/static/frontend/images/resources/us-pic.png" alt=""/>
								<div className="usy-name">
									<h3>John Doe</h3>
									<span><img src="/static/frontend/images/clock.png" alt=""/>3 min ago</span>
								</div>
							</div>
							<div className="ed-opts">
								<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
								<ul className="ed-options">
									<li><a href="#" title="">Edit Post</a></li>
									<li><a href="#" title="">Unsaved</a></li>
									<li><a href="#" title="">Unbid</a></li>
									<li><a href="#" title="">Close</a></li>
									<li><a href="#" title="">Hide</a></li>
								</ul>
							</div>
						</div>
						<div className="epi-sec">
							<ul className="descp">
								<li><img src="/static/frontend/images/icon8.png" alt=""/><span>Epic Coder</span></li>
								<li><img src="/static/frontend/images/icon9.png" alt=""/><span>India</span></li>
							</ul>
							<ul className="bk-links">
								<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
								<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
							</ul>
						</div>
						<div className="job_descp">
							<h3>Senior Wordpress Developer</h3>
							<ul className="job-dt">
								<li><a href="#" title="">Full Time</a></li>
								<li><span>$30 / hr</span></li>
							</ul>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
							<ul className="skill-tags">
								<li><a href="#" title="">HTML</a></li>
								<li><a href="#" title="">PHP</a></li>
								<li><a href="#" title="">CSS</a></li>
								<li><a href="#" title="">Javascript</a></li>
								<li><a href="#" title="">Wordpress</a></li> 	
							</ul>
						</div>
						<div className="job-status-bar">
							<ul className="like-com">
								<li>
									<a href="#"><i className="fas fa-heart"></i> Like</a>
									<img src="/static/frontend/images/liked-img.png" alt=""/>
									<span>25</span>
								</li> 
								<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comment 15</a></li>
							</ul>
							<a href="#"><i className="fas fa-eye"></i>Views 50</a>
						</div>
					</div>
					<div className="top-profiles">
						<div className="pf-hd">
							<h3>Top Profiles</h3>
							<i className="la la-ellipsis-v"></i>
						</div>
						<div className="profiles-slider">
							<div className="user-profy">
								<img src="/static/frontend/images/resources/user1.png" alt=""/>
								<h3>John Doe</h3>
								<span>Graphic Designer</span>
								<ul>
									<li><a href="#" title="" className="followw">Follow</a></li>
									<li><a href="#" title="" className="envlp"><img src="/static/frontend/images/envelop.png" alt=""/></a></li>
									<li><a href="#" title="" className="hire">hire</a></li>
								</ul>
								<a href="#" title="">View Profile</a>
							</div>
							<div className="user-profy">
								<img src="/static/frontend/images/resources/user2.png" alt=""/>
								<h3>John Doe</h3>
								<span>Graphic Designer</span>
								<ul>
									<li><a href="#" title="" className="followw">Follow</a></li>
									<li><a href="#" title="" className="envlp"><img src="/static/frontend/images/envelop.png" alt=""/></a></li>
									<li><a href="#" title="" className="hire">hire</a></li>
								</ul>
								<a href="#" title="">View Profile</a>
							</div>
							<div className="user-profy">
								<img src="/static/frontend/images/resources/user3.png" alt=""/>
								<h3>John Doe</h3>
								<span>Graphic Designer</span>
								<ul>
									<li><a href="#" title="" className="followw">Follow</a></li>
									<li><a href="#" title="" className="envlp"><img src="/static/frontend/images/envelop.png" alt=""/></a></li>
									<li><a href="#" title="" className="hire">hire</a></li>
								</ul>
								<a href="#" title="">View Profile</a>
							</div>
							<div className="user-profy">
								<img src="/static/frontend/images/resources/user1.png" alt=""/>
								<h3>John Doe</h3>
								<span>Graphic Designer</span>
								<ul>
									<li><a href="#" title="" className="followw">Follow</a></li>
									<li><a href="#" title="" className="envlp"><img src="/static/frontend/images/envelop.png" alt=""/></a></li>
									<li><a href="#" title="" className="hire">hire</a></li>
								</ul>
								<a href="#" title="">View Profile</a>
							</div>
							<div className="user-profy">
								<img src="/static/frontend/images/resources/user2.png" alt=""/>
								<h3>John Doe</h3>
								<span>Graphic Designer</span>
								<ul>
									<li><a href="#" title="" className="followw">Follow</a></li>
									<li><a href="#" title="" className="envlp"><img src="/static/frontend/images/envelop.png" alt=""/></a></li>
									<li><a href="#" title="" className="hire">hire</a></li>
								</ul>
								<a href="#" title="">View Profile</a>
							</div>
							<div className="user-profy">
								<img src="/static/frontend/images/resources/user3.png" alt=""/>
								<h3>John Doe</h3>
								<span>Graphic Designer</span>
								<ul>
									<li><a href="#" title="" className="followw">Follow</a></li>
									<li><a href="#" title="" className="envlp"><img src="/static/frontend/images/envelop.png" alt=""/></a></li>
									<li><a href="#" title="" className="hire">hire</a></li>
								</ul>
								<a href="#" title="">View Profile</a>
							</div>
						</div>
					</div>
					<div className="post-bar">
						<div className="post_topbar">
							<div className="usy-dt">
								<img src="/static/frontend/images/resources/us-pic.png" alt=""/>
								<div className="usy-name">
									<h3>John Doe</h3>
									<span><img src="/static/frontend/images/clock.png" alt=""/>3 min ago</span>
								</div>
							</div>
							<div className="ed-opts">
								<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
								<ul className="ed-options">
									<li><a href="#" title="">Edit Post</a></li>
									<li><a href="#" title="">Unsaved</a></li>
									<li><a href="#" title="">Unbid</a></li>
									<li><a href="#" title="">Close</a></li>
									<li><a href="#" title="">Hide</a></li>
								</ul>
							</div>
						</div>
						<div className="epi-sec">
							<ul className="descp">
								<li><img src="/static/frontend/images/icon8.png" alt=""/><span>Epic Coder</span></li>
								<li><img src="/static/frontend/images/icon9.png" alt=""/><span>India</span></li>
							</ul>
							<ul className="bk-links">
								<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
								<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
								<li><a href="#" title="" className="bid_now">Bid Now</a></li>
							</ul>
						</div>
						<div className="job_descp">
							<h3>Senior Wordpress Developer</h3>
							<ul className="job-dt">
								<li><a href="#" title="">Full Time</a></li>
								<li><span>$30 / hr</span></li>
							</ul>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
							<ul className="skill-tags">
								<li><a href="#" title="">HTML</a></li>
								<li><a href="#" title="">PHP</a></li>
								<li><a href="#" title="">CSS</a></li>
								<li><a href="#" title="">Javascript</a></li>
								<li><a href="#" title="">Wordpress</a></li> 	
							</ul>
						</div>
						<div className="job-status-bar">
							<ul className="like-com">
								<li>
									<a href="#"><i className="fas fa-heart"></i> Like</a>
									<img src="/static/frontend/images/liked-img.png" alt=""/>
									<span>25</span>
								</li> 
								<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comment 15</a></li>
							</ul>
							<a href="#"><i className="fas fa-eye"></i>Views 50</a>
						</div>
					</div>
					<div className="posty">
						<div className="post-bar no-margin">
							<div className="post_topbar">
								<div className="usy-dt">
									<img src="/static/frontend/images/resources/us-pc2.png" alt=""/>
									<div className="usy-name">
										<h3>John Doe</h3>
										<span><img src="/static/frontend/images/clock.png" alt=""/>3 min ago</span>
									</div>
								</div>
								<div className="ed-opts">
									<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
									<ul className="ed-options">
										<li><a href="#" title="">Edit Post</a></li>
										<li><a href="#" title="">Unsaved</a></li>
										<li><a href="#" title="">Unbid</a></li>
										<li><a href="#" title="">Close</a></li>
										<li><a href="#" title="">Hide</a></li>
									</ul>
								</div>
							</div>
							<div className="epi-sec">
								<ul className="descp">
									<li><img src="/static/frontend/images/icon8.png" alt=""/><span>Epic Coder</span></li>
									<li><img src="/static/frontend/images/icon9.png" alt=""/><span>India</span></li>
								</ul>
								<ul className="bk-links">
									<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
									<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
								</ul>
							</div>
							<div className="job_descp">
								<h3>Senior Wordpress Developer</h3>
								<ul className="job-dt">
									<li><a href="#" title="">Full Time</a></li>
									<li><span>$30 / hr</span></li>
								</ul>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
								<ul className="skill-tags">
									<li><a href="#" title="">HTML</a></li>
									<li><a href="#" title="">PHP</a></li>
									<li><a href="#" title="">CSS</a></li>
									<li><a href="#" title="">Javascript</a></li>
									<li><a href="#" title="">Wordpress</a></li> 	
								</ul>
							</div>
							<div className="job-status-bar">
								<ul className="like-com">
									<li>
										<a href="#"><i className="fas fa-heart"></i> Like</a>
										<img src="/static/frontend/images/liked-img.png" alt=""/>
										<span>25</span>
									</li> 
									<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comment 15</a></li>
								</ul>
								<a href="#"><i className="fas fa-eye"></i>Views 50</a>
							</div>
						</div>
						<div className="comment-section">
							<a href="#" className="plus-ic">
								<i className="la la-plus"></i>
							</a>
							<div className="comment-sec">
								<ul>
									<li>
										<div className="comment-list">
											<div className="bg-img">
												<img src="/static/frontend/images/resources/bg-img1.png" alt=""/>
											</div>
											<div className="comment">
												<h3>John Doe</h3>
												<span><img src="/static/frontend/images/clock.png" alt=""/> 3 min ago</span>
												<p>Lorem ipsum dolor sit amet, </p>
												<a href="#" title="" className="active"><i className="fa fa-reply-all"></i>Reply</a>
											</div>
										</div>
										<ul>
											<li>
												<div className="comment-list">
													<div className="bg-img">
														<img src="/static/frontend/images/resources/bg-img2.png" alt=""/>
													</div>
													<div className="comment">
														<h3>John Doe</h3>
														<span><img src="/static/frontend/images/clock.png" alt=""/> 3 min ago</span>
														<p>Hi John </p>
														<a href="#" title=""><i className="fa fa-reply-all"></i>Reply</a>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li>
										<div className="comment-list">
											<div className="bg-img">
												<img src="/static/frontend/images/resources/bg-img3.png" alt=""/>
											</div>
											<div className="comment">
												<h3>John Doe</h3>
												<span><img src="/static/frontend/images/clock.png" alt=""/> 3 min ago</span>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at.</p>
												<a href="#" title=""><i className="fa fa-reply-all"></i>Reply</a>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className="post-comment">
								<div className="cm_img">
									<img src="/static/frontend/images/resources/bg-img4.png" alt=""/>
								</div>
								<div className="comment_box">
									<form>
										<input type="text" placeholder="Post a comment"/>
										<button type="submit">Send</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="process-comm">
						<div className="spinner">
							<div className="bounce1"></div>
							<div className="bounce2"></div>
							<div className="bounce3"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
