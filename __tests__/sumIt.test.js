import { sumIt } from '../src/index';

describe('sumIt', () => {
	it('should sum all elements in the array', () => {
		const array = [1, 2, 3, 4, 5];
		const result = sumIt(array);
		expect(result).toBe(15);
	});

	it('should handle an empty array and return the initial value', () => {
		const array = [];
		const result = sumIt(array, 10);
		expect(result).toBe(10);
	});

	it('should handle a custom initial value and add it to the sum', () => {
		const array = [1, 2, 3];
		const initialValue = 10;
		const result = sumIt(array, initialValue);
		expect(result).toBe(16);
	});
});
