import React, { useState } from 'react';

const Blog = ({ blog, handleLike, handleRemove }) => {
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

	const likeHandler = (id) => () => {
		handleLike(id);
	}

	const removeHandler = (id) => () => {
		handleRemove(id);
	};

	return (
		<div style={blogStyle}>
			<div onClick={toggleVisibility}>
				{blog.title} - {blog.author}
			</div>

			<div style={{ display: visible ? 'block' : 'none' }} >
				<hr />
				<div>url: {blog.url}</div>
				<div>likes: {blog.likes} <button onClick={likeHandler(blog.id)}>like</button> </div>
				<div>added by {blog.author}</div>
				<div>
					<button onClick={removeHandler(blog.id)}>remove</button>
				</div>
			</div>
		</div>
	);
};

export default Blog;