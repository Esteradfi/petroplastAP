import axios from "axios";

const API_URL = 'https://1820417-ln81015.twc1.net/api';

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export default $api;