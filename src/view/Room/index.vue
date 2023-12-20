<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { MsgType, OrderType } from '@/enums'
import type { ConsultOrderItem } from '@/types/consult'
import { OrderDetailAPI } from '@/services/consult'
import type { Message, TimeMessages } from '@/types/room'
import type { Image } from '@/types/consult'
import { provide } from 'vue'

import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'

const store = useUserStore()
const route = useRoute()

let socket: Socket
const list = ref<Message[]>([])

let consult = ref<ConsultOrderItem>()
const loadDetailData = async () => {
  const res = await OrderDetailAPI(route.query.orderId as string)
  consult.value = res.data.data
}
onMounted(loadDetailData)

// 发送信息需要  发送人  收消息人  消息类型  消息内容
const sendText = (text: string) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: { content: text }
  })
}
const onSendImage = (img: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: { picture: img }
  })
}

const nextTime = ref('')
const loading = ref(false)

onMounted(() => {
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  // 聊天记录
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    loading.value = false
    nextTime.value = data[0]?.items[0].createTime
    //将data里面的items全部push到list里面
    data.forEach((item, i) => {
      list.value.push(...item.items)
    })
  })
  socket.on('statusChange', loadDetailData)
  // 接收消息
  socket.on('receiveChatMsg', async (event) => {
    list.value.push(event)
    nextTick(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
  })
  // 建立连接成功
  socket.on('connect', () => {
    list.value = []
  })
})
provide('consult', consult)
const completeEva = (score: number) => {
  const item = list.value.find((item) => item.msgType === MsgType.CardEvaForm)
  if (item) {
    item.msg.evaluateDoc = { score }
    item.msgType = MsgType.CardEva
  }
}
provide('completeEva', completeEva)
onUnmounted(() => {
  socket.close()
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="ChatPPT" />
    <room-status :status="consult?.status!" :countdown="consult?.countdown" />
    <room-message :list="list" />
    <room-action
      :disabled="consult?.status !== OrderType.ConsultChat"
      @send-text="sendText"
      @send-image="onSendImage"
    />
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}

::v-deep .van-nav-bar__placeholder {
  height: 0 !important;
}
</style>
