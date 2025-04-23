import { memoizeIt } from '../src/index';

describe('memoizeIt', () => {
	it('should memoize function results', () => {
		const fn = jest.fn((x) => x * 2);
		const memoized = memoizeIt(fn);

		// First call should execute the function
		expect(memoized(5)).toBe(10);
		expect(fn).toHaveBeenCalledTimes(1);

		// Second call with same args should return cached result
		expect(memoized(5)).toBe(10);
		expect(fn).toHaveBeenCalledTimes(1);

		// Call with different args should execute function again
		expect(memoized(10)).toBe(20);
		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('should use custom key function if provided', () => {
		const fn = jest.fn((x, y) => x + y);
		const keyFn = (x, y) => `${x}-${y}`;
		const memoized = memoizeIt(fn, keyFn);

		memoized(5, 10);
		memoized(5, 10);

		expect(fn).toHaveBeenCalledTimes(1);
	});
});
