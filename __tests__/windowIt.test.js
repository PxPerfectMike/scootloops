import { windowIt } from '../src/index';

describe('windowIt', () => {
	it('should create sliding windows of the specified size', () => {
		const array = [1, 2, 3, 4, 5];

		const result = windowIt(array, 3);

		expect(result).toEqual([
			[1, 2, 3],
			[2, 3, 4],
			[3, 4, 5],
		]);
	});

	it('should respect the step parameter', () => {
		const array = [1, 2, 3, 4, 5, 6];

		const result = windowIt(array, 2, 2);

		expect(result).toEqual([
			[1, 2],
			[3, 4],
			[5, 6],
		]);
	});

	it('should return an empty array if the window size is larger than the array', () => {
		const array = [1, 2, 3];

		const result = windowIt(array, 4);

		expect(result).toEqual([]);
	});
});
