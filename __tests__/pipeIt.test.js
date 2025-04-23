import { pipeIt } from '../src/index';

describe('pipeIt', () => {
	it('should compose functions from left to right', () => {
		const addTwo = (x) => x + 2;
		const multiplyByThree = (x) => x * 3;
		const square = (x) => x * x;

		const pipeline = pipeIt(addTwo, multiplyByThree, square);

		// (5 + 2) -> 7, (7 * 3) -> 21, (21 * 21) -> 441
		expect(pipeline(5)).toBe(441);
	});

	it('should handle a single function', () => {
		const addTwo = (x) => x + 2;

		const pipeline = pipeIt(addTwo);

		expect(pipeline(5)).toBe(7);
	});

	it('should pass through the input when no functions are provided', () => {
		const pipeline = pipeIt();

		expect(pipeline(5)).toBe(5);
	});
});
