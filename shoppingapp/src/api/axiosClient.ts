import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  paramsSerializer: params => queryString.stringify(params),
  baseURL: 'http://192.168.1.6:3001',
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300 && response.data) {
      return response.data;
    }
  },
  error => {
    console.log(error);
    console.log(error.response.data.message);
    throw new Error(error.message);
  },
);

export default axiosClient;
