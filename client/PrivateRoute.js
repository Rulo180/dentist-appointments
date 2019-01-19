import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const PrivateRoute = ({ component: Component, ...rest }) => {
	let isLoggedIn = Meteor.userId();
	return (
		<Route
			{...rest}
			render={props =>
				!!isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
};
  
export default PrivateRoute;
