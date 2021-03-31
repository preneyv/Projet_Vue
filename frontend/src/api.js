
import Axios from 'axios'
import config from '@/config.js'

const api = Axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
  }
})

export const updateApiToken = token => {
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export default api