const blogs = [
	{
		title: 'test blog 1',
		id: 1,
		user: {
			_id: '5a437a9e514ab7f168ddf138',
			username: 'mluukkai',
			name: 'Matti Luukkainen'
		}
	},
	{
		title: 'test blog 2',
		id: 2,
		user: {
			_id: '5a437a9e514ab7f168ddf138',
			username: 'mluukkai',
			name: 'Matti Luukkainen'
		}
	},

];

const setToken = () => {};

const getAll = () => {
	return Promise.resolve(blogs);
};

export default { getAll , setToken};