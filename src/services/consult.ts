import type {
  KnowledgeParams,
  DoctorPage,
  IFollowType,
  TopDep,
  OrderPreParams,
  PartialConsult,
  PayUrlParams,
  ConsultOrderListParams
} from '@/types/consult'
import request from '@/utils/request'

// 推荐文章列表
export const getKnowledgePageAPI = (params: KnowledgeParams) => {
  return request({ url: '/patient/home/knowledge', params })
}

// 医生列表
export const getDoctorPageAPI = (params: DoctorPage) => {
  return request({ url: '/home/page/doc', params })
}

// 关注医生
export const followDoctorAPI = (data:any) => {
  return request({ url: '/like', method: 'POST', data})
}

// 科室列表
export const getAllDepAPI = () => request({ url: '/dep/all' })

/** 上传图片API */
export const uploadImageAPI = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request({ url: '/upload', method: 'post', data: fd })
}

// 请求预支付接口
/** 请求预支付数据 */
export const getPreOrderAPI = (params: OrderPreParams) => {
  return request({
    url: '/patient/consult/order/pre',
    params
  })
}

// 定义患者详情查询API
/** 查询患者详情 */
export const getPatientDetail = (id: string) => {
  return request({ url: `/patient/info/${id}` })
}

/** 生成订单接口 */
export const createOrderAPI = (data: PartialConsult) => {
  return request({ url: '/patient/consult/order', method: 'POST', data })
}

/** 获取支付地址  0 是微信  1 支付宝 */
export const getOrderPayUrl = (data: PayUrlParams) => {
  return request({ url: '/patient/consult/pay', method: 'post', data })
}

// 问诊记录
export const getOrderRecordsAPI = (params: ConsultOrderListParams) => {
  return request({ url: '/patient/consult/order/list', params })
}

/** 取消订单API */
export const cancelOrderAPI = (id: string) => {
  return request({ url: `/patient/order/cancel/${id}`, method: 'PUT' })
}

/** 删除订单 */
export const deleteOrderAPI = (id: string) => {
  return request({ url: `/patient/order/${id}`, method: 'DELETE' })
}

/** 获取处方 */
export const getPrescriptionPicAPI = (id: string) => {
  return request({ url: `/patient/consult/prescription/${id}` })
}

/** 订单详情 */
export const getOrderDetailAPI = (id: string) => {
  return request({ url: `/patient/consult/order/detail?orderId=${id}` })
}

/** 获取订单详情API */
export const OrderDetailAPI = (orderId: string) => {
  return request({ url: '/patient/consult/order/detail', params: { orderId } })
}

type EvaluateOrderParams = {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}

// 评价问诊
export const evaluateOrderAPI = (data: EvaluateOrderParams) => {
  return request({ url: '/patient/order/evaluate', method: 'POST', data })
}
