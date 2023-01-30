import { doWhileLoop } from '../src/index';

describe('doWhileLoop', () => {
	it('executes the provided function the correct number of times', () => {
		let count = 0;
		let i = 0;
		doWhileLoop(
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
		doWhileLoop(
			() => i < 5,
			(i) => {
				i++;
				count++;
			}
		);
		expect(count).toBe(5);
	});

	it('executes the provided function at least once', () => {
		let count = 0;
		let i = 10;
		doWhileLoop(
			() => i < 5,
			() => {
				i++;
				count++;
			}
		);
		expect(count).toBe(1);
	});
});
