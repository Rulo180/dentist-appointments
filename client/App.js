import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import Layout from '../imports/ui/components/Layout';
import PrivateRoute from './PrivateRoute';
import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import Page404 from '../imports/ui/Page404';
import PatientsListContainer from '../imports/ui/container/PatientsListContainer';
import CreatePatientContainer from '../imports/ui/container/PatientCreateContainer';
import PatientEditContainer from '../imports/ui/container/PatientEditContainer';
import AppointmentsListContainer from '../imports/ui/container/AppointmentsListContainer';
import AppointmentCreateContainer from '../imports/ui/container/AppointmentCreateContainer';
import AppointmentEditContainer from '../imports/ui/container/AppointmentEditContainer';
import SocialSecuresListContainer from '../imports/ui/container/SocialSecuresListContainer';
import SocialSecureCreateContainer from '../imports/ui/container/SocialSecureCreateContainer';
import SocialSecureEditContainer from '../imports/ui/container/SocialSecureEditContainer';
import SocialSecureViewContainer from '../imports/ui/container/SocialSecureViewContainer';


const Index = () => <h2>Welcome to Dentist Appointments!</h2>;

Accounts.ui.config({
	passwordSignupFields: 'EMAIL_ONLY',
});

const AppRouter = () => (
	<Router>
		<Layout>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<PrivateRoute exact path="/" component={Index} />
				<PrivateRoute path="/patient/edit/:id" component={PatientEditContainer} />
				<PrivateRoute path="/patients/add" component={CreatePatientContainer} />
				<PrivateRoute exact path="/patients" component={PatientsListContainer} />
				<PrivateRoute path="/appointment/edit/:id" component={AppointmentEditContainer}/>
				<PrivateRoute path="/appointment/add" component={AppointmentCreateContainer}/>
				<PrivateRoute exact path="/appointments" component={AppointmentsListContainer}/>
				<PrivateRoute path="/socials/edit/:id" component={SocialSecureEditContainer} />
				<PrivateRoute path="/socials/add" component={SocialSecureCreateContainer} />
				<PrivateRoute path="/socials/:id" component={SocialSecureViewContainer} />
				<PrivateRoute exact path="/socials" component={SocialSecuresListContainer} />
				<Route component={Page404} />
			</Switch>
		</Layout>
	</Router>
);

export default AppRouter;
