import axios from 'axios'
import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

// 创建axios实例
const service = axios.create({
  baseURL: '',
  timeout: 10 * 1000
})

service.interceptors.request.use(
  (config) => {
    const isToken = (config.headers || {}).isToken === false
    if (!isToken) {
      config.headers['Authorization'] = wsCache.get('token')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
