import { ConsultType, IllnessTime } from '@/enums'

/** 文章类型，recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章 */
export type IKnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'
/** 文章列表查询参数 */
export type KnowledgeParams = {
  type: IKnowledgeType
  current: number
  pageSize: number
}

export interface KnowledgePage {
  /** 总页数 */
  pageTotal: number
  /** 数据 */
  rows: Knowledge[]
  /** 总条数 */
  total: number
}

export interface Knowledge {
  /** 收藏数量 */
  collectionNumber: number
  /** 评论数量 */
  commentNumber: number
  /** 内容详情 */
  content: string
  /** 封面地址 */
  coverUrl: string[]
  /** 创建人头像 */
  creatorAvatar: string
  /** 创建人科室 */
  creatorDep: string
  /** 创建人医院 */
  creatorHospatalName: string
  /** 创建人id */
  creatorId: string
  /** 创建人姓名 */
  creatorName: string
  /** 创建人职称 */
  creatorTitles: string
  /** 文章id */
  id: string
  /** 是否关注0未关注1关注 */
  likeFlag: number
  /** 文章标题 */
  title: string
  /** 百科关联的话题 */
  topics: string[]
}

// 医生卡片对象
export interface Doctor {
  /** 医生头像 */
  avatar: string
  consultationNum: number
  /** 科室名称 */
  depName: string
  /** 医院等级-名称简写 */
  gradeName: string
  /** 医院名称 */
  hospitalName: string
  /** 医生id */
  id: string
  /** 未登录用户默认返回0，登录用户实际判断是否关注的标志1已关注0未关注 */
  likeFlag?: number
  major: string
  /** 医生姓名 */
  name: string
  /** 职称 */
  positionalTitles: string
  score: number
  /** 接诊费用 */
  serviceFee: number
}

// 医生分页数据
export interface DoctorPage {
  current: number
  pageSize: number
}

/** 关注的类型，doc医生 knowledge文章 topic百科话题 disease疾病 */
export type IFollowType = 'doc' | 'knowledge' | 'topic' | 'disease'

/** 图片列表 */
export type Image = {
  /** 图片ID */
  id: string
  /** 图片地址 */
  url: string
}
/** 问诊记录 */
export type Consult = {
  /** 问诊记录ID */
  id: string
  /** 问诊类型 */
  type: ConsultType
  /** 快速问诊类型，0 普通 1 三甲 */
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 疾病描述 */
  illnessDesc: string
  /** 疾病持续时间 */
  illnessTime: IllnessTime
  /** 是否就诊过，0 未就诊过  1 就诊过 */
  consultFlag: 0 | 1
  /** 图片数组 */
  pictures: Image[]
  /** 患者ID */
  patientId: string
  /** 优惠券ID */
  couponId: string
}

/** 问诊记录-全部可选 */
export type PartialConsult = Partial<Consult>
// 💥💥 全部可选是因为信息是一点一点累加上去的

export interface TopDep {
  /**
   * 子级集合
   */
  child?: Child[]
  /**
   * 科室id--一级科室
   */
  id?: string
  /**
   * 科室名称
   */
  name?: string
}

export interface SubDep {
  /**
   * 科室的图标
   */
  avatar: Avatar
  /**
   * 子级id
   */
  id: string
  /**
   * 子级name
   */
  name: string
}

export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

/** 问诊订单预支付信息 */
export interface OrderPreData {
  /** 实付金额 */
  actualPayment?: number
  /** 优惠券抵扣 */
  couponDeduction?: number
  /** 使用的优惠券id-使用优惠券时，返回 */
  couponId?: string
  /** 极速问诊类型：0普通1三甲,极速问题必须有值 */
  illnessType?: number
  /** 应付款/价格-图文或者极速的费用，极速普通10元，三甲39元 */
  payment?: number
  /** 积分可抵扣 */
  pointDeduction?: number
  /** 1问医生2极速问诊2开药问诊--默认是1 */
  type?: number
}

/** 请求订单支付信息的参数 */
export type OrderPreParams = Pick<OrderPreData, 'type' | 'illnessType'>

/** 请求支付地址接口的参数类型 */
export type PayUrlParams = {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}

/** 订单记录接口参数类型 */
export type ConsultOrderListParams = PageParams & {
  /** 问诊记录类型 */
  type: ConsultType
}

/** 分页请求问诊订单记录-返回值类型 */
export type ConsultOrderPage = {
  /** 总页数 */
  pageTotal: number
  /** 总条数 */
  total: number
  /** 列表数据 */
  rows: ConsultOrderItemw[]
}

export type ConsultOrderItem = {
  /** 创建时间 */
  createTime: string
  /** 医生信息 */
  docInfo?: Doctor
  /** 患者信息 */
  patientInfo: Patient

  /** 订单状态 */
  status: number
  /** 状态文字 */
  statusValue: string
  /** 类型问诊文字 */
  typeValue: string
  /** 倒计时时间 */
  /** 处方ID */
  /** 评价ID */
  /** 应付款 */
  /** 优惠券抵扣 */
  /** 积分抵扣 */
  /** 实付款 */
  /**
   * 开药门诊必有-过敏史0无1有2不清楚
   */
  allergicHistory?: number
  /**
   * 取消/退款进度
   */
  cancelProcess?: string
  /**
   * 取消订单原因
   */
  cancelReason?: string
  /**
   * 取消订单原因文字
   */
  cancelReasonValue?: string
  /**
   * 找医生/极速问诊必有-是否就诊过0未就诊1就诊过
   */
  consultFlag?: number
  /**
   * 倒计时-1表示计时已过(单位s)
   */
  countdown?: number
  /**
   * 订单创建时间
   */
  createTime: string
  /**
   * 咨询的医生--找医生
   */
  docInfo?: DocInfo
  /**
   * 是否已经评价1 已评价0 未评价
   */
  evaluateFlag: string
  /**
   * 开药门诊必有-生育状态及计划0无1备孕中2已怀孕3哺乳期
   */
  fertilityStatus?: number
  /**
   * 订单id
   */
  id: string
  /**
   * 病情--症状描述
   */
  illnessDesc: string
  /**
   * 找医生/极速问诊必有-患病时间1一周内2一月内3半年内4半年以上
   */
  illnessTime?: number
  /**
   * 开药门诊必有-肝功能0正常1异常2不清楚
   */
  liverFunction?: number
  /**
   * 订单编号
   */
  orderNo?: string
  /**
   * 价格
   */
  pament: number
  /**
   * 患者id,用于关联患者信息
   */
  patientInfo?: PatientInfo
  /**
   * 处方id信息
   */
  prescriptionId?: string
  /**
   * 就诊记录id信息
   */
  recordId: string
  /**
   * 开药门诊必有-肾功能0正常1异常2不清楚
   */
  renalFunction?: number
  /**
   * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
   */
  status: Status
  /**
   * 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
   */
  /**
   * 订单类型1问医生2极速问诊2开药问诊--默认是1
   */
  type?: number
  payment?: number
  evaluateId?: string
  couponDeduction?: number
  pointDeduction?: number
  actualPayment?: number
}
