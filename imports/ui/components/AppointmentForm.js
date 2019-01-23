import React, { PureComponent } from 'react';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';


export class AppointmentForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			appointment: { },
		};
	}

	_handleChange = (event) => {
		const { name, value } = event.target;
		
		let newAppointment = {
			...this.state.appointment,
			[name]: value,
		};
		this.setState({
			appointment: newAppointment,
		});
	}

	_handleSelect = (selectedOption) => {
		let newAppointment = {
			...this.state.appointment,
			patientId: selectedOption.value,
		};
		this.setState({
			appointment: newAppointment,
		});
	}

	_mapPatientsToOptions = () => {
		let options = [];
		this.props.patients.map((patient) => {
			options.push({ value: patient._id, label: patient.name });
		});
		return options;
	}

	render() {
		const { onSubmit } = this.props;
		const { appointment } = this.state;
		const options = this._mapPatientsToOptions();

		return (
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="patientSelect">Patient</label>
					<Select
						name="patientSelect"
						options={options}
						onChange={this._handleSelect}
					/>
				</div>
				<div className="form-row">
					<div className="form-group col-md-4">
						<label htmlFor="timeInput">Time</label>
						<input
							type="time"
							className="form-control"
							name="time"
							onChange={this._handleChange}
							value={appointment.time}
						/>
					</div>
					<div className="form-group col-md-6">
						<label htmlFor="dateInput">Date</label>
						<input
							type="date"
							className="form-control" 
							name="date"
							onChange={this._handleChange}
							value={appointment.date}
						/>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="observations">Observations</label>
					<textarea
						className="form-control"
						name="observations"
						rows="3"
						onChange={this._handleChange}
						value={appointment.observations}
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
		);
	}
}

export default AppointmentForm;
