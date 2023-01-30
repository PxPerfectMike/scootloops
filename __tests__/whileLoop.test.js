import { whileLoop } from '../src/index';

describe('whileLoop', () => {
	it('executes the provided function the correct number of times', () => {
		let count = 0;
		let i = 0;
		whileLoop(
			() => i < 10,
			(i) => {
				i++;
				count++;
			}
		);
		expect(count).toBe(10);
	});

	it('stops executing the provided function when the condition returns false', () => {
		let count = 0;
		let i = 0;
		whileLoop(
			() => i < 5,
			(i) => {
				i++;
				count++;
			}
		);
		expect(count).toBe(5);
	});
});
