import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent  } from '@testing-library/react';
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

	test('like handler is invoken when button is pressed', () => {
		const blog = {
			title: 'test title',
			author: 'test author',
			likes: 100
		};
		const likeHandler = jest.fn();

		const component = render(<SimpleBlog blog={blog} onClick={likeHandler}/>);
		
		const button = component.container.querySelector('.likeButton');
		fireEvent.click(button);
		fireEvent.click(button);

		expect(likeHandler).toBeCalledTimes(2);
	});

});