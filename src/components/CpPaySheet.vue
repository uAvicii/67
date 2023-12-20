<script setup lang="ts">
import { getOrderPayUrl } from '@/services/consult'
import { showLoadingToast } from 'vant'
import { ref } from 'vue'

interface Props {
  orderId: string
  actualPayment: number
}
const {
  orderId,
  show,
  payCallback = 'http://localhost:3000/room'
} = defineProps<{
  orderId: string
  actualPayment: number
  show: boolean
  payCallback: string
}>()

// const { orderId } = defineProps<Props>()

const isShow = ref(false)
const paymentMethod = ref<0 | 1>(1)
const onPay = async () => {
  showLoadingToast('跳转支付')
  const res = await getOrderPayUrl({
    orderId: orderId,
    paymentMethod: paymentMethod.value,
    // payCallback: 'http://localhost:3000/room'
    payCallback
  })
  window.location.href = res.data.data.payUrl
  // 打开新页面跳转
  // window.open(res.data.data.payUrl)
}
</script>

<template>
  <!-- 支付方式弹窗 -->
  <van-action-sheet
    v-model:show="isShow"
    title="选择支付方式"
    :closeable="false"
    :close-on-popstate="false"
  >
    <div class="pay-type">
      <p class="amount">￥{{ actualPayment.toFixed(2) }}元</p>
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
</template>

<style lang="scss" scoped>
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
