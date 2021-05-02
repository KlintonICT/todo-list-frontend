import axios from 'axios';

export const HttpUtil = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const ROUTE_API = {
  todo: '/todo',
  subtask: '/subtask',
};
