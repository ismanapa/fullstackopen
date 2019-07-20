const dummy = () => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.reduce((ac, blog) => ac + blog.likes, 0);
};

module.exports = {
	dummy,
	totalLikes,
};