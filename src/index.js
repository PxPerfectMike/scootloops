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

export function filterIt(array, condition, value) {
	if (!Array.isArray(array)) {
		console.error('Invalid argument: The first argument must be an array.');
		return [];
	}

	let propName;
	let operator;

	if (condition.includes('.')) {
		const conditionParts = condition.split('.');
		propName = conditionParts[0];
		operator = conditionParts[1];
	} else {
		operator = condition;
	}
	const operators = {
		even: (item) => typeof item === 'number' && item % 2 === 0,
		odd: (item) => typeof item === 'number' && item % 2 !== 0,
		greaterThan: (item) => typeof item === 'number' && item > value,
		lessThan: (item) => typeof item === 'number' && item < value,
		startsWith: (item) =>
			typeof item === 'string' && item.startsWith(value),
		endsWith: (item) => typeof item === 'string' && item.endsWith(value),
		exactMatch: (item) => item === value,
		contains: (item) => typeof item === 'string' && item.includes(value),
		camelCase: (item) =>
			typeof item === 'string' && /^[a-z]+[A-Z][a-z]*$/.test(item),
		isObject: (item) =>
			typeof item === 'object' && item !== null && !Array.isArray(item),
		isClass: (operand) => {
			try {
				// try to instantiate it. If it's a class, this will work.
				new operand();
				return true;
			} catch (error) {
				// Not a class
				return false;
			}
		},
		isArray: (item) => Array.isArray(item),
		isNumber: (item) => typeof item === 'number',
		isString: (item) => typeof item === 'string',
	};

	return array.filter((item) => {
		const operand = propName ? item[propName] : item;
		const operation = operators[operator];
		if (operation) {
			return operation(operand);
		} else {
			console.error(
				'Invalid argument: The second argument must be a string in the format of "propName.operator" or an operator'
			);
			return false;
		}
	});
}
