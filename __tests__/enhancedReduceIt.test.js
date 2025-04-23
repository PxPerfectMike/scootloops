import { reduceIt } from '../src/index';

describe('Enhanced reduceIt', () => {
	it('should still work with the original behavior (sum with optional initial value)', () => {
		const array = [1, 2, 3, 4, 5];

		const result = reduceIt(array, 10);

		expect(result).toBe(25); // 10 + 1 + 2 + 3 + 4 + 5
	});

	it('should accept a custom reducer function', () => {
		const array = [1, 2, 3, 4, 5];
		const reducer = (acc, val) => acc * val;

		const result = reduceIt(array, reducer, 1);

		expect(result).toBe(120); // 1 * 1 * 2 * 3 * 4 * 5
	});

	it('should handle different parameter combinations', () => {
		const array = [1, 2, 3];

		// Original usage: default sum with no initial value (defaults to 0)
		expect(reduceIt(array)).toBe(6);

		// Original usage: sum with initial value
		expect(reduceIt(array, 10)).toBe(16);

		// New usage: custom reducer with initial value
		expect(reduceIt(array, (a, b) => a - b, 10)).toBe(4); // 10 - 1 - 2 - 3
	});
});
