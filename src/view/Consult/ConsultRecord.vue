<script setup lang="ts">
import ConsultList from './components/ConsultList.vue'
import { ConsultType } from '@/enums'
</script>

<template>
  <div class="consult-page">
    <cp-nav-bar title="LIST" />
    <van-tabs sticky>
      <van-tab title="Q&A"> <consult-list :type="ConsultType.Fast" /> </van-tab>
      <van-tab title="LOOK-FOR"><consult-list :type="ConsultType.Doctor" /></van-tab>
      <van-tab title="OTHER"><consult-list :type="ConsultType.Medication" /></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.consult-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 46px);
}
</style>
