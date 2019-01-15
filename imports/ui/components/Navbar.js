import React from 'react';
import { Link } from 'react-router-dom';

import { URLS } from '../constants';


const Navbar = () => {
    const { HOME_URL, PATIENTS_URL } = URLS;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={HOME_URL} className="navbar-brand">Dentist Appointments</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavbar" aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="topNavbar">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link to={HOME_URL} className="nav-link">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={PATIENTS_URL} className="nav-link">Patients</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
