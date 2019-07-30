import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Blog from './blog';

afterEach(cleanup);

describe('Blog', () => {

	test('only title and author are shown by default', () => {
		const blog = {
			title: 'test title',
			author: 'test author',
			likes: 100,
			user: {
				username: 'testUser'
			}
		};

		const currentUser = {
			username: 'testUser'
		};

		const component = render(<Blog blog={blog} currentUser={currentUser} />);

		const header = component.container.querySelector('.header');
		expect(header).toHaveTextContent(blog.title);
		expect(header).toHaveTextContent(blog.author);

		const blogInfo = component.container.querySelector('.blogInfo');
		expect(blogInfo).toHaveStyle('display: none');
	});
	
	test('blog info is shown when header is clicked', () => {
		const blog = {
			title: 'test title',
			author: 'test author',
			likes: 100,
			user: {
				username: 'testUser'
			}
		};

		const currentUser = {
			username: 'testUser'
		};

		const component = render(<Blog blog={blog} currentUser={currentUser} />);

		const header = component.container.querySelector('.header');
		fireEvent.click(header);

		const blogInfo = component.container.querySelector('.blogInfo');
		expect(blogInfo).toHaveStyle('display: block');
	});

});