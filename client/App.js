import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "../imports/ui/Layout";
import PatientsList from "../imports/ui/PatientsList";
import PatientForm from "../imports/ui/PatientForm";


const Index = () => <h1>Welcome to Dentist Appointments!</h1>;

const AppRouter = () => (
    <Router>
        <Layout>
            <Route path="/" exact component={Index} />
            <Switch>
                <Route path="/patients/add" component={PatientForm} />
                <Route path="/patients" component={PatientsList} />
            </Switch>
        </Layout>
  </Router>
);

export default AppRouter;