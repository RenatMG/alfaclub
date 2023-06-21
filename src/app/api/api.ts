import axios from 'axios';
import { baseUrl } from './url';

const api = axios.create({
    withCredentials: true,
    baseURL: baseUrl(),
});

api.interceptors.request.use(function (config) {
    return config;
});

export default api;
