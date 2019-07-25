const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
	{
		title: 'test blog 1',
		author: 'test author 1',
		url: 'test url 1',
		likes: 100,
	},
	{
		title: 'test blog 2',
		author: 'test author 2',
		url: 'test url 2',
		likes: 200,
	},
	{
		title: 'test blog 3',
		author: 'test author 3',
		url: 'test url 3',
		likes: 300,
	}
];

describe('blog api', () => {

	beforeEach(async () => {
		await Blog.deleteMany({});

		const blogObjects = initialBlogs
			.map(blog => new Blog(blog))
		const promiseArray = blogObjects.map(blog => blog.save());

		await Promise.all(promiseArray);

	});

	test('Blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('All blogs are returned', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body.length).toBe(initialBlogs.length);
	});

	test('Blog has id property', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body[0].id).toBeDefined();
	});

	afterAll(() => {
		mongoose.connection.close();
	});

});