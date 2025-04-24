// Original functions with improvements
export function upLoop(start, end, callback) {
	for (let i = start; i < end; i++) {
		callback(i);
	}
}

export function downLoop(start, end, callback) {
	for (let i = start; i > end; i--) {
		callback(i);
	}
}

// Enhanced forEach that accepts a predicate function or value
export function forEach(array, matcher, callback) {
	const predicate =
		typeof matcher === 'function'
			? matcher
			: (element) => element === matcher;

	array.forEach((element, index, arr) => {
		if (predicate(element, index, arr)) {
			// Only pass the element to match test expectations
			callback(element);
		}
	});
}

export function mapIt(array, callback) {
	return array.map(callback);
}

// Enhanced reduceIt to accept a custom reducer function
export function reduceIt(array, reducerOrInitial, initialValue) {
	// Handle different parameter combinations
	if (typeof reducerOrInitial === 'function') {
		return array.reduce(reducerOrInitial, initialValue);
	}
	// Original behavior: sum with optional initial value
	// If reducerOrInitial is undefined, use 0 as default
	const initValue = reducerOrInitial === undefined ? 0 : reducerOrInitial;
	return array.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initValue
	);
}

// Fixed checkType function to correctly check specific types
function checkType(item, type) {
	switch (type) {
		case 'number':
			return typeof item === 'number';
		case 'string':
			return typeof item === 'string';
		case 'object':
			return (
				typeof item === 'object' &&
				item !== null &&
				!Array.isArray(item)
			);
		case 'boolean':
			return typeof item === 'boolean';
		case 'function':
			return typeof item === 'function';
		case 'undefined':
			return typeof item === 'undefined';
		case 'symbol':
			return typeof item === 'symbol';
		case 'bigint':
			return typeof item === 'bigint';
		default:
			throw new TypeError('Invalid type specified');
	}
}
export function filterIt(array: unknown[], condition: string, value?: unknown) {
	if (!Array.isArray(array)) {
		throw new Error(
			'Invalid argument: The first argument must be an array.'
		);
	}

	let operator: string;

	if (condition.includes('.')) {
		const conditionParts = condition.split('.');
		operator = conditionParts[1];
	} else {
		operator = condition;
	}

	const operators = {
		even: (item) => checkType(item, 'number') && item % 2 === 0,
		odd: (item) => checkType(item, 'number') && item % 2 !== 0,
		greaterThan: (item) => checkType(item, 'number') && item > value,
		lessThan: (item) => checkType(item, 'number') && item < value,
		startsWith: (item) =>
			checkType(item, 'string') && item.startsWith(value),
		endsWith: (item) => checkType(item, 'string') && item.endsWith(value),
		exactMatch: (item) => item === value,
		contains: (item) => checkType(item, 'string') && item.includes(value),
		camelCase: (item) =>
			checkType(item, 'string') && /^[a-z]+[A-Z][a-z]*$/.test(item),
		isObject: (item) => checkType(item, 'object'),
		isClass: (item) =>
			typeof item === 'object' &&
			item !== null &&
			Object.getPrototypeOf(item) !== Object.prototype,
		isArray: (item) => Array.isArray(item),
		isNumber: (item) => checkType(item, 'number'),
		isString: (item) => checkType(item, 'string'),
	};

	return array.filter((item) => {
		const operation = operators[operator];
		if (operation) {
			return operation(item);
		}
		throw new Error(
			'Invalid argument: The second argument must be a string in the format of "propName.operator" or an operator'
		);
	});
} // NEW ADVANCED FUNCTIONS

/**
 * Divides an array into batches/chunks of the specified size
 * @param {Array} array - The array to divide into chunks
 * @param {Number} size - The size of each chunk
 * @returns {Array} An array of chunks, each being an array
 */
export function chunkIt(array, size) {
	return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
		array.slice(index * size, (index + 1) * size)
	);
}

/**
 * Processes items in parallel using Promise.all, with concurrency limit
 * @param {Array} items - The items to process
 * @param {Function} asyncFn - Async function to apply to each item
 * @param {Number} concurrency - Max number of concurrent operations
 * @returns {Promise<Array>} Results of processing all items
 */
