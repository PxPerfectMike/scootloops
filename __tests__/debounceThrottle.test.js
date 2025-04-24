import {
	jest,
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
} from '@jest/globals';
import { debounceIt, throttleIt } from '../src/index';

// Note: Testing timers is tricky and might require more sophisticated setup
describe('debounceIt and throttleIt', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	describe('debounceIt', () => {
		it('should delay function execution until after wait time', () => {
			const fn = jest.fn();
			const debounced = debounceIt(fn, 1000);

			debounced();
			expect(fn).not.toHaveBeenCalled();

			jest.advanceTimersByTime(500);
			expect(fn).not.toHaveBeenCalled();

			jest.advanceTimersByTime(500);
			expect(fn).toHaveBeenCalledTimes(1);
		});

		it('should reset the timer when called again before timeout', () => {
			const fn = jest.fn();
			const debounced = debounceIt(fn, 1000);

			debounced();
			jest.advanceTimersByTime(500);

			debounced();
			jest.advanceTimersByTime(500);
			expect(fn).not.toHaveBeenCalled();

			jest.advanceTimersByTime(500);
			expect(fn).toHaveBeenCalledTimes(1);
		});
	});

	describe('throttleIt', () => {
		it('should limit the rate of function calls', () => {
			const fn = jest.fn();
			const throttled = throttleIt(fn, 1000);

			throttled();
			expect(fn).toHaveBeenCalledTimes(1);

			throttled();
			throttled();
			expect(fn).toHaveBeenCalledTimes(1);

			jest.advanceTimersByTime(1000);
			expect(fn).toHaveBeenCalledTimes(2);
		});
	});
});
