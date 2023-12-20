<script setup lang="ts">
import { ref } from 'vue'
import { getKnowledgePageAPI } from '@/services/consult'
import KnowledgeCard from './KnowledgeCard.vue'
import type { KnowledgePage, Knowledge, IKnowledgeType, KnowledgeParams } from '@/types/consult'
import { Empty } from 'vant'

const props = defineProps<{
  type: IKnowledgeType
}>()

const list = ref<Knowledge[]>([])
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const finished = ref(false)
const onLoad = async () => {
  const res = await getKnowledgePageAPI(params.value)
  list.value.push(...res.data.data.rows)
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
}
</script>

<template>
  <div class="knowledge-list">
    <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
      <knowledge-card v-for="item in list" :key="item.id" :item="item" />
    </van-list>
    <Empty image="./x.png" />
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
