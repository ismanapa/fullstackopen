const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({});
		response.json(blogs);
	} catch (error) {
		next(error);
	}
});

blogsRouter.post('/', async (request, response, next) => {
	try {
		const blog = new Blog(request.body);
		const newBlog = await blog.save();
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