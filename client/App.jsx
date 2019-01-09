import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Layout from "../imports/ui/Layout";
import PatientForm from "../imports/ui/PatientForm";


const Index = () => <h1>Welcome to Dentist Appointments!</h1>;

const AppRouter = () => (
    <Router>
        <Layout>
            <Route path="/" exact component={Index} />
            <Route path="/patients/" component={PatientForm} />
        </Layout>
  </Router>
);

export default AppRouter;
