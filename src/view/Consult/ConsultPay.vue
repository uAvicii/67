<script setup lang="ts">
import {
  getPatientDetail,
  getPreOrderAPI,
  createOrderAPI,
  getOrderPayUrl
} from '@/services/consult'
import { useConsultStore } from '@/stores'
import type { OrderPreData } from '@/types/consult'
import { onBeforeRouteLeave } from 'vue-router'
import type { Patient } from '@/types/user'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showLoadingToast, showDialog } from 'vant'

const store = useConsultStore()
const router = useRouter()

const payInfo = ref<OrderPreData>({})
const loadData = async () => {
  const res = await getPreOrderAPI({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  payInfo.value = res.data.data
}

const patient = ref<Patient>({})
const loadPatient = async () => {
  if (!store.consult.patientId) return
  const res = await getPatientDetail(store.consult.patientId)
  patient.value = res.data.data
}

const agree = ref(false)
const isShow = ref(false)
const paymentMethod = ref<0 | 1>(1)
const loading = ref(false)
const orderId = ref('')

const onSubmit = async () => {
  if (!agree.value) return showToast('请勾选我已同意支付协议')
  loading.value = true
  const res = await createOrderAPI(store.consult)
  orderId.value = res.data.data.id
  loading.value = false
  isShow.value = true
}
const onPay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast('跳转支付')
  const res = await getOrderPayUrl({
    orderId: orderId.value,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://localhost:3000/room'
  })
  window.location.href = res.data.data.payUrl
  // 打开新页面跳转支付
  // window.open(res.data.data.payUrl)
}

onBeforeRouteLeave(() => {
  if (orderId.value) return false
})
onMounted(() => {
  if (
    !store.consult.type ||
    !store.consult.illnessType ||
    !store.consult.depId ||
    !store.consult.patientId
  ) {
    return showDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
  loadData()
  loadPatient()
})
</script>

<template>
  <div class="consult-pay-page">
    <!-- 导航栏 -->
    <cp-nav-bar title="支付" />

    <!-- 费用信息 -->
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>

    <!-- 折扣 -->
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo.pointDeduction}`" />
      <van-cell title="实付款" :value="`-¥${payInfo.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>

    <!-- 患者信息 -->
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient.name} | ${patient.genderValue} | ${patient.age}岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>

    <!-- 底部支付按钮 -->
    <van-submit-bar
      button-type="primary"
      :price="payInfo.actualPayment! * 100"
      button-text="立即支付"
      text-align="left"
      :loading="loading"
      @click="onSubmit"
    />

    <!-- 支付选项卡片 -->
    <van-action-sheet
      v-model:show="isShow"
      :close-on-popstate="false"
      :closeable="false"
      title="选择支付方式"
    >
      <div class="pay-type">
        <p class="amount">￥{{ payInfo.actualPayment!.toFixed(2) }}元</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="paymentMethod = 0">
            <template #icon><cp-icon name="consult-wechat" /></template>
            <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="paymentMethod = 1">
            <template #icon><cp-icon name="consult-alipay" /></template>
            <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button type="primary" round block @click="onPay">立即支付</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 0 0 50px;
}

.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}

.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}

.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0 16px;
  .text {
    color: var(--cp-primary);
  }
}

::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}

.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
