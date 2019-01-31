import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import Layout from '../imports/ui/components/Layout';
import PrivateRoute from './PrivateRoute';
import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import Page404 from '../imports/ui/Page404';
import PatientsList from '../imports/ui/PatientsList';
import CreatePatient from '../imports/ui/CreatePatient';
import EditPatient from '../imports/ui/EditPatient';
import AppointmentsListContainer from '../imports/ui/container/AppointmentsListContainer';
import AppointmentCreateContainer from '../imports/ui/container/AppointmentCreateContainer';
import AppointmentEditContainer from '../imports/ui/container/AppointmentEditContainer';


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
				<PrivateRoute path="/patient/edit/:id" component={EditPatient} />
				<PrivateRoute path="/patients/add" component={CreatePatient} />
				<PrivateRoute path="/patients" component={PatientsList} />
				<PrivateRoute path="/appointment/edit/:id" component={AppointmentEditContainer}/>
				<PrivateRoute path="/appointment/add" component={AppointmentCreateContainer}/>
				<PrivateRoute path="/appointments" component={AppointmentsListContainer}/>
				<Route component={Page404} />
			</Switch>
		</Layout>
	</Router>
);

export default AppRouter;
