<script setup lang="ts">
import { getAddressListAPI, getMedicalOrderPreAPI } from '@/services/order'
import type { AddressItem, OrderPre } from '@/types/order'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderPre = ref<OrderPre>()
const address = ref<AddressItem>()
const loadData = async () => {
  const res = await getMedicalOrderPreAPI({
    prescriptionId: route.query.id as string
  })
  const addRes = await getAddressListAPI()
  orderPre.value = res.data.data
  // 设置收货地址
  if (addRes.data.data.length) {
    const defAddress = addRes.data.data.find((item: AddressItem) => item.isDefault === 0)
    if (defAddress) address.value = defAddress
    else address.value = addRes.data.data[0]
  }
}
onMounted(loadData)
</script>

<template>
  <div class="order-pay-page" v-if="orderPre && address">
    <cp-nav-bar title="药品支付" />
    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        <span>{{ address.province + address.city + address.county }}</span>
      </p>
      <p class="detail">{{ address.addressDetail }}</p>
      <p>
        {{ address.receiver }}
        {{ address.mobile.replace(/^(\d{3})(?:\d{4})(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>
    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item van-hairline--top" v-for="med in orderPre.medicines" :key="med.id">
        <img class="img" :src="med.avatar" alt="" />
        <div class="info">
          <p class="name">
            <span>{{ med.name }}</span>
            <span>x{{ med.quantity }}</span>
          </p>
          <p class="size">
            <van-tag v-if="med.prescriptionFlag === 1">处方药</van-tag>
            <span>{{ med.specs }}</span>
          </p>
          <p class="price">￥{{ med.amount }}</p>
        </div>
        <div class="desc">{{ med.usageDosag }}</div>
      </div>
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${orderPre.payment}`" />
        <van-cell title="运费" :value="`￥${orderPre.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${orderPre.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${orderPre.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出
        不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox>我已同意<a href="javascript:;">支付协议</a></van-checkbox>
    </div>
    <van-submit-bar
      :price="orderPre.actualPayment * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
  </div>
  <div>
    <cp-nav-bar title="药品支付" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
</template>
