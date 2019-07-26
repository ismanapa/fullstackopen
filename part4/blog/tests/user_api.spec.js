const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('user api', () => {

	describe('post user', () => {
		test('Bad request is returned when username is missing in body', async () => {
			const newUser = {
				name: 'name',
				password: 'pass'
			};

			await api
				.post('/api/users')
				.send(newUser)
				.expect(400);
		});
	});

	
	afterAll(() => {
		mongoose.connection.close();
	});

});
