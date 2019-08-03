import React from 'react';

import CustomInput from './customInput';

const BlogForm = ({
	onSubmit,
	title,
	author,
	url,
}) => (
		<form onSubmit={onSubmit}>
			<div>
				title
				<CustomInput {...title} />
			</div>
			<div>
				author
				<CustomInput {...author} />
			</div>
			<div>
				url
				<CustomInput {...url} />
			</div>
			<button type="submit">create</button>
		</form>
	);

export default BlogForm;