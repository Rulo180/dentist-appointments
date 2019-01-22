import React, { Component } from 'react';

class PatientForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			patient: this.props.patient || {},
		};
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
			<section>
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
					<div className="form-group">
						<label htmlFor="telInput">Tel</label>
						<input  type="tel" 
							className="form-control"
							value={patient.tel}
							onChange={this.handleChange}
							name="tel" 
							aria-describedby="telHelp" 
							placeholder="Enter telephone number" />
						<small id="telHelp" className="form-text text-muted">E.g. 2616111222.</small>
					</div>
					<div className="form-group">
						<label htmlFor="birthInput">Birth Date</label>
						<input  type="date" 
							className="form-control"
							value={patient.birthDate?patient.birthDate.toISOString().substring(0, 10):''}
							onChange={this.handleChange}
							name="birthDate" 
						/>
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</section>
		);
	}
}
 
export default PatientForm;
