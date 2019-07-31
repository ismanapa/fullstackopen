import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import App from './App';

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
});