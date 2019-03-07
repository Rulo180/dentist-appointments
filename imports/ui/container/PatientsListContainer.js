import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Patients from '../../api/patients';
import SocialSecures from '../../api/socialSecures';

import PatientsTable from '../components/PatientsTable';
import withModal from '../hoc/withModal';

class PatientsListContainer extends PureComponent {

	onPrimaryAction = (patientId) => {
		Meteor.call('patient.remove', { _id: patientId  });
	}

	_handleDelete = (patientId) => {
		const { openModal, closeModal, patients } = this.props;

		openModal({
			patientId,
			title: 'Delete confirmation',
			content: `You are going to delete ${patients.find(patient=>patient._id === patientId).name}. Are you sure?`,
			onPrimary: () => this.onPrimaryAction(patientId),
			onSecondary: closeModal,
		});
	};

	render() { 
		const { patients, socialSecures,isLoading } = this.props;

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
			<PatientsTable patients={patients} socialSecures={socialSecures} onDelete={this._handleDelete} />
		);
	}
}
 
export default withModal(withTracker(() => {
	const patientsHandler = Meteor.subscribe('patients');
	const isLoadingPatients = !patientsHandler.ready();
	const socialsHandler = Meteor.subscribe('socialSecures');
	const isLoadingSocials = !socialsHandler.ready();

	return {
		patients: !isLoadingPatients ? Patients.find({}, { sort: { name: 1 } }).fetch() : [], 
		socialSecures: !isLoadingSocials ? SocialSecures.find({}).fetch() : [], 
		isLoading: isLoadingPatients || isLoadingSocials ,
	};
})(PatientsListContainer));
