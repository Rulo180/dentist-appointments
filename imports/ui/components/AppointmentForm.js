import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';

import { URLS } from '../constants';


const AppointmentForm = ({ patients, formData, onChange, onSelect, onSubmit }) => {
	_mapPatientsToOptions = () => {
		let options = [];
		patients.map((patient) => {
			options.push({ value: patient._id, label: patient.name });
		});
		return options;
	};

	const options = this._mapPatientsToOptions();

	return (
		<div className="row justify-content-center">
			<div className="col-10 col-md-8 col-lg-6">
				<div className="card">
					<div className="card-body">
						<form onSubmit={onSubmit}>
							<div className="form-group">
								<div className="row justify-content-between no-gutters">
									<label htmlFor="patientSelect">Patient</label>
									<NavLink to={URLS.ADD_PATIENT}>Create patient</NavLink>
								</div>
								<Select
									name="patientSelect"
									options={options}
									onChange={onSelect}
								/>
							</div>
							<div className="form-row">
								<div className="form-group col-md-4">
									<label htmlFor="timeInput">Time</label>
									<input
										type="time"
										className="form-control"
										name="time"
										onChange={onChange}
										value={formData.time.value}
									/>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="dateInput">Date</label>
									<input
										type="date"
										className="form-control" 
										name="date"
										onChange={onChange}
										value={formData.date.value}
									/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="observations">Observations</label>
								<textarea
									className="form-control"
									name="observations"
									rows="3"
									onChange={onChange}
									value={formData.observations.value}
								>
								</textarea>
							</div>
							<div className="row align-items-center">
								<div className="col text-right">
									<button type="submit" className="btn btn-primary">Submit</button>
								</div>
								<div className="col">
									<NavLink to={'/appointments'}>Cancel</NavLink>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

AppointmentForm.propTypes = {
	patients: PropTypes.array.isRequired,
	formData: PropTypes.shape({
		patientId: PropTypes.object,
		time: PropTypes.object,
		date: PropTypes.object,
		observations: PropTypes.object,
	}),
	onChange: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default AppointmentForm;
