const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
		response.json(blogs);
	} catch (error) {
		next(error);
	}
});

blogsRouter.post('/', async (request, response, next) => {
	try {
		const users = await User.find({});
		const creationUser = users[0];

		const blog = new Blog({
			...request.body,
			user: creationUser.id
		});
		const newBlog = await blog.save();

		creationUser.blogs = creationUser.blogs.concat(newBlog);
		await creationUser.save();

		response.status(201).json(newBlog);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		await Blog.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

blogsRouter.put('/:id', async (request, response, next) => {
	try {
		const blogToUpdate = await Blog.findById(request.params.id);
		const dataToUpdate = {
			likes: blogToUpdate.likes + 1,
		};

		const updatedBlog = await Blog.findByIdAndUpdate(
			request.params.id,
			dataToUpdate,
			{ new: true },
		);
		response.json(updatedBlog);
	} catch (exception) {
		next(exception);
	}
});


module.exports = blogsRouter;