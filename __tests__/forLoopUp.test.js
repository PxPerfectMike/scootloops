import { upLoop, times } from '../src/index';

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

	it('supports a step parameter', () => {
		let values = [];
		upLoop(0, 10, (i) => {
			values.push(i);
		}, 2);
		expect(values).toEqual([0, 2, 4, 6, 8]);
	});

	it('supports early exit by returning false', () => {
		let values = [];
		upLoop(0, 10, (i) => {
			values.push(i);
			if (i === 5) return false;
		});
		expect(values).toEqual([0, 1, 2, 3, 4, 5]);
	});
});

describe('times', () => {
	it('executes the provided function the correct number of times', () => {
		let count = 0;
		times(5, () => {
			count++;
		});
		expect(count).toBe(5);
	});

	it('provides the correct index to the callback', () => {
		let values = [];
		times(5, (i) => {
			values.push(i);
		});
		expect(values).toEqual([0, 1, 2, 3, 4]);
	});

	it('supports early exit by returning false', () => {
		let values = [];
		times(10, (i) => {
			values.push(i);
			if (i === 3) return false;
		});
		expect(values).toEqual([0, 1, 2, 3]);
	});
});
