import React, { PureComponent } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import { URLS } from '../constants';

class PatientForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			patient: props.patient || { name: '', tel: '', birthDate: '' },
		};
	}

	componentDidMount() {
		if (this.props.patient) {
			this.setState({
				patient: {...this.state.patient, birthDate: moment(this.props.patient.birthDate).format('YYYY-MM-DD').toString()}
			});		
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		let patient = {
			...this.state.patient,
			[name]: value,
		};
		this.setState({
			patient,
		});
	}

	render() { 
		const { onSubmit } = this.props;
		const { patient } = this.state;
		
		return (
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="nameInput">Name</label>
					<input  type="text" 
						className="form-control"
						value={patient.name}
						onChange={this.handleChange}
						name="name" 
						placeholder="Enter name" />
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="telInput">Tel</label>
						<input  type="tel" 
							className="form-control"
							value={patient.tel}
							onChange={this.handleChange}
							name="tel" 
							aria-describedby="telHelp" 
							placeholder="Enter phone number" />
						<small id="telHelp" className="form-text text-muted">E.g. 2616111222.</small>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="birthInput">Birth Date</label>
						<input  type="date" 
							className="form-control"
							value={patient.birthDate}
							onChange={this.handleChange}
							name="birthDate" 
						/>
					</div>
				</div>
				<div className="row align-items-center">
					<div className="col text-right">
						<button type="submit" className="btn btn-primary">Save</button>
					</div>
					<div className="col">
						<NavLink to={URLS.PATIENTS}>Cancel</NavLink>
					</div>
				</div>
			</form>
		);
	}
}
 
export default PatientForm;
