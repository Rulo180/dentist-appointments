import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { URLS } from '../constants';
import { auth } from '../utils/authentication';


const Navbar = ({ history }) => {
	const {
		HOME_URL,
		PATIENTS_URL,
		LOGIN_URL,
	} = URLS;
	const isLoggedIn = Meteor.userId();

	const _handleLogout = () => {
		auth.logout(() => history.push('/login'));
	};
	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<NavLink to={HOME_URL} className="navbar-brand">Dentist Appointments</NavLink>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavbar" aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="topNavbar">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<NavLink to={HOME_URL} className="nav-link">Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={PATIENTS_URL} className="nav-link">Patients</NavLink>
					</li>
				</ul>
				{ (isLoggedIn) ?
					<button className="btn btn-link" onClick={_handleLogout}>Logout</button>
					: <NavLink to="/login">Log In</NavLink>
				}
			</div>
		</nav>
	);
};

export default Navbar;
