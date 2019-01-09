import React, { Component } from 'react';

import Navbar from './Navbar';
import PatientForm from './PatientForm';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h1>Welcome to Dentist Appointments!</h1>
                    <PatientForm />
                </div>
            </div>
        );
    }
}
 
export default App;
