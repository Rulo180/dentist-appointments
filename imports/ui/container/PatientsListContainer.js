import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Patients from '../../api/patients';

import PatientsTable from '../components/PatientsTable';
import DeleteModal from '../components/DeleteModal';

class PatientsListContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showConfirmationModal: false,
			modalPatientId: '',
		};
	}

	_handleDelete = () => {
		Meteor.call('patient.remove', { _id: this.state.modalPatientId });
		this._closeConfirmationModal();
	};

	_showConfirmationModal = (id) => {
		this.setState({ showConfirmationModal: true, modalPatientId: id });
	}

	_closeConfirmationModal = () => {
		this.setState({ showConfirmationModal: false });
	}

	render() { 
		const { patients, isLoading } = this.props;
		const { showConfirmationModal, modalPatientId } = this.state;

		if(isLoading) {
			return (
				<div className="d-flex justify-content-center mt-5">
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		}

		return (
			<section>
				<PatientsTable patients={patients} onDelete={this._showConfirmationModal} />
				<DeleteModal 
					isOpen={showConfirmationModal}
					title="Delete confirmation"
					object={(modalPatientId)?patients.filter((patient) => patient._id === modalPatientId)[0].name:''}
					onConfirm={this._handleDelete}
					onClose={this._closeConfirmationModal}
				/>
			</section>
		);
	}
}
 
export default withTracker(() => {
	const patientsHandler = Meteor.subscribe('patients');
	const isLoading = !patientsHandler.ready();

	return {
		patients: !isLoading ? Patients.find({}, { sort: { name: 1 } }).fetch() : [], 
		isLoading,
	};
})(PatientsListContainer);
