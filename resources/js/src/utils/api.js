import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';
const TOKEN = localStorage.getItem('dilaun_token');
const HEADERS = {
    'Authorization': `Bearer ${TOKEN}`,
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With'
};

export const convertParam = (params) => {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&')
}

export const convertQueryString = (query) => {
    return Object.fromEntries(query);
}

export function get(endpoint) {
    try {
        return axios.get(API_URL + endpoint, {
            headers: HEADERS
        });
    } catch (e) {
        return e;
    }
}

export function post(endpoint, data) {
    try {
        return axios.post(API_URL + endpoint, data, {
            headers: HEADERS
        });
    } catch (e) {
        return e;
    }
}

export function patch(endpoint, data) {
    try {
        return axios.patch(API_URL + endpoint, data, {
            headers: HEADERS
        });
    } catch (e) {
        return e;
    }
}

export function del(endpoint) {
    try {
        return axios.delete(API_URL + endpoint, {
            headers: HEADERS
        });
    } catch (e) {
        return e;
    }
}
