# scootloops

![Build Status](https://github.com/PxPerfectMike/scootloops/actions/workflows/node.js.yml/badge.svg)

`scootloops` is a JavaScript utility library that provides advanced iteration patterns and utilities not directly available in native JavaScript. It offers functions for performance optimization, complex data structure traversal, advanced control flow, parallel processing, and data transformation.

## Installation

```bash
npm install scootloops
```

## Usage

```javascript
import { upLoop, times, filterIt, parallelIt, chunkIt } from 'scootloops';
```

# Core Functions

## Loop Functions

### upLoop

Loops through a range of numbers in ascending order with optional step and early exit support.

```javascript
upLoop(start, end, callback, step = 1)
```

**Parameters:**
- `start` (Number): Starting number
- `end` (Number): Ending number (exclusive)
- `callback` (Function): Function called for each iteration
- `step` (Number, optional): Increment step (default: 1)

Return `false` from callback to break early.

```javascript
// Basic usage
upLoop(1, 6, (i) => console.log(i)); // 1, 2, 3, 4, 5

// With step
upLoop(0, 10, (i) => console.log(i), 2); // 0, 2, 4, 6, 8

// Early exit
upLoop(1, 100, (i) => {
    console.log(i);
    if (i === 5) return false; // stops at 5
});
```

### downLoop

Loops through a range of numbers in descending order.

```javascript
downLoop(start, end, callback, step = 1)
```

```javascript
// Basic usage
downLoop(5, 0, (i) => console.log(i)); // 5, 4, 3, 2, 1

// With step
downLoop(20, 0, (i) => console.log(i), 3); // 20, 17, 14, 11, 8, 5, 2
```

### times

Executes a callback a specified number of times, passing the index (0-based).

```javascript
times(count, callback)
```

```javascript
// Execute 5 times
times(5, (i) => console.log(`Iteration ${i}`));

// Create array
const randoms = [];
times(10, () => randoms.push(Math.random()));

// Early exit
times(100, (i) => {
    if (i === 10) return false;
});
```

## Array Utilities

### filterIt

Filters arrays using string-based operators. Supports property access for objects.

```javascript
filterIt(array, condition, value)
```

**Basic filtering:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

filterIt(numbers, 'even'); // [2, 4, 6, 8, 10]
filterIt(numbers, 'odd'); // [1, 3, 5, 7, 9]
filterIt(numbers, 'greaterThan', 5); // [6, 7, 8, 9, 10]
filterIt(numbers, 'between', [3, 7]); // [3, 4, 5, 6, 7]
```

**Object property filtering:**
```javascript
const people = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 35 },
    { name: 'Bob', age: 40 }
];

filterIt(people, 'age.greaterThan', 30);
// [{ name: 'Jane', age: 35 }, { name: 'Bob', age: 40 }]

filterIt(people, 'name.startsWith', 'J');
// [{ name: 'John', age: 25 }, { name: 'Jane', age: 35 }]
```

**Available operators:**

*Numeric:* `even`, `odd`, `greaterThan`, `lessThan`, `between`

*String:* `startsWith`, `endsWith`, `contains`, `camelCase`, `matches` (regex)

*Type checking:* `isObject`, `isClass`, `isArray`, `isNumber`, `isString`

*Value checking:* `exactMatch`, `truthy`, `falsy`, `isEmpty`, `hasLength`

### sumIt

Sums all elements in an array with optional initial value.

```javascript
sumIt(array, initialValue = 0)
```

```javascript
sumIt([1, 2, 3, 4, 5]); // 15
sumIt([1, 2, 3], 10); // 16
```

### chunkIt

Divides an array into chunks of specified size.

```javascript
const chunks = chunkIt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
// [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

### windowIt

Creates sliding windows from an array.

```javascript
const windows = windowIt([1, 2, 3, 4, 5], 3);
// [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

// With step
const steppedWindows = windowIt([1, 2, 3, 4, 5, 6], 2, 2);
// [[1, 2], [3, 4], [5, 6]]
```

### zipIt

Zips multiple arrays into tuples.

```javascript
const zipped = zipIt([1, 2, 3], ['a', 'b', 'c'], [true, false, true]);
// [[1, 'a', true], [2, 'b', false], [3, 'c', true]]
```

# Advanced Functions

## Async Utilities

### parallelIt

Processes items in parallel with concurrency control.

```javascript
const results = await parallelIt(
    [1, 2, 3, 4, 5],
    async (item) => {
        const response = await fetch(`https://api.example.com/${item}`);
        return response.json();
    },
    2 // max 2 concurrent requests
);
```

### retryIt

Executes a function with automatic retry logic and exponential backoff.

```javascript
const result = await retryIt(
    async (attempt) => {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) throw new Error('Failed');
        return response.json();
    },
    {
        retries: 5,
        delay: 1000,
        exponential: true
    }
);
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
        concurrency: 3,
        delay: 500
    }
);
```

## Performance Optimization

### memoizeIt

Creates a memoized version of a function.

```javascript
const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

const memoizedFib = memoizeIt(fibonacci);
console.log(memoizedFib(40)); // Fast even for large numbers
```

### throttleIt

Creates a throttled function (max once per interval).

```javascript
const throttledScroll = throttleIt(() => {
    console.log('Scroll handled');
}, 200);

window.addEventListener('scroll', throttledScroll);
```

### debounceIt

Creates a debounced function (delays invocation).

```javascript
const debouncedSearch = debounceIt((query) => {
    console.log(`Searching for: ${query}`);
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

## Tree & Deep Object Utilities

### deepIt

Iterates through nested objects/arrays.

```javascript
const nestedObj = {
    a: 1,
    b: { c: 2, d: [3, 4, { e: 5 }] }
};

deepIt(nestedObj, (value, path) => {
    console.log(`${path}: ${value}`);
});
```

### dfsIt

Traverses a tree structure using depth-first search.

```javascript
const tree = {
    value: 'root',
    children: [
        { value: 'A', children: [{ value: 'A1' }, { value: 'A2' }] },
        { value: 'B', children: [{ value: 'B1' }] }
    ]
};

dfsIt(tree, (node, depth) => {
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

Composes functions left-to-right.

```javascript
const addTwo = (x) => x + 2;
const multiplyByThree = (x) => x * 3;
const square = (x) => x * x;

const calculate = pipeIt(addTwo, multiplyByThree, square);
console.log(calculate(5)); // ((5 + 2) * 3)² = 441
```

## Breaking Changes from v1.x

- **Removed `mapIt`** - Use native `array.map()` instead
- **Removed `forEach`** - Use native `array.forEach()` or `array.filter().forEach()`
- **Renamed `reduceIt` to `sumIt`** - Now only sums arrays. For custom reducers, use native `array.reduce()`
- **`upLoop` and `downLoop`** now support step parameter and early exit
- **`filterIt`** property access fixed and new operators added
- **`parallelIt`** now processes items concurrently (not sequentially)

## Contributing

Contributions are welcome! Feel free to open a pull request.

## License

MIT License
