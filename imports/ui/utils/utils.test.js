import { assert } from 'chai';

import { convertTimeToMilliseconds } from './utils';
import {
	mapPatientsToOptions,
	mapAppointmentToForm,
	mapSocialSecuresToOptions,
	mapPatientToForm,
	mapSocialSecureToForm,
	getUrlLabel,
} from './utils';


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

	// Map Entities To Options functions

	describe('MapPatientsToOptions', function() {
		const patientsMock = [{
			_id: '123',
			name: 'John Doe',
		}];
		it('should return an array', function() {
			let result = mapPatientsToOptions(patientsMock);
			assert.isArray(result);
		});
		it('should return empty array on empty entry data', function() {
			let result = mapPatientsToOptions();
			assert.isEmpty(result);
		});
		it('should return an option representation', function() {
			let result = mapPatientsToOptions(patientsMock);
			assert.deepEqual(result[0], { value: '123', label: 'John Doe' });
		});
	});

	describe('MapSocialSecuresToOptions', () => {
		const socialSecureMock = [{
			_id: '111',
			name: 'OSEP',
		}];
		const emptySocialSecureMock = [];

		it('Should return an array', function() {
			let result = mapSocialSecuresToOptions(socialSecureMock);
			assert.isArray(result);
		});
		it('Should return empty array on empty entry data', function() {
			let result = mapSocialSecuresToOptions(emptySocialSecureMock);
			assert.isEmpty(result);
		});
		it('should return an option representation', function() {
			let result = mapSocialSecuresToOptions(socialSecureMock);
			assert.deepEqual(result[0], { value: '111', label: 'OSEP' });
		});

	});

	// Map Entities To Form functions

	describe('MapAppointmentToForm', function() {
		it('should return an empty object if arguments are not valid', function() {
			let result = mapAppointmentToForm();
			assert.isObject(result, 'On no arguments returns an empty object');
		});
		it('should return same patientId and date formatted', function() {
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
			const expectedDate = now.getFullYear() + '-' + expectedMonth + '-' + expectedDay;
			
			const expectedHours = (now.getUTCHours() < 10) ? '0' + now.getUTCHours() : now.getUTCHours();
			const expectedMinutes = (now.getUTCMinutes() < 10) ? '0' + now.getUTCMinutes() : now.getUTCMinutes();
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
			};
			assert.deepEqual(result, expected);
		});
		it('should return empty string on observation if there is no value', function() {
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
			};
			assert.deepEqual(observations, expected);
		});
	});


	describe('MapPatientToForm', () => {
		const now = new Date();
		const patientMock = {
			name: 'Jon Snow',
			tel: '4222555',
			birthDate: now,
			socialSecureId: '1111'
		};
		
		it('Should return an empty object if arguments are not valid', function() {
			let result = mapPatientToForm();
			assert.isObject(result, 'On no arguments returns an empty object');
		});
		it('Should return an option representation', function() {
			let result = mapPatientToForm(patientMock);

			const expectedDay = (now.getUTCDate() < 10) ? ('0' + now.getUTCDate()) : now.getUTCDate();
			const month = now.getUTCMonth() + 1;
			const expectedMonth = ( month < 10 ) ? '0' + month : month;
			const expectedDate = now.getFullYear() + '-' + expectedMonth + '-' + expectedDay;

			assert.deepEqual(result, {
				name: {
					value: patientMock.name,
					valid: true,
				},
				tel: {
					value: patientMock.tel,
					valid: true,
				},
				birthDate: {
					value: expectedDate,
					valid: true,
				},
				socialSecureId: {
					value: patientMock.socialSecureId,
					valid: true,
				}
			});
		});
	});

	describe('MapSocialSecureToForm', () => {
		const socialSecureMock = {
			name: 'OSEP',
			code: '1234',
			services: []
		};
		
		it('Should return an empty object if arguments are not valid', function() {
			let result = mapSocialSecureToForm();
			assert.isObject(result, 'On no arguments returns an empty object');
		});
		it('Should return an option representation', function() {
			let result = mapSocialSecureToForm(socialSecureMock);
			assert.deepEqual(result, {
				name: {
					value: 'OSEP',
					valid: true,
				},
				code: {
					value: '1234',
					valid: true,
				},
				services: []
			});
		});
	});

	describe('getUrlLabel', function() {
		const routes = {
			Home: {
				path: '/',
				label: 'Home',
			},
			SomeRoute: {
				path: '/someroute',
				label: 'Some route',
			},
			AnotherRoute: {
				path: '/anotherroute',
				label: 'Another route',
			},
			SameRoute: {
				path: '/anotherroute',
				label: 'Same route',
			}
		};
		
		it('should returns a string', function() {
			const result = getUrlLabel('/someroute', routes);
			assert.isString(result);
		});

		it('should return label if the path matches', function() {
			const result = getUrlLabel('/someroute', routes);
			assert.equal(result, 'Some route');
		});

		it('should return an empty string if the path doesnt match', function () {
			const result = getUrlLabel('/inexistentRoute', routes);
			assert.isEmpty(result);
		});

		it('should return just the first ocurrence if two path matches', function() {
			const result = getUrlLabel('/anotherroute', routes);
			assert.equal(result, 'Another route');
			assert.isNotArray(result);
		});

		it('should fail if routes parameter is missing', function() {
			assert.throws(() => getUrlLabel('/someroute'), 'Cannot convert undefined or null to object');
		});
	});
});
