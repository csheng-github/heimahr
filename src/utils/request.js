import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) return response.data // 返回 Blob 对象

    const { data, message, success } = response.data // 默认json格式
    if (success) {
      return data
    } else {
      Message({ type: 'error', message })
      return Promise.reject(new Error(message))
    }
  },
  async(error) => {
    if (error.response.status === 401) {
      Message({ type: 'warning', message: 'token超时了' })
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(error)
    }

    Message({ type: 'error', message: error.message })
    return Promise.reject(error)
  }
)

export default service
