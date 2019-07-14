import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => {
            return response.data;
        })
};

const create = newPhone => {
    return axios
        .post(baseUrl, newPhone)
        .then(response => {
            return response.data;
        })
}

const remove = id => {
    return axios
        .delete(`${baseUrl}/${id}`);
}

export default { getAll, create, remove };