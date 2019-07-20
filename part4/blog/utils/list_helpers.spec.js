const listHelper = require('./list_helpers');

test('dummy returns one', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});