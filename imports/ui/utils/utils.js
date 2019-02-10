import { check } from 'meteor/check';
import moment from 'moment';

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
		}
	})

	return options;
};

export const mapAppointmentToForm = (appointment) => {
	
	if(!appointment || !appointment.patientId || !appointment.date) {
		return {};
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
}
