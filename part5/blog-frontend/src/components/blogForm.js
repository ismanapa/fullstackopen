import React from 'react';

const BlogForm = ({
	onSubmit,
	title,
	author,
	url,
}) => (
	<form onSubmit={onSubmit}>
		<div>
				title
			<input
				type="text"
				value={title.value}
				onChange={title.onChange}
			/>
		</div>
		<div>
				author
			<input
				type="text"
				value={author.value}
				onChange={author.onChange}
			/>
		</div>
		<div>
				url
			<input
				type="text"
				value={url.value}
				onChange={url.onChange}
			/>
		</div>
		<button type="submit">create</button>
	</form>
);

export default BlogForm;