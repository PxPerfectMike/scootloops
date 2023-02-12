export function forLoopUp(start, end, callback) {
	for (let i = start; i < end; i++) {
		() => {
			callback(i);
		};
	}
}

export function forLoopDown(start, end, callback) {
	for (let i = start; i > end; i--) {
		() => {
			callback(i);
		};
	}
}

export function forEach(array, data, callback) {
	array.forEach((element) => {
		if (element === data) {
			callback(element);
		}
	});
}

export function map(array, callback) {
	return array.map(() => {
		callback;
	});
}
