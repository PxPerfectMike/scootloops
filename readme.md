# scootloops

![Build Status](https://github.com/PxPerfectMike/scootloops/actions/workflows/node.js.yml/badge.svg)

`scootloops` is a JavaScript utility library that goes beyond simple looping and filtering to provide advanced iteration patterns and utilities that aren't directly available in native JavaScript. It offers a comprehensive set of functions for performance optimization, complex data structure traversal, advanced control flow, parallel processing, and data transformation.

## Installation

To install `scootloops` as a dependency in your project, run the following command:

```bash
npm install scootloops
```

## Usage

Import any function from the library in your code:

```javascript
import { upLoop, chunkIt, parallelIt } from 'scootloops';
```

# Basic Functions

## upLoop

Loops through a range of numbers in ascending order, from a starting number up to an ending number (exclusive), and invokes a callback function for each number in the range.

```javascript
upLoop(1, 6, (i) => console.log(i)); // prints 1 2 3 4 5
```

## downLoop

Loops through a range of numbers in descending order, from a starting number down to an ending number (exclusive), and invokes a callback function for each number in the range.

```javascript
downLoop(5, 0, (i) => console.log(i)); // prints 5 4 3 2 1
```

## forEach

Loops through an array and invokes a callback function for each element that matches a specific value or predicate function.

```javascript
// Use with a value to match
forEach([1, 2, 3, 4, 5], 3, (element) => console.log(element)); // prints 3

// Use with a predicate function
forEach(
	[1, 2, 3, 4, 5],
	(x) => x > 3,
	(element) => console.log(element)
); // prints 4 5
```

## mapIt

Maps each element in an array using a callback function, returning a new array with the results.

```javascript
const doubled = mapIt([1, 2, 3, 4, 5], (element) => element * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

## reduceIt

Reduces an array to a single value. Can be used in two ways:

1. With the original behavior (summing with an optional initial value):

```javascript
const sum = reduceIt([1, 2, 3, 4, 5]); // 15
const sumWithInitial = reduceIt([1, 2, 3], 10); // 16
```

2. With a custom reducer function:

```javascript
const product = reduceIt([1, 2, 3, 4, 5], (acc, val) => acc * val, 1); // 120
```

## filterIt

Filters an array based on specific conditions using a string that specifies a property and operator to filter by.

```javascript
// Filter objects with age greater than 30
const filteredArray = filterIt(
	[
		{ name: 'John', age: 25 },
		{ name: 'Jane', age: 35 },
		{ name: 'Bob', age: 40 },
	],
	'age.greaterThan',
	30
);
// [{ name: "Jane", age: 35 }, { name: "Bob", age: 40 }]

// Filter for even numbers
const evens = filterIt([1, 2, 3, 4, 5, 6], 'even');
// [2, 4, 6]
```

# Advanced Functions

## Data Processing

### chunkIt

Divides an array into chunks of the specified size.

```javascript
const chunks = chunkIt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

### windowIt

Creates sliding windows of the specified size from an array.

```javascript
const windows = windowIt([1, 2, 3, 4, 5], 3);
console.log(windows); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

// With step parameter
const steppedWindows = windowIt([1, 2, 3, 4, 5, 6], 2, 2);
console.log(steppedWindows); // [[1, 2], [3, 4], [5, 6]]
```

### zipIt

Zips together multiple arrays into a single array of tuples.

```javascript
const zipped = zipIt([1, 2, 3], ['a', 'b', 'c'], [true, false, true]);
console.log(zipped); // [[1, 'a', true], [2, 'b', false], [3, 'c', true]]
```

## Async Utilities

### parallelIt

Processes items in parallel with a concurrency limit.

```javascript
const results = await parallelIt(
	[1, 2, 3, 4, 5],
	async (item) => {
		const response = await fetch(`https://api.example.com/${item}`);
		return response.json();
	},
	2 // Limit to 2 concurrent requests
);
```

### retryIt

Executes a function with automatic retry logic and exponential backoff.

```javascript
try {
	const result = await retryIt(
		async (attempt) => {
			console.log(`Attempt ${attempt}`);
			const response = await fetch('https://api.example.com/data');
			if (!response.ok) throw new Error('Failed to fetch');
			return response.json();
		},
		{
			retries: 5,
			delay: 1000,
			exponential: true,
		}
	);
	console.log(result);
} catch (error) {
	console.error('All retries failed:', error);
}
```

### asyncIterateIt

Processes items asynchronously with controlled concurrency and optional delays.

```javascript
const results = await asyncIterateIt(
	urls,
	async (url) => {
		const response = await fetch(url);
		return response.json();
	},
	{
		concurrency: 3, // Process 3 at a time
		delay: 500, // 500ms delay between starting each item
	}
);
```

## Performance Optimization

### memoizeIt

Creates a memoized version of a function for efficient caching of results.

```javascript
const calculateFibonacci = (n) => {
	if (n <= 1) return n;
	return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};

const memoizedFibonacci = memoizeIt(calculateFibonacci);
console.log(memoizedFibonacci(40)); // Fast even for large numbers
```

### throttleIt

Creates a throttled function that invokes at most once per specified interval.

```javascript
const throttledScroll = throttleIt(() => {
	console.log('Scroll event handled');
	// Expensive DOM operations
}, 200);

window.addEventListener('scroll', throttledScroll);
```

### debounceIt

Creates a debounced function that delays invoking until after wait milliseconds have elapsed since the last invocation.

```javascript
const debouncedSearch = debounceIt((query) => {
	console.log(`Searching for: ${query}`);
	// API call
}, 300);

searchInput.addEventListener('input', (e) => {
	debouncedSearch(e.target.value);
});
```

## Tree & Deep Object Utilities

### deepIt

Iterates through nested objects/arrays and applies a callback to each value.

```javascript
const nestedObj = {
	a: 1,
	b: {
		c: 2,
		d: [3, 4, { e: 5 }],
	},
};

deepIt(nestedObj, (value, path) => {
	console.log(`${path}: ${value}`);
});
// Outputs:
// a: 1
// b: [object Object]
// b.c: 2
// b.d: 3,4,[object Object]
// b.d.0: 3
// b.d.1: 4
// b.d.2: [object Object]
// b.d.2.e: 5
```

### dfsIt

Traverses a tree structure using depth-first search.

```javascript
const tree = {
	value: 'root',
	children: [
		{
			value: 'A',
			children: [{ value: 'A1' }, { value: 'A2' }],
		},
		{
			value: 'B',
			children: [{ value: 'B1' }],
		},
	],
};

dfsIt(tree, (node, depth, path) => {
	console.log(`${depth}: ${node.value}`);
});
// Output: 0: root, 1: A, 2: A1, 2: A2, 1: B, 2: B1
```

### bfsIt

Traverses a tree structure using breadth-first search.

```javascript
bfsIt(tree, (node) => {
	console.log(node.value);
});
// Output: root, A, B, A1, A2, B1
```

## Functional Programming

### pipeIt

Creates a function that is the composition of the provided functions, executing them from left to right.

```javascript
const addTwo = (x) => x + 2;
const multiplyByThree = (x) => x * 3;
const square = (x) => x * x;

const calculate = pipeIt(addTwo, multiplyByThree, square);

console.log(calculate(5)); // ((5 + 2) * 3)² = 441
```

## Contributing

Contributions to `scootloops` are welcome! Feel free to open a pull request on the repository.

## License

`scootloops` is licensed under the MIT License
