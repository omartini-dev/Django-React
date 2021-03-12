import React, { Component } from 'react';
import MainContent from './layout/maincontent';
import Sidebar from './layout/sidebar';
import RightSidebar from './layout/rsidebar';
import Popupcontent from './layout/popup';

class Home extends Component {
	render() {
		return (
			<div>
				<main>
					<div className="main-section">
						<div className="container">
							<div className="main-section-data">
								<div className="row">
									<div className="col-lg-3 col-md-4 pd-left-none no-pd">
										<Sidebar {...this.props} />
									</div>
									<div className="col-lg-6 col-md-8 no-pd">
										<MainContent {...this.props} />
									</div>
									<div className="col-lg-3 pd-right-none no-pd">
										<RightSidebar {...this.props} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
				<Popupcontent />
				{/* <Popmsg /> */}
			</div>
		)
	}
}

export default Home;