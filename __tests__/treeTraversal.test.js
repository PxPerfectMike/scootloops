import { dfsIt, bfsIt } from '../src/index';

describe('Tree Traversal', () => {
	const tree = {
		value: 'root',
		children: [
			{
				value: 'A',
				children: [{ value: 'A1' }, { value: 'A2' }],
			},
			{
				value: 'B',
				children: [{ value: 'B1' }],
			},
		],
	};

	describe('dfsIt', () => {
		it('should traverse a tree in depth-first order', () => {
			const values = [];

			dfsIt(tree, (node) => {
				values.push(node.value);
			});

			expect(values).toEqual(['root', 'A', 'A1', 'A2', 'B', 'B1']);
		});

		it('should provide depth and path information', () => {
			const nodes = [];

			dfsIt(tree, (node, depth, path) => {
				nodes.push({ value: node.value, depth, path });
			});

			expect(nodes).toEqual([
				{ value: 'root', depth: 0, path: [] },
				{ value: 'A', depth: 1, path: [0] },
				{ value: 'A1', depth: 2, path: [0, 0] },
				{ value: 'A2', depth: 2, path: [0, 1] },
				{ value: 'B', depth: 1, path: [1] },
				{ value: 'B1', depth: 2, path: [1, 0] },
			]);
		});
	});

	describe('bfsIt', () => {
		it('should traverse a tree in breadth-first order', () => {
			const values = [];

			bfsIt(tree, (node) => {
				values.push(node.value);
			});

			expect(values).toEqual(['root', 'A', 'B', 'A1', 'A2', 'B1']);
		});
	});
});
