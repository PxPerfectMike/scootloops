import { chunkIt } from '../src/index';

describe('chunkIt', () => {
	it('should divide an array into chunks of the specified size', () => {
		const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		const result = chunkIt(array, 3);

		expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
	});

	it('should handle an empty array', () => {
		const array = [];

		const result = chunkIt(array, 3);

		expect(result).toEqual([]);
	});

	it('should handle a chunk size larger than the array length', () => {
		const array = [1, 2, 3];

		const result = chunkIt(array, 5);

		expect(result).toEqual([[1, 2, 3]]);
	});
});
