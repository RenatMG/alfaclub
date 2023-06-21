import { Endpoints } from './endpoints';

export const baseUrl = () => {
    return process.env.REACT_APP_API_URL;
};

export const combineUrl = (endpoint: Endpoints, path: (string | number)[] = []) => {
    if (path.length) {
        return baseUrl() + endpoint + '/' + path.join('/');
    }
    return baseUrl() + endpoint;
};

export const createUrl = ( path: (string | number)[] = []) => {
    if (path.length) {
        return '/' + path.join('/');
    }
    return '';
};