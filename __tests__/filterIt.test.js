import { filterIt } from '../src/index.js';

// describe('filterIt', () => {
// 	test('throws an error if the first argument is not an array', () => {
// 		expect(() => filterIt('not an array', 'exactMatch.test')).toThrow();
// 	});

// 	test('throws an error if the second argument is not an accepted condition', () => {
// 		expect(() => filterIt([1, 2, 3], 'invalidCondition.test')).toThrow(
// 			new Error(
// 				'Invalid argument: The second argument must be one of the accepted conditions.'
// 			)
// 		);
// 	});

// 	test('filters an array based on the exactMatch condition', () => {
// 		const inputArray = [
// 			{ name: 'Alice' },
// 			{ name: 'Bob' },
// 			{ name: 'Charlie' },
// 		];
// 		const expectedOutput = [{ name: 'Bob' }];
// 		expect(filterIt(inputArray, 'name.exactMatch.Bob')).toEqual(expectedOutput);
// 	});

// 	test('filters an array based on the greaterThan condition', () => {
// 		const inputArray = [{ age: 25 }, { age: 30 }, { age: 35 }];
// 		const expectedOutput = [{ age: 35 }];
// 		expect(filterIt(inputArray, 'age.greaterThan.30')).toEqual(expectedOutput);
// 	});

// 	test('filters an array based on the camelCase condition and returns items that have a camelCase property value', () => {
// 		const inputArray = [
// 			{ name: 'Alice' },
// 			{ name: 'Bob' },
// 			{ name: 'charlie' },
// 			{ name: 'davidJohnson' },
// 		];
// 		const expectedOutput = [{ name: 'charlie' }, { name: 'davidJohnson' }];
// 		expect(filterIt(inputArray, 'name.camelCase')).toEqual(expectedOutput);
// 	});

// 	test('returns an empty array if no items match the condition', () => {
// 		const inputArray = [
// 			{ name: 'Alice' },
// 			{ name: 'Bob' },
// 			{ name: 'Charlie' },
// 		];
// 		const expectedOutput = [];
// 		expect(filterIt(inputArray, 'name.exactMatch.David')).toEqual(
// 			expectedOutput
// 		);
// 	});

// 	test('filters an array of strings and an array of numbers and returns items that match the exactMatch condition', () => {
// 		const inputStringArray = ['foo', 'bar', 'baz'];
// 		const expectedStringOutput = ['bar'];
// 		expect(filterIt(inputStringArray, "exactMatch('bar')")).toEqual(
// 			expectedStringOutput
// 		);

// 		const inputNumberArray = [1, 2, 3];
// 		const expectedNumberOutput = [2];
// 		expect(filterIt(inputNumberArray, 'exactMatch(2)')).toEqual(
// 			expectedNumberOutput
// 		);

// 		const inputStringArray2 = ['foo', 'bar', 'baz'];
// 		const expectedStringOutput2 = ['baz'];
// 		expect(filterIt(inputStringArray2, "exactMatch('baz')")).toEqual(
// 			expectedStringOutput2
// 		);

// 		const inputNumberArray2 = [1, 2, 3];
// 		const expectedNumberOutput2 = [3];
// 		expect(filterIt(inputNumberArray2, 'exactMatch.3')).toEqual(
// 			expectedNumberOutput2
// 		);
// 	});
// });

describe('filterIt', () => {
	const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	it('should filter the array based on the "even" condition', () => {
		const result = filterIt(testArray, 'even');
		expect(result).toEqual([2, 4, 6, 8, 10]);
	});

	it('should filter the array based on the "odd" condition', () => {
		const result = filterIt(testArray, 'odd');
		expect(result).toEqual([1, 3, 5, 7, 9]);
	});

	it('should filter the array based on the "greaterThan" condition', () => {
		const result = filterIt(testArray, 'greaterThan', 5);
		expect(result).toEqual([6, 7, 8, 9, 10]);
	});

	it('should filter the array based on the "lessThan" condition', () => {
		const result = filterIt(testArray, 'lessThan', 5);
		expect(result).toEqual([1, 2, 3, 4]);
	});

	it('should filter the array based on the "startsWith" condition', () => {
		const testArray2 = ['apple', 'banana', 'cherry', 'date'];
		const result = filterIt(testArray2, 'startsWith', 'a');
		expect(result).toEqual(['apple']);
	});

	it('should filter the array based on the "endsWith" condition', () => {
		const testArray2 = ['apple', 'banana', 'cherry', 'date'];
		const result = filterIt(testArray2, 'endsWith', 'e');
		expect(result).toEqual(['apple', 'date']);
	});

	it('should filter the array based on the "contains" condition', () => {
		const testArray2 = ['apple', 'banana', 'cherry', 'date'];
		const result = filterIt(testArray2, 'contains', 'a');
		expect(result).toEqual(['apple', 'banana', 'date']);
	});

	it('should filter the array based on the "isObject" condition', () => {
		const testArray2 = [1, 'two', { name: 'Alice', age: 25 }];
		const result = filterIt(testArray2, 'isObject');
		expect(result).toEqual([{ name: 'Alice', age: 25 }]);
	});

	it('should filter the array based on the "isClass" condition', () => {
		class Person {}
		const testArray2 = [1, 'two', Person];
		const result = filterIt(testArray2, 'isClass');
		expect(result).toEqual([Person]);
	});

	it('should filter the array based on the "isArray" condition', () => {
		const testArray2 = [1, 'two', [1, 2, 3]];
		const result = filterIt(testArray2, 'isArray');
		expect(result).toEqual([[1, 2, 3]]);
	});

	it('should filter the array based on the "isNumber" condition', () => {
		const testArray2 = [1, 'two', 3.14];
		const result = filterIt(testArray2, 'isNumber');
		expect(result).toEqual([1, 3.14]);
	});

	it('should filter the array based on the "isString" condition', () => {
		const testArray2 = [1, 'two', 3.14];
		const result = filterIt(testArray2, 'isString');
		expect(result).toEqual(['two']);
	});

	it('should filter the array based on a condition with no value specified', () => {
		const result = filterIt(testArray, 'odd', undefined);
		expect(result).toEqual([1, 3, 5, 7, 9]);
	});

	it('should handle the case where the value is a string that should be converted to a number', () => {
		const result = filterIt(testArray, 'greaterThan', '5');
		expect(result).toEqual([6, 7, 8, 9, 10]);
	});

	it('should handle the case where the value is a string that should be treated as a string', () => {
		const testArray2 = ['apple', 'banana', 'cherry', 'date'];
		const result = filterIt(testArray2, 'contains', 'an');
		expect(result).toEqual(['banana']);
	});
});
