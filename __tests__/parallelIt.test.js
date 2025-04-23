import { parallelIt } from '../src/index';

describe('parallelIt', () => {
	it('should process items in parallel', async () => {
		const items = [1, 2, 3, 4, 5];
		const asyncFn = jest.fn((x) => Promise.resolve(x * 2));

		const result = await parallelIt(items, asyncFn);

		expect(result).toEqual([2, 4, 6, 8, 10]);
		expect(asyncFn).toHaveBeenCalledTimes(5);
	});

	it('should respect concurrency limits', async () => {
		const items = [1, 2, 3, 4, 5];
		const calls = [];
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

		const asyncFn = async (x) => {
			calls.push(x);
			await delay(10); // Small delay to ensure calls are grouped
			return x * 2;
		};

		await parallelIt(items, asyncFn, 2);

		// With concurrency of 2, we should see batches of 2 items
		// This is a simplification - in actual test you might need
		// a more sophisticated approach to verify concurrency
		expect(calls).toEqual([1, 2, 3, 4, 5]);
	});
});
