import React from 'react';
import { withRouter } from 'react-router-dom';

import './layout.scss';

import Navbar from './Navbar';


const Layout = ({ children, history }) => {
	return (
		<div className="layout">
			<Navbar history={history}/>
			<main className="layout__content container pt-3 pb-3">
				{children}
			</main>
		</div>
	);
};
 
export default withRouter(
	Layout,
);
