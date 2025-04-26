/**
 * API 基础能力
 */
import axios from 'axios';
import { userLoginStore } from '@/stores/login-store.js'

const configBaseUrl = () => {
    return import.meta.env.VITE_API_URL
}


const api = axios.create({
    baseURL: configBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// 添加请求拦截器
api.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        const store = userLoginStore()
        // config.headers.Authorization = `Bearer your-token`;
        config.headers.token = store.token
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
api.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default api;