import React, { useState, useEffect, Fragment } from 'react';

import loginService from './services/login';
import blogService from './services/blogs';
import Notification from './components/notification';
import Blog from './components/blog';
import BlogForm from './components/blogForm';
import Toggable from './components/toggable';

const App = () => {

	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState(null);


	const [errorMessage, setErrorMessage] = useState('');
	const [notificationMessage, setNotificationMessage] = useState('');

	useEffect(() => {
		async function fetchData() {
			const initialBlogs = await blogService.getAll();
			setBlogs(initialBlogs);
		}
		fetchData();
	}, []);

	useEffect(() => {
		const userJson = window.localStorage.getItem('user');

		if (userJson) {
			const user = JSON.parse(userJson);
			setUser(user);
			blogService.setToken(user.token);
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
			blogService.setToken(user.token);


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
		blogService.unsetToken();
	};

	const addBlog = async (event) => {
		event.preventDefault();
		const blogObject = {
			title,
			author,
			url
		};

		const returnedBlog = await blogService.create(blogObject);

		setBlogs(blogs.concat(returnedBlog));
		setTitle('');
		setAuthor('');
		setUrl('');

		setNotificationMessage(
			`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
		);
		setTimeout(() => {
			setNotificationMessage(null);
		}, 2000);
	};

	const likeBlog = async (id) => {
		const newData = await blogService.like(id);
		setBlogs(blogs.map(blog => blog.id !== newData.id ? blog : newData));
	};

	if (user === null) {
		return (
			<div>
				{errorMessage && <Notification isError={true} message={errorMessage} />}
				{notificationMessage && <Notification isError={false} message={notificationMessage} />}

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
			{errorMessage && <Notification isError={true} message={errorMessage} />}
			{notificationMessage && <Notification isError={false} message={notificationMessage} />}
			{
				user ?
					(
						<Fragment>
							<h2>blogs</h2>
							<p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
							<Toggable buttonLabel="new note">
								<h2>create new</h2>
								<BlogForm
									onSubmit={addBlog}
									title={title}
									author={author}
									url={url}
									handleTitleChange={({ target }) => setTitle(target.value)}
									handleAuthorChange={({ target }) => setAuthor(target.value)}
									handleUrlChange={({ target }) => setUrl(target.value)}
								/>
							</Toggable>

							<div style={{ marginTop: 20 }}>
								{blogs && blogs.map(blog =>
									<Blog key={blog.id} blog={blog} handleLike={likeBlog} />)
								}
							</div>

						</Fragment>
					) : (
						<Fragment>

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
						</Fragment>
					)
			}
		</div>
	);
};

export default App;
