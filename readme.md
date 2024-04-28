# scootloops

![Build Status](https://github.com/PxPerfectMike/scootloops/actions/workflows/node.js.yml/badge.svg)

`scootloops` is a JavaScript library designed to simplify common looping and filtering operations. It provides a set of intuitive functions that can handle tasks such as looping through a range of numbers, filtering an array of objects based on specific criteria, or transforming an array with a mapping function.

## Installation

To install `scootloops` as a dependency in your project, run the following command:

```bash
npm install scootloops
```

## Usage

Import the library in your code:

```javascript
import { upLoop } from 'scootloops';
```

# Functions

## upLoop

Loops through a range of numbers in ascending order, from a starting number up to an ending number (exclusive), and invokes a callback function for each number in the range.

```javascript
function upLoop(start, end, callback)
```

### Parameters:

-   `start` (Number): The starting number of the range.
-   `end` (Number): The ending number of the range (exclusive).
-   `callback` (Function): A function to be called for each number in the range.

#### Example:

```javascript
// print numbers from 1 to 5
upLoop(1, 6, (i) => console.log(i));
```

## downLoop

Loops through a range of numbers in descending order, from a starting number down to an ending number (exclusive), and invokes a callback function for each number in the range.

```javascript
function downLoop(start, end, callback)

```

### Parameters:

-   `start` (Number): The starting number of the range.
-   `end` (Number): The ending number of the range (exclusive).
-   `callback` (Function): A function to be called for each number in the range.

#### Example:

```javascript
// print numbers from 5 to 1
downLoop(5, 0, (i) => console.log(i));
```

## forEach

Loops through an array and invokes a callback function for each element that matches a specific value.

```javascript
function forEach(array, data, callback)
```

### Parameters:

-   `array` (Array): The array to loop through.
-   `data` (Any): The value to match against each element in the array.
-   `callback` (Function): A function to be called for each matching element in the array.

#### Example:

```javascript
// print the value of the first element in the array that matches 3
const myArray = [1, 2, 3, 4, 5];
forEach(myArray, 3, (element) => console.log(element));
```

## mapIt

Loops through an array and applies a callback function to each element in the array, returning a new array with the results.

```javascript
function mapIt(array, callback)
```

### Parameters:

-   `array` (Array): The array to loop through.
-   `callback` (Function): A function to be called for each element in the array.

#### Example:

```javascript
// double each element in the array
const myArray = [1, 2, 3, 4, 5];
const doubledArray = mapIt(myArray, (element) => element * 2);
console.log(doubledArray); // [2, 4, 6, 8, 10]
```

## reduceIt

Reduces an array to a single value by applying a callback function to each element in the array.

```javascript
function reduceIt(array, initialValue)
```

or

```javascript
function reduceIt(array)
```

> **Note** - If no initial value is specified then the first initial value will default to 0. reduceIt can be called without the inital value argument.

### Parameters:

-   `array` (Array): The array to reduce.
-   `initialValue` (Any): The initial value to use in the reduction.

#### Example:

```javascript
// add all the elements in the array
const myArray = [1, 2, 3, 4, 5];
const sum = reduceIt(myArray);
console.log(sum); // 15
```

## filterIt

Filters an array based on specific conditions using a string that specifies a property and operator to filter by.

```javascript
function filterIt(array, condition, value)
```

### Parameters:

-   `array` (Array): The array to filter.
-   `condition` (String): A string that specifies a property and operator to filter by, in the format "propertyName.operator".
-   `value` (Any): The value to use in the filtering operation.

#### Example:

```javascript
// filter an array of objects to include only those with an age greater than 30
const myArray = [
	{ name: 'John', age: 25 },
	{ name: 'Jane', age: 35 },
	{ name: 'Bob', age: 40 },
];
const filteredArray = filterIt(myArray, 'age.greaterThan', 30);
console.log(filteredArray); // [{ name: "Jane", age: 35 }, { name: "Bob", age: 40 }]
```

### Operators for filterIt

The `filterIt` function allows you to filter an array based on specific conditions using a string that specifies a property and operator to filter by. Here is a list of all the valid operators for the `filterIt` function and what they do:

-   `'even'` - Returns true if the element is an even number.
-   `'odd'` - Returns true if the element is an odd number.
-   `'greaterThan'` - Returns true if the element is greater than the given value.
-   `'lessThan'` - Returns true if the element is less than the given value.
-   `'startsWith'` - Returns true if the element starts with the given value.
-   `'endsWith'` - Returns true if the element ends with the given value.
-   `'exactMatch'` - Returns true if the element (or the property specified by the propName argument) is an exact match to the given value.
-   `'contains'` - Returns true if the element contains the given value.
-   `'camelCase'` - Returns true if the element is a string in camelCase format.
-   `'isObject'` - Returns true if the element is an object (but not an array or null).
-   `'isClass'` - Returns true if the element is a function.
-   `'isArray'` - Returns true if the element is an array.
-   `'isNumber'` - Returns true if the element is a number.
-   `'isString'` - Returns true if the element is a string.

> **Note** - For operators that take a value (such as 'greaterThan' and 'lessThan'), you need to provide a third argument to the `filterIt` function that specifies the value to use in the filtering operation.

## Contributing

Contributions to `scootloops` are welcome! Feel free to open a pull request on the repository.

## License

`scootloops` is licensed under the MIT License
