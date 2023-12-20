import request from '@/utils/request'

// 查询药品订单预支付信息
export const getMedicalOrderPreAPI = (params: { prescriptionId: string }) => {
  return request({ url: '/patient/medicine/order/pre', params })
}

// 获取收货地址列表
export const getAddressListAPI = () => {
  return request('/patient/order/address')
}

// 创建药品订单
export const createMedicalOrderAPI = (data: {
  id: string
  addressId: string
  couponId?: string
}) => {
  return request({ url: '/patient/medicine/order', method: 'post', data })
}

// 获取药品订单详情
export const getMedicalOrderDetailAPI = (id: string) => {
  return request({ url: `/patient/medicine/order/detail/${id}` })
}

// 获取药品订单物流信息
export const getLogisticsAPI = (id: string) => {
  return request(`/patient/order/${id}/logistics`)
}
