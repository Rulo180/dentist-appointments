import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getUrlLabel } from '../utils/utils';
import { routes } from '../constants';


const BreadcrumbItem = ({ match }) => {
	const routeName = getUrlLabel(match.url, routes);
	if (routeName) {
		return (
			match.isExact
				? <span className='breadcrumb-item active'>{routeName}</span>
				: <Link className='breadcrumb-item' to={match.url || ''}>{routeName}</Link>
		);
	}
	return null;
};

// BreadcrumbItem.propTypes = {
// 	part: PropTypes.string.isRequired,
// 	partIndex: PropTypes.string.isRequired,
// 	parts: PropTypes.array.isRequired,
// };

export default BreadcrumbItem;
