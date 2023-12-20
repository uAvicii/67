<script setup lang="ts"></script>

<template>
  <div class="layout-page">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <template #icon="{ active }">
          <!-- <cp-icon :name="active ? 'home-index-active' : 'home-index-default'" /> -->
          <!-- <cp-icon :name="active ? 'home-alarm_clock-active' : 'home-alarm_clock-default'" /> -->
          <cp-icon :name="`home-voicemail-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">
        <template #icon="{ active }">
          <!-- <cp-icon :name="`home-binoculars-${active ? 'active' : 'default'}`" /> -->
          <cp-icon :name="`home-customer_support-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/notify">
        <template #icon="{ active }">
          <!-- <cp-icon :name="`home-notice-${active ? 'active' : 'default'}`" /> -->
          <cp-icon :name="`home-copyright-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <template #icon="{ active }">
          <!-- <cp-icon :name="`home-mine-${active ? 'active' : 'default'}`" /> -->
          <cp-icon :name="`home-trademark-${active ? 'active' : 'default'}`" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .van-tabbar {
  height: 55px;
  .van-tabbar-item {
    line-height: 10px;
    .cp-icon{
      font-size: 27px;
    }
  }
}
</style>
