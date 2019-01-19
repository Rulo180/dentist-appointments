import React from 'react';
import { NavLink } from 'react-router-dom';

import { URLS } from '../constants';

import AccountsUI from '../AccountsUIWrapper';


const Navbar = () => {
	const { HOME_URL, PATIENTS_URL } = URLS;
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<NavLink to={HOME_URL} className="navbar-brand">Dentist Appointments</NavLink>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavbar" aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="topNavbar">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item d-flex align-items-center">
						<AccountsUI />
					</li>
					<li className="nav-item">
						<NavLink to={HOME_URL} className="nav-link">Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={PATIENTS_URL} className="nav-link">Patients</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar;
