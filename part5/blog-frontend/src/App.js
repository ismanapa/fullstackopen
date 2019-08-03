import React, { useState, useEffect, Fragment } from 'react';

import loginService from './services/login';
import blogService from './services/blogs';
import Notification from './components/notification';
import Blog from './components/blog';
import BlogForm from './components/blogForm';
import Toggable from './components/toggable';
import { useField } from './hooks';

const App = () => {

	const title = useField('text');
	const author = useField('text');
	const url = useField('text');

	const username = useField('text');
	const password = useField('password');

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
				username: username.value, 
				password: password.value,
			});

			window.localStorage.setItem(
				'user', JSON.stringify(user)
			);

			setUser(user);
			username.reset();
			password.reset();
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
			title: title.value,
			author: author.value,
			url: url.value
		};

		const returnedBlog = await blogService.create(blogObject);

		setBlogs(blogs.concat(returnedBlog));
		title.reset();
		author.reset();
		url.reset();

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

	const removeBlog = async (id) => {
		if (window.confirm('remove blog?')) {
			const isRemoved = await blogService.remove(id);
			if (isRemoved) {
				setBlogs(blogs.filter(blog => blog.id !== id));

				setNotificationMessage('Blog removed');
				setTimeout(() => {
					setNotificationMessage(null);
				}, 2000);
			}
		}
	};

	return (
		<div className="App">
			{errorMessage && <Notification isError={true} message={errorMessage} />}
			{notificationMessage && <Notification isError={false} message={notificationMessage} />}
			{
				user ?
					(
						<Fragment>
							<h2>Blog list</h2>
							<p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
							<Toggable buttonLabel="new note">
								<h2>create new</h2>
								<BlogForm
									onSubmit={addBlog}
									title={title}
									author={author}
									url={url}
								/>
							</Toggable>

							<div className="blogList" style={{ marginTop: 20 }}>
								{blogs && blogs
									.sort((a, b) => b.likes - a.likes)
									.map(blog =>
										<Blog 
											key={blog.id}
											blog={blog}
											handleLike={likeBlog}
											handleRemove={removeBlog}
											currentUser={user}
										/>)
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
										type={username.type}
										value={username.value}
										name="Username"
										onChange={username.onChange}
									/>
								</div>
								<div>
									password
									<input
										type={password.type}
										value={password.value}
										name="Password"
										onChange={password.onChange}
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
