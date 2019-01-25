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
import AppointmentsList from '../imports/ui/AppointmentsList';
import AppointmentCreate from '../imports/ui/AppointmentCreate';


const Index = () => <h1>Welcome to Dentist Appointments!</h1>;

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
				<PrivateRoute path="/appointments" component={AppointmentsList}/>
				<PrivateRoute path="/appointment/add" component={AppointmentCreate}/>
				<Route component={Page404} />
			</Switch>
		</Layout>
	</Router>
);

export default AppRouter;
