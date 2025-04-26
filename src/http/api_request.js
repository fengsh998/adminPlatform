import api from '@/http/api_base.js'

// 异步 GET 请求
const getAsync = (url, params, headers = {}) => api.get(url, { params, headers })

// 异步 POST 请求
const postAsync = (url, data, headers = {}) => api.post(url, data, { headers })

// 异步 PUT 请求
 const putAsync = (url, data, headers = {}) => api.put(url, data, { headers })

// 异步 DELETE 请求
const deleteAsync = (url, params, headers = {}) => api.delete(url, { params, headers })

const engineAsync = {
 getAsync,
 postAsync,
 putAsync,
 deleteAsync
}

// 同步 GET 请求
const getSync = async (url, params, headers = {}) => {
 try {
  return await api.get(url, { params, headers })
 } catch (error) {
  throw error
 }
}

// 同步 POST 请求
const postSync = async (url, data, headers = {}) => {
 try {
  return await api.post(url, data, { headers })
 } catch (error) {
  throw error
 }
}

// 同步 PUT 请求
const putSync = async (url, data, headers = {}) => {
 try {
  return await api.put(url, data, { headers })
 } catch (error) {
  throw error
 }
}

// 同步 DELETE 请求
const deleteSync = async (url, params, headers = {}) => {
 try {
  return await api.delete(url, { params, headers })
 } catch (error) {
  throw error
 }
}

const engineSync = {
 getAsync,
 postAsync,
 putAsync,
 deleteAsync
}

export const HTTP = {
 async: engineAsync,
 sync: engineSync
}
