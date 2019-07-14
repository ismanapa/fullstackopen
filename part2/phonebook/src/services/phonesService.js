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

export default { getAll, create };