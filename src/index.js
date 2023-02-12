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
export function reduceIt(array, initialValue = 0) {
	return array.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initialValue
	);
}

export function filterIt(array, condition) {
	if (!array) {
		throw new Error('Invalid argument: The first argument must be an array.');
	}

	let filteredArray = [];

	const conditionParts = condition.split('.');
	const propName = conditionParts[0];
	let operator;
	let value;
	if (conditionParts[1].includes('(')) {
		operator = conditionParts[1].split('(')[0];
		value = parseInt(conditionParts[1].split('(')[1].replace(')', ''));
	} else {
		operator = conditionParts[1];
		value = conditionParts[2];
	}

	filteredArray = array.filter((item) => {
		if (item[propName] === undefined) {
			return false;
		}
		switch (operator) {
			case 'even':
				return item[propName] % 2 === 0;
			case 'odd':
				return item[propName] % 2 !== 0;
			case 'greaterThan':
				return item[propName] > value;
			case 'lessThan':
				return item[propName] < value;
			case 'startsWith':
				return item[propName].startsWith(value);
			case 'endsWith':
				return item[propName].endsWith(value);
			case 'exactMatch':
				return item[propName] === value;
			case 'contains':
				return item[propName].includes(value);
			case 'camelCase':
				return item[propName].match(/^[a-z]+([A-Z][a-z]+)*$/);
			case 'isObject':
				return typeof item[propName] === 'object';
			case 'isClass':
				return typeof item[propName] === 'function';
			case 'isArray':
				return Array.isArray(item[propName]);
			case 'isNumber':
				return typeof item[propName] === 'number';
			case 'isString':
				return typeof item[propName] === 'string';
			default:
				throw new Error(
					'Invalid argument: The second argument must be one of the accepted conditions.'
				);
		}
	});

	return filteredArray;
}
