import { assert } from 'chai';

import { convertTimeToMilliseconds } from './utils';
import { mapPatientsToOptions, mapAppointmentToForm } from './utils';


describe('Utils', function() {
	describe('convertTimeToMilliseconds', function() {
		it('should fail if parameter is not string', function() {
			const time = 30;
			assert.throw(function() {convertTimeToMilliseconds(time);}, 'Match error: Expected string, got number');
		});
		it('should convert 00:00', function() {
			const time = '00:00';
			let result = convertTimeToMilliseconds(time);
			let expected = 0;
			assert.equal(result, expected);
		});
		it('should convert 00:01', function() {
			const time = '00:01';
			let result = convertTimeToMilliseconds(time);
			let expected = 60000;
			assert.equal(result, expected);
		});
		it('should convert 10:30', function() {
			const time = '10:30';
			let result = convertTimeToMilliseconds(time);
			let expected = 37800000;
			assert.equal(result, expected);
		});
		it('should convert 24:00', function() {
			const time = '24:00';
			let result = convertTimeToMilliseconds(time);
			let expected = 86400000;
			assert.equal(result, expected);
		});
	});
	describe('Map functions', function() {
		it('mapPatientsToOptions Should return an array', function() {
			let result = mapPatientsToOptions();
			assert.isArray(result);
		});
		it('mapPatientsToOptions Should return empty array on empty entry data', function() {
			let result = mapPatientsToOptions();
			assert.isEmpty(result);
		});
		it('mapPatientsToOptions All values should have value and label', function() {
			const patients = [{
				_id: '123', name: 'pedro'
			}];
			let result = mapPatientsToOptions(patients);
			assert.deepEqual(result[0], { value: '123', label: 'pedro' });
		});

		it('mapAppointmentToForm Should return an empty objetc if arguments are not valid', function() {
			let result = mapAppointmentToForm();
			assert.isObject(result, 'On no arguments returns an empty object');
		});
		it('mapAppointmentToForm Should return same patientId and date formatted', function() {
			const now = new Date();
			const appointment = {
				patientId: '123456',
				date: now.getTime(),
				observations: 'testing observations...'
			};
			
			let result = mapAppointmentToForm(appointment);
			const expectedDay = (now.getUTCDate() < 10) ? ('0' + now.getUTCDate()) : now.getUTCDate();
			const month = now.getUTCMonth() + 1;
			const expectedMonth = ( month < 10 ) ? '0' + month : month;
			const expectedDate = now.getFullYear() + '-' + expectedMonth + '-' + expectedDay
			
			const expectedHours = (now.getUTCHours() < 10) ? '0' + now.getUTCHours() : now.getUTCHours()
			const expectedMinutes = (now.getUTCMinutes() < 10) ? '0' + now.getUTCMinutes() : now.getUTCMinutes()
			const expected = {
				patientId: {
					value: '123456',
					valid: true
				},
				date: {
					value: expectedDate,
					valid: true
				},
				time: {
					value: expectedHours + ':' + expectedMinutes,
					valid: true
				},
				observations: {
					value: 'testing observations...',
					valid: true
				}
			}
			assert.deepEqual(result, expected);
		});
		it('mapAppointmentToForm Should return empty string on observation if there is no value', function() {
			const now = new Date();
			const appointment = {
				patientId: '123456',
				date: now.getTime()
			};
			
			let result = mapAppointmentToForm(appointment);
			const observations = result.observations;
			const expected = {
				value: '',
				valid: true,
			}
			assert.deepEqual(observations, expected);
		});

	});
});
