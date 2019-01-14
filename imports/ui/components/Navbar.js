import React from 'react';
import { URLS } from '../constants';


const Navbar = () => {
    const { HOME_URL, PATIENTS_URL } = URLS;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Dentist Appointments</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavbar" aria-controls="topNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="topNavbar">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href={HOME_URL}>Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={PATIENTS_URL}>Patients</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;