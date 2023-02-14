# scootloops

<!-- [![Build Status](https://img.shields.io/npm/v/scootloops.svg)](https://www.npmjs.com/package/scootloops) -->

[![Build Status](https://img.shields.io/travis/user/repo/master.svg?style=flat-square)](https://travis-ci.org/PxPerfectMike/scootloops)

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
function reduceIt(array, initialValue = 0)
```

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

## Contributing

If you would like to contribute to the development of `scootloops`, feel free to open a pull request on the repository.

## License

`scootloops` is licensed under the MIT License
