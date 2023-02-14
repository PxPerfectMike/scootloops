import { forEach } from '../src/index';

describe('forEach', () => {
	it('should call the callback function on each matching element in the array', () => {
		const array = [1, 2, 3, 4, 5];
		const data = 3;
		const callback = jest.fn();

		forEach(array, data, callback);

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(3);
	});

	it('should not call the callback function if no elements in the array match the data', () => {
		const array = [1, 2, 4, 5];
		const data = 3;
		const callback = jest.fn();

		forEach(array, data, callback);

		expect(callback).not.toHaveBeenCalled();
	});
});
