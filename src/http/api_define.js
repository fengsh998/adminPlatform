import { HTTP } from './api_request.js'

const api_v1 = {
    login: '/api/v1/login',
    logout: '/api/v1/logout',
    register: '/api/v1/register'
}

export const requestLogin = (data) => {
    return HTTP.async.postAsync(api_v1.login,data)
}

export const requestRegister = (data) => {
    return HTTP.async.postAsync(api_v1.register,data)
}

export const requestLogout = (data) => {
    return HTTP.async.postAsync(api_v1.logout,data)
}