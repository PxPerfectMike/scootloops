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

export function forEach(array, callback) {
	array.forEach(() => {
		callback;
	});
}

export function map(array, callback) {
	return array.map(() => {
		callback;
	});
}
