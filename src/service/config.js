import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://wda-library-manager-api.herokuapp.com/api',
});
