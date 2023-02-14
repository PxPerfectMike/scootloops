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

export function filterIt(array, condition, value) {
	if (!Array.isArray(array)) {
		console.error('Invalid argument: The first argument must be an array.');
		return;
	}

	let propName, operator;
	const conditionParts = condition.split('.');
	if (conditionParts.length === 1) {
		operator = condition;
	} else if (conditionParts.length === 2) {
		propName = conditionParts[0];
		operator = conditionParts[1];
	} else {
		console.error(
			'Invalid argument: The second argument must be a string in the format of "propName.operator"'
		);
		return;
	}

	const validOperators = [
		'even',
		'odd',
		'greaterThan',
		'lessThan',
		'startsWith',
		'endsWith',
		'exactMatch',
		'contains',
		'camelCase',
		'isObject',
		'isClass',
		'isArray',
		'isNumber',
		'isString',
	];

	if (!validOperators.includes(operator)) {
		console.error(
			'Invalid argument: The second argument must be a string in the format of "propName.operator"'
		);
		return;
	}

	const filteredArray = array.filter((item) => {
		if (propName && item[propName] === undefined) {
			return false;
		}
		switch (operator) {
			case 'even':
				return item % 2 === 0;
			case 'odd':
				return item % 2 !== 0;
			case 'greaterThan':
				return item > value;
			case 'lessThan':
				return item < value;
			case 'startsWith':
				return item.startsWith(value);
			case 'endsWith':
				return item.endsWith(value);
			case 'exactMatch':
				return propName ? item[propName] === value : item === value;
			case 'contains':
				return item.includes(value);
			case 'camelCase':
				return /^[a-z]+[A-Z][a-z]*$/.test(item);

			case 'isObject':
				return (
					typeof item === 'object' && item !== null && !Array.isArray(item)
				);
			case 'isClass':
				return typeof item === 'function';
			case 'isArray':
				return Array.isArray(item);
			case 'isNumber':
				return typeof item === 'number';
			case 'isString':
				return typeof item === 'string';
			default:
				console.error(
					'Invalid argument: The second argument must be a string in the format of "propName.operator"'
				);
				return;
		}
	});

	return filteredArray;
}
