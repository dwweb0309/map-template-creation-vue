import axios from 'axios'
import store from './store'

const API = axios.create({
  baseURL: process.env.VUE_APP_SERVER_API_ENDPOINT || '/localhost:3000',
  timeout: 10000
})

API.interceptors.request.use(async (config) => {
  if (store.state.auth.token) {
    config.headers = {
      'Authorization': `Bearer ${store.state.auth.token}`,
      ...config.headers
    }
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

export default API
