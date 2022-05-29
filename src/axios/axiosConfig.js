import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.clockify.me/api/v1',
});

instance.defaults.headers.common['X-Api-Key'] = 'OGI1NjAxMjktN2UwZi00NzYwLTg0ODktN2IzNWQ0NDI4M2Vi';

instance.interceptors.request.use(request => {
  // console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  // console.log(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default instance;
