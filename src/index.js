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

export function forEach(array, data, callback) {
	array.forEach((element) => {
		if (element === data) {
			callback(element);
		}
	});
}

export function mapIt(array, callback) {
	return array.map((element) => callback(element));
}

// invoking reduceIt without initialValue will default to 0
function reduceIt(array, initialValue = 0) {
	return array.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initialValue
	);
}

function filterIt(array, condition) {
	let callback;
	if (typeof condition === 'string') {
		switch (condition) {
			case 'even':
				callback = (num) => num % 2 === 0;
				break;
			case 'odd':
				callback = (num) => num % 2 !== 0;
				break;
			case 'greaterThan':
				callback = (num) => num > condition.split('(')[1].split(')')[0];
				break;
			case 'lessThan':
				callback = (num) => num > condition.split('(')[1].split(')')[0];
				break;
			case 'startsWith':
				callback = (str) =>
					str.startsWith(condition.split('(')[1].split(')')[0]);
				break;
			case 'length':
				callback = (str) =>
					str.length === condition.split('(')[1].split(')')[0];
				break;
			case 'contains':
				callback = (str) => str.includes(condition.split('(')[1].split(')')[0]);
				break;
			case 'endsWith':
				callback = (str) => str.endsWith(condition.split('(')[1].split(')')[0]);
				break;
			default:
				throw new Error(`Invalid filter condition: ${condition}`);
		}
	} else {
		callback = condition;
	}
	return array.filter(callback);
}

filterIt([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'even'); // [2, 4, 6, 8, 10]
