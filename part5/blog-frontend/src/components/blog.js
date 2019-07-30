import React, { useState } from 'react';

const Blog = ({ blog, handleLike, handleRemove, currentUser }) => {
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
	};

	const removeHandler = (id) => () => {
		handleRemove(id);
	};

	const renderRemoveButton = () => (
		<div>
			<button onClick={removeHandler(blog.id)}>remove</button>
		</div>
	);

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
				{blog.user.username === currentUser.username && renderRemoveButton()}
			</div>
		</div>
	);
};

export default Blog;