import { assert } from 'chai';

import { convertTimeToMilliseconds } from './utils';

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
});
