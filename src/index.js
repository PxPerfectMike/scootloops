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
	return array.map(callback);
}

export function reduceIt(array, initialValue = 0) {
	return array.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initialValue
	);
}

function checkType(item, type) {
	return typeof item === type;
}

export function filterIt(array, condition, value) {
	if (!Array.isArray(array)) {
		throw new Error(
			'Invalid argument: The first argument must be an array.'
		);
	}

	let operator;

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
		isObject: (item) =>
			checkType(item, 'object') && item !== null && !Array.isArray(item),
		isClass: (item) =>
			typeof item === 'object' && !!item.constructor.prototype,
		isArray: (item) => Array.isArray(item),
		isNumber: (item) => checkType(item, 'number'),
		isString: (item) => checkType(item, 'string'),
	};

	return array.filter((item) => {
		const operation = operators[operator];
		if (operation) {
			return operation(item);
		} else {
			throw new Error(
				'Invalid argument: The second argument must be a string in the format of "propName.operator" or an operator'
			);
		}
	});
}
