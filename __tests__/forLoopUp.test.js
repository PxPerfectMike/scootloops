import { upLoop } from '../src/index';

describe('upLoop', () => {
	it('executes the provided function the correct number of times', () => {
		let count = 0;
		upLoop(0, 10, () => {
			count++;
		});
		expect(count).toBe(10);
	});

	it('provides the correct values of `i` to the provided function', () => {
		let values = [];
		upLoop(0, 10, (i) => {
			values.push(i);
		});
		expect(values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	});
});