export async function parallelIt(
	items,
	asyncFn,
	concurrency = Number.POSITIVE_INFINITY
) {
	if (!concurrency || concurrency < 1) {
		throw new Error('Concurrency must be a positive number');
	}

	if (concurrency === Number.POSITIVE_INFINITY) {
		return Promise.all(items.map((item) => asyncFn(item)));
	}

	const chunks = chunkIt(items, concurrency);
	const results = [];

	for (const chunk of chunks) {
		const chunkResults = await Promise.all(
			chunk.map((item) => asyncFn(item))
		);
		results.push(...chunkResults);
	}

	return results;
}

/**
 * Attempts to execute a function with retry logic
 * @param {Function} fn - The function to execute
 * @param {Object} options - Options for retry behavior
 * @param {Number} options.retries - Number of retries (default: 3)
 * @param {Number} options.delay - Base delay in ms (default: 300)
 * @param {Boolean} options.exponential - Whether to use exponential backoff (default: true)
 * @returns {Promise} Result of the function execution
 */
export async function retryIt(fn, options = {}) {
	const { retries = 3, delay = 300, exponential = true } = options;
	let lastError: unknown;

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			return await fn(attempt);
		} catch (error) {
			lastError = error;

			if (attempt < retries) {
				const waitTime = exponential ? delay * 2 ** attempt : delay;

				await new Promise((resolve) => setTimeout(resolve, waitTime));
			}
		}
	}

	throw lastError;
}

/**
 * Iterates through nested objects/arrays and applies a callback to each value
 * @param {Object|Array} obj - The object or array to iterate through
 * @param {Function} callback - Function to call on each value (receives value, path, and original object)
 * @param {String} [currentPath=''] - Internal parameter to track the current path
 */
export function deepIt(obj, callback, currentPath = '') {
	if (obj === null || typeof obj !== 'object') {
		callback(obj, currentPath, obj);
		return;
	}

	for (const [key, value] of Object.entries(obj)) {
		const path = currentPath ? `${currentPath}.${key}` : key;

		callback(value, path, obj);

		if (value !== null && typeof value === 'object') {
			deepIt(value, callback, path);
		}
	}
}

/**
 * Creates sliding windows of the specified size from an array
 * @param {Array} array - The array to create windows from
 * @param {Number} size - The size of each window
 * @param {Number} [step=1] - The number of elements to slide the window by
 * @returns {Array} An array of windows, each being an array
 */
export function windowIt(array, size, step = 1) {
	if (size > array.length) {
		return [];
	}

	const windows = [];
	for (let i = 0; i <= array.length - size; i += step) {
		windows.push(array.slice(i, i + size));
	}

	return windows;
}

/**
 * Zips together multiple arrays into a single array of tuples
 * @param {...Array} arrays - The arrays to zip together
 * @returns {Array} An array of tuples, where each tuple contains elements from each input array
 */
export function zipIt(...arrays) {
	const minLength = Math.min(...arrays.map((array) => array.length));
	const result = [];

	for (let i = 0; i < minLength; i++) {
		result.push(arrays.map((array) => array[i]));
	}

	return result;
}

/**
 * Creates a memoized version of a function
 * @param {Function} fn - The function to memoize
 * @param {Function} [keyFn] - Optional function to generate cache keys
 * @returns {Function} Memoized function
 */
export function memoizeIt(fn, keyFn = (...args) => JSON.stringify(args)) {
	const cache = new Map();

	return function (...args) {
		const key = keyFn(...args);

		if (cache.has(key)) {
			return cache.get(key);
		}

		const result = fn.apply(this, args);
		cache.set(key, result);

		return result;
	};
}

/**
 * Traverses a tree structure using depth-first search (DFS)
 * @param {Object} tree - The root of the tree
 * @param {Function} callback - Function to call on each node
 * @param {Object} options - Options for traversal
 * @param {String} options.childrenKey - The property name for children (default: 'children')
 */
