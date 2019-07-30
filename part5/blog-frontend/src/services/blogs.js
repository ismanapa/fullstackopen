import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`;
};

const unsetToken = () => {
	token = null;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token }
	};
	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const like = async id => {
	const config = {
		headers: { Authorization: token }
	};
	const response = await axios.put(`${baseUrl}/${id}`, {}, config);
	return response.data;
};

const remove = async id => {
	const config = {
		headers: { Authorization: token }
	};
	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.status === 204;
};

export default {
	getAll,
	setToken,
	create,
	unsetToken,
	like,
	remove
};