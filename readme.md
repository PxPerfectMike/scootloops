# scootloops

<!-- [![Build Status](https://img.shields.io/npm/v/scootloops.svg)](https://www.npmjs.com/package/scootloops) -->

[![Build Status](https://img.shields.io/travis/user/repo/master.svg?style=flat-square)](https://travis-ci.org/PxPerfectMike/scootloops)

A JavaScript library for simple and easy-to-use loops.

## Installation

To install 'scootloops' as a dependency in your project, run the following command:

```bash
npm install scootloops
```

## Usage

To use the loops from 'scootloops', you can import the library in your code like this:

```javascript
import { forLoopUp } from 'scootloops';
```

## forLoopUp(start, end, callback)

A simple incrementing for loop that starts from start and goes up to end. The loop runs the callback function for each iteration, passing in the current loop index as an argument.

```javascript
forLoopUp(0, 10, (i) => {
	console.log(i);
});
```

## forLoopDown(start, end, callback)

A simple decrementing for loop that starts from start and goes down to end. The loop runs the callback function for each iteration, passing in the current loop index as an argument.

```javascript
forLoopDown(10, 0, (i) => {
	console.log(i);
});
```

## forEach(array, callback)

A for-each loop that iterates over the items in an array. The loop runs the callback function for each iteration, passing in the current item as an argument.

```javascript
forEach([1, 2, 3], (item) => {
	console.log(item);
});
```

## Contributing

If you would like to contribute to the development of `scootloops`, feel free to open a pull request on the repository.

## License

`scootloops` is licensed under the MIT License
