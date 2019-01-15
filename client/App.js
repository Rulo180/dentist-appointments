import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "../imports/ui/components/Layout";
import PatientsList from "../imports/ui/PatientsList";
import CreatePatient from "../imports/ui/CreatePatient";
import EditPatient from "../imports/ui/EditPatient";


const Index = () => <h1>Welcome to Dentist Appointments!</h1>;

const AppRouter = () => (
    <Router>
        <Switch>
            <Layout>
                <Route path="/" exact component={Index} />
                <Switch>
                    <Route path="/patient/edit/:id" component={EditPatient} />
                    <Route path="/patients/add" component={CreatePatient} />
                    <Route path="/patients" component={PatientsList} />
                </Switch>
            </Layout>
        </Switch>
  </Router>
);

export default AppRouter;
