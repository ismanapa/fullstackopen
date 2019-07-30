import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

afterEach(cleanup);

describe('SimpleBlog', () => {
		
	test('renders content', () => {
		const blog = {
			title: 'test title',
			author: 'test author',
			likes: 100
		};

		const component = render(<SimpleBlog blog={blog}/>);

		const header = component.container.querySelector('.header');
		expect(header).toHaveTextContent(blog.title);
		expect(header).toHaveTextContent(blog.author);
	});

});