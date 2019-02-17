import React from 'react';
import { NavLink } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';

import { routes } from '../constants';
import { auth } from '../utils/authentication';


const Navbar = ({ history }) => {
	const {
		Home,
		Login,
		Patients,
		Appointments,
		Socials,
	} = routes;
	const isLoggedIn = Meteor.userId();

	const _handleLogout = () => {
		auth.logout(() => history.push(Login.path));
	};
	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<NavLink to={Home.path} className="navbar-brand">Dentist Appointments</NavLink>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavbar" aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			
			<div className="collapse navbar-collapse" id="topNavbar">
				{isLoggedIn ?
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<NavLink to={Home.path} className="nav-link">
								<i className="fas fa-home"></i>&nbsp; 
								{/* <Trans i18nKey={'navbar.home'}>
									Home
								</Trans> */}
								{Home.label}
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to={Appointments.path} className="nav-link">
								<i className="far fa-calendar-alt"></i>&nbsp;
								<Trans i18nKey={'navbar.appointments'}>
									Appointments
								</Trans>
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to={Patients.path} className="nav-link">
								<i className="far fa-address-book"></i>&nbsp;
								<Trans i18nKey={'navbar.patients'}>
									Patients
								</Trans>
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to={Socials.path} className="nav-link">
								<i className="fas fa-briefcase-medical"></i>&nbsp;
								<Trans i18nKey={'navbar.socials'}>
									Social Secures
								</Trans>
							</NavLink>
						</li>
						<button className="btn btn-link ml-auto" onClick={_handleLogout}>
							<i className="fas fa-sign-out-alt"></i>&nbsp;
							<Trans i18nKey={'navbar.logout'}>
								Logout
							</Trans>
						</button>
					</ul>
					:
					<NavLink to={Login.path} className="ml-auto">
						<i className="fas fa-sign-in-alt"></i>&nbsp;
						<Trans i18nKey={'navbar.login'}>
							Log In
						</Trans>
					</NavLink>
				}
			</div>
		</nav>
	);
};

export default translate('common')(Navbar);
