import { reduceIt } from '../src/index';

describe('reduceIt', () => {
	it('should accumulate a single value by adding each element of the array', () => {
		const array = [1, 2, 3, 4, 5];

		const result = reduceIt(array);

		expect(result).toBe(15);
	});

	it('should handle an empty array and return the initial value', () => {
		const array = [];

		const result = reduceIt(array, 10);

		expect(result).toBe(10);
	});

	it('should handle a custom initial value and add it to the sum of the array elements', () => {
		const array = [1, 2, 3];
		const initialValue = 10;

		const result = reduceIt(array, initialValue);

		expect(result).toBe(16);
	});
});
