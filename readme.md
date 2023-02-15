# scootloops

![Build Status](https://github.com/PxPerfectMike/scootloops/actions/workflows/node.js.yml/badge.svg)

Do you ever get tired of writing the same looping logic over and over again in your JavaScript code? Do you find yourself struggling with complex loops and filtering operations that take up too much of your time and mental energy? If so, then you need a simple and easy-to-use solution that can simplify your coding tasks and free up your creative energy.

That's where scootloops comes in. This JavaScript library provides a set of intuitive and straightforward functions that can handle the most common looping tasks and filtering operations with ease. Whether you need to loop through a range of numbers, filter an array of objects based on specific criteria, or transform an array with a mapping function, this library has got you covered.

With this library, you can say goodbye to the headache of writing complicated loops and filtering operations from scratch. Instead, you can focus on what you do best: writing clean and readable code that expresses your ideas with clarity and precision.

So why wait? Install scootloops today and see how much easier your coding tasks can become.

## Installation

To install 'scootloops' as a dependency in your project, run the following command:

```bash
npm install scootloops
```

## Usage

To use the loops from 'scootloops', you can import the library in your code like this:

```javascript
import { upLoop } from 'scootloops';
```

> ## upLoop

The `upLoop` function loops through a range of numbers in ascending order, from a starting number up to an ending number (not including the ending number), and invokes a callback function for each number in the range.

```javascript
function upLoop(start, end, callback)
```

### Parameters:

- start - The starting number of the range
- end - The ending number of the range (not included in the loop)
- callback - A function to be called for each number in the range

#### Example:

```javascript
// print numbers from 1 to 5
upLoop(1, 6, (i) => console.log(i));
```

> ## downLoop

The `downLoop` function loops through a range of numbers in descending order, from a starting number down to an ending number (not including the ending number), and invokes a callback function for each number in the range.

```javascript
function downLoop(start, end, callback)

```

### Parameters:

- start - The starting number of the range
- end - The ending number of the range (not included in the loop)
- callback - A function to be called for each number in the range

#### Example:

```javascript
// print numbers from 5 to 1
downLoop(5, 0, (i) => console.log(i));
```

> ## forEach

The `forEach` function loops through an array and invokes a callback function for each element that matches a specific value.

```javascript
function forEach(array, data, callback)
```

### Parameters:

- array - The array to loop through
- data - The value to match against each element in the array
- callback - A function to be called for each matching element in the array

#### Example:

```javascript
// print the value of the first element in the array that matches 3
const myArray = [1, 2, 3, 4, 5];
forEach(myArray, 3, (element) => console.log(element));
```

> ## mapIt

The `mapIt` function loops through an array and applies a callback function to each element in the array, returning a new array with the results.

```javascript
function mapIt(array, callback)
```

### Parameters:

- array - The array to loop through
- callback - A function to be called for each element in the array

#### Example:

```javascript
// double each element in the array
const myArray = [1, 2, 3, 4, 5];
const doubledArray = mapIt(myArray, (element) => element * 2);
console.log(doubledArray); // [2, 4, 6, 8, 10]
```

> ## reduceIt

The `reduceIt` function reduces an array to a single value by applying a callback function to each element in the array.

```javascript
function reduceIt(array, initialValue)
```

or

```javascript
function reduceIt(array)
```

> **Note** - If no initial value is specified then the first initial value will default to 0. reduceIt can be called without the inital value argument.

### Parameters:

- array - The array to reduce
- initialValue - The initial value to use in the reduction

#### Example:

```javascript
// add all the elements in the array
const myArray = [1, 2, 3, 4, 5];
const sum = reduceIt(myArray);
console.log(sum); // 15
```

> ## filterIt

The `filterIt` function filters an array based on specific conditions using a string that specifies a property and operator to filter by.

```javascript
function filterIt(array, condition, value)
```

### Parameters:

- array - The array to filter
- condition - A string that specifies a property and operator to filter by, in the format "propertyName.operator"
- value - The value to use in the filtering operation

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

Click [here](#filter-usage-examples) for a few more examples of how to use the filterIt function.

### List of Operators for the filterIt function

The filterIt function allows you to filter an array based on specific conditions using a string that specifies a property and operator to filter by. Here is a list of all the valid operators for the filterIt function and what they do:

- `'even'` - Returns true if the element is an even number.
- `'odd'` - Returns true if the element is an odd number.
- `'greaterThan'` - Returns true if the element is greater than the given value.
- `'lessThan'` - Returns true if the element is less than the given value.
- `'startsWith'` - Returns true if the element starts with the given value.
- `'endsWith'` - Returns true if the element ends with the given value.
- `'exactMatch'` - Returns true if the element (or the property specified by the propName argument) is an exact match to the given value.
- `'contains'` - Returns true if the element contains the given value.
- `'camelCase'` - Returns true if the element is a string in camelCase format.
- `'isObject'` - Returns true if the element is an object (but not an array or null).
- `'isClass'` - Returns true if the element is a function.
- `'isArray'` - Returns true if the element is an array.
- `'isNumber'` - Returns true if the element is a number.
- `'isString'` - Returns true if the element is a string.<br />

> ## Note that for operators that take a value (such as 'greaterThan' and 'lessThan'), you need to provide a third argument to the filterIt function that specifies the value to use in the filtering operation.

## **filterIt Usage Examples**

### Example 1: Filter an array of numbers to include only even numbers

```javascript
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const filteredArray = filterIt(myArray, 'even');
console.log(filteredArray); // [2, 4, 6, 8, 10]
```

### Example 2: Filter an array of objects to include only those with a property value greater than 5

```javascript
const myArray = [
	{ name: 'John', age: 25 },
	{ name: 'Jane', age: 35 },
	{ name: 'Bob', age: 40 },
];
const filteredArray = filterIt(myArray, 'age.greaterThan', 5);
console.log(filteredArray); // [{ name: "Jane", age: 35 }, { name: "Bob", age: 40 }]
```

### Example 3: Filter an array of strings to include only those that start with "A"

```javascript
const myArray = ['Apple', 'Banana', 'Apricot', 'Cherry', 'Avocado'];
const filteredArray = filterIt(myArray, 'startsWith', 'A');
console.log(filteredArray); // ["Apple", "Apricot", "Avocado"]
```

### Example 4: Filter an array of objects to include only those that have a property value in camelCase format

```javascript
const myArray = [
	{ name: 'John Doe', email: 'john.doe@example.com' },
	{ name: 'Jane Smith', email: 'jane.smith@example.com' },
	{ name: 'Bob Brown', email: 'bob.brown@example.com' },
	{ name: 'Anne-Marie Black', email: 'anne-marie.black@example.com' },
];
const filteredArray = filterIt(myArray, 'name.camelCase');
console.log(filteredArray); // [{ name: "John Doe", email: "john.doe@example.com" }, { name: "Bob Brown", email: "bob.brown@example.com" }]
```

### Example 5: Filter an array of objects to include only those that are of type "object"

```javascript
const myArray = [
	{ name: 'John', age: 25 },
	{ name: 'Jane', age: 35 },
	'Bob',
	123,
	null,
	{ name: 'Mary', age: 45 },
];
const filteredArray = filterIt(myArray, 'isObject');
console.log(filteredArray); // [{ name: "John", age: 25 }, { name: "Jane", age: 35 }, { name: "Mary", age: 45 }]
```

---

## Contributing

If you would like to contribute to the development of `scootloops`, feel free to open a pull request on the repository.

## License

`scootloops` is licensed under the MIT License
