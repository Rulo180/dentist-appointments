import React from 'react';
import { withRouter } from 'react-router-dom';

import './layout.scss';

import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';


const Layout = ({ children, history, match, location }) => {
	return (
		<div className="layout">
			<Navbar history={history}/>
			<main className="layout__content container pt-3 pb-3">
				<div className="row justify-content-center">
					<div className="col-md-10">
						<Breadcrumb history={history} match= {match} location={location} />
					</div>
				</div>
				{children}
			</main>
		</div>
	);
};
 
export default withRouter(
	Layout,
);
