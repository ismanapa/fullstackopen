import React, { useState } from 'react';

const Blog = ({ blog }) => {
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

	return (
		<div style={blogStyle}>
			<div onClick={toggleVisibility}>
				{blog.title} - {blog.author}
			</div>

			<div style={{ display: visible  ? 'block' : 'none'}} >
				<hr/>
				<div>url: {blog.url}</div>
				<div>likes: {blog.likes} <button>like</button> </div>
				<div>added by {blog.author}</div>
			</div>
		</div>
	);
};

export default Blog;