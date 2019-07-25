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

	describe('get blogs', () => {
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
	});

	describe('post blog', () => {
		test('Blog is created when blog is posted', async () => {

			const newBlog = {
				title: 'newBlog',
				author: 'newAuthor',
				url: 'new url',
				likes: 300,
			};

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const currentBlogs = await api.get('/api/blogs');
			
			expect(currentBlogs.body.length).toBe(initialBlogs.length + 1);

			const titles = currentBlogs.body.map(n => n.title);
			expect(titles).toContain(newBlog.title);
		});
	});


	afterAll(() => {
		mongoose.connection.close();
	});

});