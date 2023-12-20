<script setup lang="ts">
import dayjs from 'dayjs'
const formatTime = (time: string) => dayjs(time).format('HH:mm:ss')
const formatTimeS = () => dayjs().format('YYYY-MM-DD HH:mm:ss')
import EvaluateCard from './EvaluateCard.vue'
import { IllnessTime, MsgType } from '@/enums'
import type { Message } from '@/types/room'
import { useShowPrescription } from '@/composable'
import { showImagePreview, showToast } from 'vant'
import type { Image } from '@/types/consult'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { PrescriptionStatus } from '@/enums'

const router = useRouter()
const store = useUserStore()

const { showPrescription } = useShowPrescription()
defineProps<{ list: Message[] }>()

const timeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '大于半年', value: IllnessTime.More }
]
const flagOptions = [
  { label: '就诊过', value: 0 },
  { label: '没就诊过', value: 1 }
]

const getIllnessTimeText = (time: IllnessTime) => {
  return timeOptions.find((item) => item.value === time)?.label
}

const getConsultFlagText = (flag: 0 | 1) => {
  return flagOptions.find((item) => item.value === flag)?.label
}

// 图片查看
const onPreviewImg = (pics: Image[]) => {
  if (!pics || !pics.length) return showToast('暂无图片')
  const urls = pics.map((item) => item.url)
  showImagePreview(urls)
}
const showPic = (img: any) => {
  showImagePreview([img])
}

// 点击处方的跳转
const onBuy = (pre: any) => {
  if (pre?.status === PrescriptionStatus.Invalid) return showToast('处方已失效')
  if (pre?.status === PrescriptionStatus.NotPayment && !pre.orderId)
    return router.push(`/order/pay?id=${pre.id}`)
  router.push(`/order/${pre.orderId}`)
}
</script>

<template>
  <div v-for="{ msgType, msg, createTime, from, fromAvatar, to, status } in list" :key="createTime">
    <!-- 病情描述 -->
    <div class="msg msg-illness" v-if="msgType === MsgType.CardPat">
      <div class="patient van-hairline--bottom">
        <p>
          {{ msg.consultRecord?.patientInfo.name }}
          {{ msg.consultRecord?.patientInfo.genderValue }}
          {{ msg.consultRecord?.patientInfo.age }}岁
        </p>
        <p>
          {{ getIllnessTimeText(msg.consultRecord!.illnessTime) }} |
          {{ getConsultFlagText(msg.consultRecord!.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18" @click="onPreviewImg(msg.consultRecord!.pictures)">点击查看</van-col>
      </van-row>
    </div>

    <!-- 温馨提示-通知 -->
    <div class="msg msg-tip" v-if="msgType === MsgType.NotifyTip">
      <div class="content">
        <span class="green">Tips：</span>
        <span>{{ msg.content }}</span>
      </div>
    </div>

    <!-- 发消息-文字 -->
    <div class="msg msg-to" v-if="msgType === MsgType.MsgText && store.user?.id === from">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
      <van-image :src="store.user?.avatar" />
    </div>

    <!-- 发消息-图片 -->
    <div class="msg msg-to" v-if="msgType === MsgType.MsgImage && store.user?.id === from">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image @click="showPic(msg.picture?.url!)" fit="contain" :src="msg.picture?.url" />
      </div>
      <van-image :src="store.user?.avatar" />
    </div>

    <!-- 收消息-文字 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgText && store.user?.id !== from">
      <van-image :src="fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
    </div>

    <!-- 收消息-图片 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgImage && store.user?.id !== from">
      <van-image :src="fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image fit="contain" :src="msg.picture?.url" />
      </div>
    </div>

    <!-- 处方消息 -->
    <div class="msg msg-recipe" v-if="msgType === MsgType.CardPre">
      <div class="content" v-if="msg.prescription">
        <div class="head van-hairline--bottom">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p @click="showPrescription(msg.prescription?.id)">
              原始处方 <van-icon name="arrow"></van-icon>
            </p>
          </div>
          <p>
            {{ msg.prescription.name }} {{ msg.prescription.genderValue }}
            {{ msg.prescription.age }}岁 {{ msg.prescription.diagnosis }}
          </p>
          <p>开方时间：{{ msg.prescription.createTime }}</p>
        </div>
        <div class="body">
          <div class="body-item" v-for="med in msg.prescription.medicines" :key="med.id">
            <div class="drug">
              <p>{{ med.name }} {{ med.specs }}</p>
              <p>{{ med.usageDosag }}</p>
            </div>
            <div class="num">x{{ med.quantity }}</div>
          </div>
        </div>
        <div class="foot"><span @click="onBuy(msg?.prescription)">购买药品</span></div>
      </div>
    </div>

    <!-- 订单取消 -->
    <div class="msg msg-tip msg-tip-cancel" v-if="msgType === MsgType.NotifyCancel">
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>

    <!-- 评价医生 -->
    <div
      class="msg msg-comment"
      v-if="msgType === MsgType.CardEva || msgType === MsgType.CardEvaForm"
    >
      <evaluate-card :evaluateDoc="msg.evaluateDoc" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../room.scss';
</style>