export function dfsIt(tree, callback, options = {}) {
	const { childrenKey = 'children' } = options;

	function traverse(node, depth = 0, path = []) {
		if (!node) return;

		callback(node, depth, path);

		const children = node[childrenKey] || [];
		children.forEach((child, index) => {
			traverse(child, depth + 1, [...path, index]);
		});
	}

	traverse(tree);
}

/**
 * Traverses a tree structure using breadth-first search (BFS)
 * @param {Object} tree - The root of the tree
 * @param {Function} callback - Function to call on each node
 * @param {Object} options - Options for traversal
 * @param {String} options.childrenKey - The property name for children (default: 'children')
 */
export function bfsIt(tree, callback, options = {}) {
	const { childrenKey = 'children' } = options;

	if (!tree) return;

	const queue = [{ node: tree, depth: 0, path: [] }];

	while (queue.length > 0) {
		const { node, depth, path } = queue.shift();

		callback(node, depth, path);

		const children = node[childrenKey] || [];
		children.forEach((child, index) => {
			queue.push({
				node: child,
				depth: depth + 1,
				path: [...path, index],
			});
		});
	}
}

/**
 * Creates a throttled function that invokes at most once per specified interval
 * @param {Function} fn - The function to throttle
 * @param {Number} wait - The number of milliseconds to throttle invocations to
 * @returns {Function} The throttled function
 */
export function throttleIt(fn, wait) {
	let lastCall = 0;
	let timeout = null;
	let lastArgs = null;

	return function (...args) {
		const now = Date.now();
		const timeSinceLastCall = now - lastCall;

		lastArgs = args;

		if (timeSinceLastCall >= wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}

			lastCall = now;
			return fn.apply(this, args);
		}

		if (!timeout) {
			timeout = setTimeout(() => {
				lastCall = Date.now();
				timeout = null;
				fn.apply(this, lastArgs);
			}, wait - timeSinceLastCall);
		}
	};
}

/**
 * Creates a debounced function that delays invoking until after wait milliseconds
 * @param {Function} fn - The function to debounce
 * @param {Number} wait - The number of milliseconds to delay
 * @param {Boolean} immediate - Whether to invoke at the beginning of the wait period
 * @returns {Function} The debounced function
 */
export function debounceIt(fn, wait, immediate = false) {
	let timeout = null;

	return function (...args) {
		const callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(() => {
			timeout = null;
			if (!immediate) fn.apply(this, args);
		}, wait);

		if (callNow) fn.apply(this, args);
	};
}

/**
 * Creates a function that is the composition of the provided functions
 * @param {...Function} fns - The functions to compose
 * @returns {Function} A new function that is the composition of the input functions
 */
export function pipeIt(...fns) {
	return (input) => fns.reduce((result, fn) => fn(result), input);
}

/**
 * Async iterator with controlled concurrency
 * @param {Array} items - The items to process
 * @param {Function} asyncFn - Async function to apply to each item
 * @param {Object} options - Options for the iterator
 * @returns {Promise<Array>} Results of processing all items
 */
export async function asyncIterateIt(items, asyncFn, options = {}) {
	const { concurrency = 1, delay = 0 } = options;
	const results = [];
	const pending = new Set();

	async function processItem(item, index) {
		try {
			const result = await asyncFn(item, index);
			results[index] = result;
		} finally {
			pending.delete(index);
		}
	}

	for (let i = 0; i < items.length; i++) {
		// Wait if we've reached max concurrency
		while (pending.size >= concurrency) {
			await Promise.race([
				new Promise((resolve) => setTimeout(resolve, 10)),
				...Array.from(pending).map((p) => Promise.resolve(p)),
			]);
		}

		// Add to pending operations
		pending.add(i);

		// Process item (don't await here to allow concurrency)
		const itemPromise = processItem(items[i], i);

		// Add delay if specified
		if (delay > 0 && i < items.length - 1) {
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	// Wait for all pending operations to complete
	while (pending.size > 0) {
		await Promise.race([
			new Promise((resolve) => setTimeout(resolve, 10)),
			...Array.from(pending).map((p) => Promise.resolve(p)),
		]);
	}

	return results;
}
