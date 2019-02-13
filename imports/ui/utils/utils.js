import { check } from 'meteor/check';
import moment from 'moment';
import { isEmpty } from 'lodash';

const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;

export const convertTimeToMilliseconds = (timeString) => {
	check(timeString, String);
	return timeString.split(':').reduce((hour, minutes) => (MILLISECONDS_IN_HOUR * hour) + (MILLISECONDS_IN_MINUTE * minutes));
};

export const mapPatientsToOptions = (patients) => {
	if(!patients || !patients.length) {
		return [];
	}

	const options = patients.map((patient) => {
		return {
			value: patient._id,
			label: patient.name
		};
	});

	return options;
};

export const mapSocialSecuresToOptions = (socialSecures) => {
	if (isEmpty(socialSecures)) {
		return [];
	}

	const options = socialSecures.map((socialSecure) => {
		return { value: socialSecure._id, label: socialSecure.name };
	});

	return options;
};

export const mapAppointmentToForm = (appointment) => {
	
	if(!appointment || !appointment.patientId || !appointment.date) {
		return ({});
	}

	return {
		patientId: {
			value: appointment.patientId,
			valid: true,
		},
		time: {
			value: moment(appointment.date).utc().format('HH:mm'),
			valid: true,
		},
		date: {
			value: moment(appointment.date).utc().format('YYYY-MM-DD'),
			valid: true,
		},
		observations: {
			value: appointment.observations || '',
			valid: true,
		},
	};
};

export const mapPatientToForm = (patient) => {
	
	if(!patient || !patient.name || !patient.birthDate) {
		return ({});
	}

	return ({
		name: {
			value: patient.name,
			valid: true,
		},
		tel: {
			value: patient.tel,
			valid: true,
		},
		birthDate: {
			value: moment(patient.birthDate).format('YYYY-MM-DD').toString(),
			valid: true,
		},
		socialSecureId: {
			value: patient.socialSecureId,
			valid: true,
		}
	});
};

export const mapSocialSecureToForm = (socialSecure) => {
	
	if(!socialSecure || !socialSecure.name || !socialSecure.code) {
		return ({});
	}

	return ({
		name: {
			value: socialSecure.name,
			valid: true,
		},
		code: {
			value: socialSecure.code,
			valid: true,
		},
		services:  socialSecure.services,
	});
};
