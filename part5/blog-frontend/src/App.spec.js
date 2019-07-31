import React from 'react';
import { render, waitForElement } from '@testing-library/react';

jest.mock('./services/blogs');

import App from './App';

let savedItems = {};
const localStorageMock = {
	setItem: (key, item) => {
		savedItems[key] = item;
	},
	getItem: (key) => savedItems[key],
	clear: savedItems = {}
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('<App />', () => {
	test('if no user logged, notes are not rendered', async () => {
		const component = render(
			<App />
		);
		component.rerender(<App />);

		await waitForElement(
			() => component.getByText('login')
		);

		// expectations here
		var blogs = component.container.querySelectorAll('.blog');
		expect(blogs.length).toBe(0);
	});

	test('when user is logged, notes are rendered', async () => {
		const user = {
			username: 'tester',
			token: '1231231214',
			name: 'Donald Tester'
		};

		localStorage.setItem('user', JSON.stringify(user));

		const component = render(
			<App />
		);
		component.rerender(<App />);

		await waitForElement(
			() => component.getByText('Blog list')
		);

		// expectations here
		var blogs = component.container.querySelectorAll('.blog');
		expect(blogs.length).toBeGreaterThan(0);
	});
});