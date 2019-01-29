import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { URLS } from '../constants';
import { auth } from '../utils/authentication';


const Navbar = ({ history }) => {
	const {
		HOME,
		LOGIN,
		PATIENTS,
		APPOINTMENTS,
	} = URLS;
	const isLoggedIn = Meteor.userId();

	const _handleLogout = () => {
		auth.logout(() => history.push(LOGIN));
	};
	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<NavLink to={HOME} className="navbar-brand">Dentist Appointments</NavLink>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavbar" aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="topNavbar">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<NavLink to={HOME} className="nav-link"><i className="fas fa-home"></i> Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={APPOINTMENTS} className="nav-link"><i className="far fa-calendar-alt"></i> Appointments</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={PATIENTS} className="nav-link"><i className="far fa-address-book"></i> Patients</NavLink>
					</li>
				</ul>
				{ (isLoggedIn) ?
					<button className="btn btn-link" onClick={_handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
					: <NavLink to={LOGIN}><i className="fas fa-sign-in-alt"></i> Log In</NavLink>
				}
			</div>
		</nav>
	);
};

export default Navbar;
