import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class PatientForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toPatientList: false,
		};
	}
    handleSubmit = (event) => {
        event.preventDefault();
        const { nameInput, telInput, birthInput } = event.target;
        Meteor.call('patients.insert', {
            name: nameInput.value,
            tel: telInput.value,
            birthDate: birthInput.value,
		}, () => {
			this.setState({ toPatientList: true })
		});
    }
    render() { 
		if (this.state.toPatientList === true) {
			return <Redirect to='/patients' />
		}
        return ( 
            <section>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nameInput">Name</label>
                        <input  type="text" 
                                className="form-control"
                                id="nameInput" 
                                placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telInput">Tel</label>
                        <input  type="text" 
                                className="form-control"
                                id="telInput" 
                                aria-describedby="telHelp" 
                                placeholder="Enter telephone number" />
                        <small id="telHelp" className="form-text text-muted">i.e. 2616111222.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthInput">Birth Date</label>
                        <input  type="date" 
                                className="form-control"
                                id="birthInput" 
                         />
                    </div>
                <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </section>
        );
    }
}
 
export default PatientForm;
