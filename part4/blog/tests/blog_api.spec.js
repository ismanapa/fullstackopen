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
			.map(blog => new Blog(blog));
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

		test('Blogs likes equals 0 when property is missing in body', async () => {
			const newBlog = {
				title: 'newBlog',
				author: 'newAuthor',
				url: 'new url',
			};

			const result = await api
				.post('/api/blogs')
				.send(newBlog);

			expect(result.body.likes).toBe(0);
		});

		test('Bad request is returned when title is missing in body', async () => {
			const newBlog = {
				author: 'newAuthor',
				url: 'new url',
			};

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400);
		});

		test('Bad request is returned when url is missing in body', async () => {
			const newBlog = {
				title: 'newTitle',
				author: 'newAuthor',
			};

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400);
		});
	});

	describe('delete blog', () => {
		
		test('Delete blog by id', async () => {
			const blogsAtStart = await api.get('/api/blogs');
			const blog = blogsAtStart.body[0];

			await api
				.delete(`/api/blogs/${blog.id}`)
				.expect(204);

			const blogsAtEnd = await api.get('/api/blogs');

			expect(blogsAtEnd.body.length).toBe(blogsAtStart.body.length - 1);
			
			const titles = blogsAtEnd.body.map(b => b.title);

			expect(titles).not.toContain(blog.title);
		});

	});

	afterAll(() => {
		mongoose.connection.close();
	});

});