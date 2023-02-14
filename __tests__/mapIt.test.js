import { mapIt } from '../src/index';

describe('mapIt', () => {
	it('should apply the callback function to each element of the array and return a new array with the transformed values', () => {
		const array = [1, 2, 3, 4, 5];
		const callback = (element) => element * 2;

		const result = mapIt(array, callback);

		expect(result).toEqual([2, 4, 6, 8, 10]);
	});

	it('should handle an empty array and return an empty array', () => {
		const array = [];
		const callback = (element) => element * 2;

		const result = mapIt(array, callback);

		expect(result).toEqual([]);
	});

	it('should handle a callback function that returns undefined and include undefined in the resulting array', () => {
		const array = [1, 2, 3];
		const callback = (element) => {
			if (element === 2) {
				return undefined;
			}
			return element * 2;
		};

		const result = mapIt(array, callback);

		expect(result).toEqual([2, undefined, 6]);
	});
});
