const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

const getTokenFrom = request => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

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
		const token = getTokenFrom(request);

		const decodedToken = jwt.verify(token, process.env.SECRET);

		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}

		const user = await User.findById(decodedToken.id);

		const blog = new Blog({
			...request.body,
			user: user.id
		});
		const newBlog = await blog.save();

		user.blogs = user.blogs.concat(newBlog);
		await user.save();

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