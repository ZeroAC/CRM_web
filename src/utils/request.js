import axios from 'axios'
import checkApi from '@/utils/checkApi'
import { noCheckApi } from '@/utils/constant'

import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    if (noCheckApi.indexOf(config.url) === -1) { // 需要签名的接口
      return checkApi(config)
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    if (res.code !== 200) {
      if (res.code === 'SN005' || res.code === 'SN007' || res.code === 'SN009') { // 签名错误（同账户登录）退出登录
        store.dispatch('user/logout').then(() => {
          location.reload()
        })
        return
      }
      if (res.code === 500) {
        Message({
          message: '服务器出了些小问题::>_<::',
          type: 'warning',
          duration: 5 * 1000
        })
        return
      }
      Message.closeAll() // 防止多次弹出提示框
      Message({
        message: res.message || 'Error',
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    } else {
      return res // 返回结果需要是一个对象 如果为空 则会抛出 网络不给力
    }
  },
  error => {
    Message.closeAll()
    Message({
      message: '网络不太给力哦,请重试 ::>_<::',
      type: 'warning',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
