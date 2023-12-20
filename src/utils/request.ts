// 二次封装axios
import axios from 'axios'
import { useUserStore } from '@/stores/index'
import { showFailToast, showToast } from 'vant'
import router from '@/router'
export const baseURL = 'https://consult-api.itheima.net/'
const request = axios.create({
  baseURL,
  timeout: 10000
})

request.interceptors.request.use(
  function (config: any) {
    const store = useUserStore()
    // 获取用户登录信息
    const token = store.user?.token
    if (token) {
      // 请求头添加token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (err: any) {
    return Promise.reject(err)
  }
)

//  响应拦截器
request.interceptors.response.use(
  function (res) {
    // 后台约定，响应成功，但是code不是10000，是业务逻辑失败
    if (res.data?.code !== 10000) {
      showFailToast(res.data?.message)
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，返回响应数据，作为axios成功的结果
    return res
  },
  function (err) {
    if (err.message == 'Network Error') {
      // 413 请求实体太大
      showFailToast('上传失败, 请检查图片格式')
    }
    if (err.response.status === 401) {
      // 提示用户
      showToast('登录超时, 请重新登录')
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push({
        path: '/login',
        query: { returnPath: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

export default request
