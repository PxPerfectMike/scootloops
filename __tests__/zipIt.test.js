import { zipIt } from '../src/index';

describe('zipIt', () => {
	it('should zip multiple arrays together', () => {
		const array1 = [1, 2, 3];
		const array2 = ['a', 'b', 'c'];

		const result = zipIt(array1, array2);

		expect(result).toEqual([
			[1, 'a'],
			[2, 'b'],
			[3, 'c'],
		]);
	});

	it('should handle arrays of different lengths by using the shortest length', () => {
		const array1 = [1, 2, 3, 4, 5];
		const array2 = ['a', 'b', 'c'];

		const result = zipIt(array1, array2);

		expect(result).toEqual([
			[1, 'a'],
			[2, 'b'],
			[3, 'c'],
		]);
	});

	it('should handle more than two arrays', () => {
		const array1 = [1, 2, 3];
		const array2 = ['a', 'b', 'c'];
		const array3 = [true, false, true];

		const result = zipIt(array1, array2, array3);

		expect(result).toEqual([
			[1, 'a', true],
			[2, 'b', false],
			[3, 'c', true],
		]);
	});
});
