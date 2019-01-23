import React from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from './Navbar';


const Layout = ({ children, history }) => {
	return (
		<div>
			<Navbar history={history}/>
			<div className="container pt-3 pb-3">
				{children}
			</div>
		</div>
	);
};
 
export default withRouter(
	Layout,
);
