import { check } from 'meteor/check';

const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;

export const convertTimeToMilliseconds = (timeString) => {
	check(timeString, String);
	return timeString.split(':').reduce((hour, minutes) => (MILLISECONDS_IN_HOUR * hour) + (MILLISECONDS_IN_MINUTE * minutes));
};
