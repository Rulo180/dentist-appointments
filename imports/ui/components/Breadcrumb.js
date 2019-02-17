import React from 'react';
import PropTypes from 'prop-types';
import {  Route } from 'react-router-dom';

import BreadcrumbItem from './BreadcrumbItem';


const Breadcrumb = ({ location : { pathname }, match, ...rest }) => {
	const paths = [];
	pathname.split('/').reduce((prev, curr, index) => {
		paths[index] = `${prev}/${curr}`;
		return paths[index];
	});

	return (
		<nav className='breadcrumb'>
			{paths.map(path => <Route key={path} path={path} component={BreadcrumbItem} />)}
		</nav>
	);
};

Breadcrumb.propTypes = {

};

export default Breadcrumb;
