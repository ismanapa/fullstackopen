const dummy = () => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.reduce((ac, blog) => ac + blog.likes, 0);
};

const favoriteBlog = blogs => {
	if (favoriteBlog.length === 0)
		return undefined;

	const sortedBlogs = [...blogs].sort((a, b) => {
		return b.likes - a.likes;
	});

	return sortedBlogs[0];
};

const mostBlogs = blogs => {
	const mostBlogs = blogs
		.reduce((ac, blog) => {
			const itemIndex = ac.findIndex(b => b.author === blog.author);

			if (itemIndex >= 0) {
				ac[itemIndex].blogs++;
			} else {
				ac.push({
					author: blog.author,
					blogs: 1
				});
			}

			return ac;
		}, [])
		.sort((a, b) => {
			return b.blogs - a.blogs;
		});
	return mostBlogs[0];
};

const mostLikes = blogs => {
	const mostLikes = blogs
		.reduce((ac, blog) => {
			const itemIndex = ac.findIndex(b => b.author === blog.author);

			if (itemIndex >= 0) {
				ac[itemIndex].likes += blog.likes;
			} else {
				ac.push({
					author: blog.author,
					likes: blog.likes
				});
			}

			return ac;
		}, [])
		.sort((a, b) => {
			return b.likes - a.likes;
		});
	return mostLikes[0];
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};