import { createRouter, createWebHistory, useRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useI18n } from 'vue-i18n'
import i18n from '@/language/i18n'
NProgress.configure({
  showSpinner: false
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/view/Login/index.vue'),
      meta: { title: '登录', label: 'router.login' }
    },
    {
      path: '/login/callback',
      component: () => import('@/view/Login/LoginCallback.vue'),
      meta: { title: '扣扣登录-绑定手机', label: 'router.qq' }
    },
    {
      path: '/register',
      component: () => import('@/view/Register/index.vue'),
      meta: { title: '注册', label: 'router.register' }
    },
    {
      path: '/',
      component: () => import('@/view/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/view/Home/index.vue'),
          meta: { title: '首页', label: 'router.homeTitle' }
        },
        {
          path: 'article',
          component: () => import('@/view/Article/index.vue'),
          meta: { title: '健康百科', label: 'router.articleTitle' }
        },
        {
          path: 'notify',
          component: () => import('@/view/Notify/index.vue'),
          meta: { title: '消息通知', label: 'router.notifyTitle' }
        },
        {
          path: 'user',
          component: () => import('@/view/User/index.vue'),
          meta: { title: '个人中心', label: 'router.userTitle' }
        }
      ]
    },
    {
      path: '/consult',
      component: () => import('@/view/Consult/ConsultRecord.vue'),
      meta: { title: '问诊', label: 'router.consult' },
      name: 'Consult'
    },
    {
      path: '/sunny',
      component: () => import('@/view/Sunny/index.vue'),
      meta: { title: 'bick', label: 'router.sunny' },
      name: 'sunny'
    },
    {
      path: '/snake',
      component: () => import('@/view/Snake/index.vue'),
      meta: { title: 'snake', label: 'router.snake' },
      name: 'snake'
    },
    {
      path: '/map',
      component: () => import('@/view/Map/index.vue'),
      meta: { title: 'map', label: 'router.map' },
      name: 'map'
    },
    {
      path: '/text',
      component: () => import('@/view/Text/index.vue'),
      meta: { title: 'text', label: 'router.text' },
      name: 'text'
    },
    {
      path: '/patient',
      component: () => import('@/view/User/patient/index.vue'),
      meta: { title: '档案', label: 'router.patientTitle' },
      name: 'patient'
    },
    {
      path: '/address',
      component: () => import('@/view/User/address/index.vue'),
      meta: { title: '地址', label: 'router.addressTitle' },
      name: 'address'
    },
    {
      path: '/order',
      component: () => import('@/view/Order/index.vue'),
      meta: { title: '订单', label: 'router.order' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/view/Consult/ConsultFast.vue'),
      meta: { title: '极速拍档', label: 'router.fast' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/view/Consult/ConsultDep.vue'),
      meta: { title: '选择武器', label: 'router.dep' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/view/Consult/ConsultIllness.vue'),
      meta: { title: '战况描述', label: 'router.illness' }
    },
    {
      path: '/consult/pay',
      component: () => import('@/view/Consult/ConsultPay.vue'),
      meta: { title: '知识付费', label: 'router.pay' }
    },
    {
      path: '/consult/:id',
      component: () => import('@/view/Consult/ConsultDetail.vue'),
      meta: { title: '审判详情', label: 'router.id' }
    },
    {
      path: '/room',
      component: () => import('@/view/Room/index.vue'),
      meta: { title: '面壁室', label: 'router.room' },
      beforeEnter(to) {
        if (to.query.payResult === 'false') return '/consult'
      }
    },
    {
      path: '/order/pay',
      component: () => import('@/view/Order/OrderPay.vue'),
      meta: { title: '魔法支付', label: 'router.OrderPay' }
    },
    {
      path: '/order/:id',
      component: () => import('@/view/Order/OrderDetail.vue'),
      meta: { title: '订单详情', label: 'router.OrderDetail' }
    },
    {
      path: '/order/logistics/:id',
      component: () => import('@/view/Order/OrderLogistics.vue'),
      meta: { title: '物流详情', label: 'router.OrderLogistics' }
    },
    {
      path: '/sos',
      component: () => import('@/view/Sos/index.vue'),
      meta: { title: 'iKun', label: 'router.sos' }
    }
  ]
})

// 访问权限控制
router.beforeEach((to: any) => {
  NProgress.start()
  // 1. 定义白名单
  const whiteList = ['/login', '/register', '/login/callback']
  // 用户仓库
  const store = useUserStore()
  // 2. 如果没有登录且不在白名单内，去登录
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})
//显示加载进度条
router.afterEach((to: any) => {
  let title = to.meta.label
  document.title = `佩-${i18n.global.t(title) || ''}`
  NProgress.done()
})

export default router
