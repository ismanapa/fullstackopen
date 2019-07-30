import React, { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
	const [visible, setVisible] = useState(false);

	const blogStyle = {
		padding: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
		borderRadius: 2
	};


	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const clickHandler = (id) => () => {
		handleLike(id);
	}

	return (
		<div style={blogStyle}>
			<div onClick={toggleVisibility}>
				{blog.title} - {blog.author}
			</div>

			<div style={{ display: visible ? 'block' : 'none' }} >
				<hr />
				<div>url: {blog.url}</div>
				<div>likes: {blog.likes} <button onClick={clickHandler(blog.id)}>like</button> </div>
				<div>added by {blog.author}</div>
			</div>
		</div>
	);
};

export default Blog;