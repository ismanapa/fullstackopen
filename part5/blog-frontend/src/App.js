import React, { useState, useEffect } from 'react';

import loginService from './services/login';
import blogService from './services/blogs';
import Notification from './components/notification';
import Blog from './components/blog';

const App = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState(null);


	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		async function fetchData() {
			const initialBlogs = await blogService.getAll();
			setBlogs(initialBlogs);
		}
		fetchData();
	}, []);

	useEffect(() => {
		const user = window.localStorage.getItem('user');

		if (user) {
			setUser(JSON.parse(user));
		}

	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username, password,
			});

			window.localStorage.setItem(
				'user', JSON.stringify(user)
			);

			setUser(user);
			setUsername('');
			setPassword('');



		} catch (exception) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = (event) => {
		event.preventDefault();
		window.localStorage.removeItem('user');
		setUser(null);
	};

	if (user === null) {
		return (
			<div>
				{errorMessage && <Notification isError={true} message={errorMessage} />}

				<h2>Log in to application</h2>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		);
	}

	return (
		<div className="App">
			<h2>blogs</h2>
			<p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
			{blogs && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
		</div>
	);
};

export default App;
