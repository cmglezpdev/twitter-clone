import axios from 'axios';

export const twitterApi = axios.create({
    baseURL: '/api',
});
