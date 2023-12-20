<script setup lang="ts">
import { ConsultType } from '@/enums'
import { getOrderRecordsAPI } from '@/services/consult'
import type { ConsultOrderItem, ConsultOrderListParams } from '@/types/consult'
import { ref } from 'vue'
import ConsultItem from './ConsultItem.vue'

const props = defineProps<{ type: ConsultType }>()
const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const loading = ref(false)
const finished = ref(false)
const list = ref<ConsultOrderItem[]>([])
const onDel = (id: string) => {
  list.value = list.value.filter((item) => item.id !== id)
  onLoad()
}
const onLoad = async () => {
  const res = await getOrderRecordsAPI(params.value)

  list.value.push(...res.data.data.rows)
  if (params.value.current < res.data.data.pageTotal) {
    params.value.current++
  } else {
    finished.value = true
  }
  loading.value = false
}
</script>

<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      @on-del="onDel"
    >
      <consult-item v-for="i in list" :key="i?.id" :item="i"></consult-item>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
