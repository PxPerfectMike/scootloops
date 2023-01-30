import { forLoopDown } from '../src/index';

describe('forLoopDown', () => {
	it('executes the provided function the correct number of times', () => {
		let count = 0;
		forLoopDown(10, 0, () => {
			count++;
		});
		expect(count).toBe(10);
	});

	it('provides the correct values of `i` to the provided function', () => {
		let values = [];
		forLoopDown(10, -1, (i) => {
			values.push(i);
		});
		expect(values).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
	});
});
