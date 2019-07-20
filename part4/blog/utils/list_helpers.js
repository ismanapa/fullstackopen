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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};