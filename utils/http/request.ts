import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SUCCESS_CODE } from '@/constants';
import { handleResponseErr } from './tools';

const BASE_URL = 'https://api.realworld.io/api';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 100000 // 请求超时时间
});

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use((response: AxiosResponse<any>) => {
  return new Promise((resolve, reject) => {
    const { data, status } = response
    if (data) {
      if (status === SUCCESS_CODE) {
        return resolve(data);
      } else {
        return reject(data); //有异常在业务侧请求catch捕获，有特殊情况需要再调整
      }
    }
  });
}, handleResponseErr);

export default service;
