import { filterIt } from '../src/index.js';

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
		class Person {
			constructor() {}
		}
		const testArray2 = [1, 'two', Person, Array];
		const result = filterIt(testArray2, 'isClass');
		expect(result).toEqual([Person, Array]);
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

	it('should filter based on object properties using propName.operator syntax', () => {
		const people = [
			{ name: 'John', age: 25 },
			{ name: 'Jane', age: 35 },
			{ name: 'Bob', age: 40 },
		];
		const result = filterIt(people, 'age.greaterThan', 30);
		expect(result).toEqual([
			{ name: 'Jane', age: 35 },
			{ name: 'Bob', age: 40 },
		]);
	});

	it('should filter the array based on the "truthy" condition', () => {
		const testArray2 = [0, 1, false, true, '', 'hello', null, undefined, {}];
		const result = filterIt(testArray2, 'truthy');
		expect(result).toEqual([1, true, 'hello', {}]);
	});

	it('should filter the array based on the "falsy" condition', () => {
		const testArray2 = [0, 1, false, true, '', 'hello', null, undefined];
		const result = filterIt(testArray2, 'falsy');
		expect(result).toEqual([0, false, '', null, undefined]);
	});

	it('should filter the array based on the "isEmpty" condition', () => {
		const testArray2 = ['', 'hello', [], [1, 2], {}, { a: 1 }, null, undefined];
		const result = filterIt(testArray2, 'isEmpty');
		expect(result).toEqual(['', [], {}, null, undefined]);
	});

	it('should filter the array based on the "hasLength" condition', () => {
		const testArray2 = ['a', 'ab', 'abc', [1], [1, 2], [1, 2, 3]];
		const result = filterIt(testArray2, 'hasLength', 2);
		expect(result).toEqual(['ab', [1, 2]]);
	});

	it('should filter the array based on the "between" condition', () => {
		const testArray2 = [1, 5, 10, 15, 20, 25, 30];
		const result = filterIt(testArray2, 'between', [10, 20]);
		expect(result).toEqual([10, 15, 20]);
	});

	it('should filter the array based on the "matches" condition with regex', () => {
		const testArray2 = ['hello', 'world', 'test123', 'abc'];
		const result = filterIt(testArray2, 'matches', /\d+/);
		expect(result).toEqual(['test123']);
	});

	it('should filter the array based on the "matches" condition with string pattern', () => {
		const testArray2 = ['hello', 'world', 'test123', 'abc'];
		const result = filterIt(testArray2, 'matches', '^test');
		expect(result).toEqual(['test123']);
	});
});
