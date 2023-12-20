<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const count = ref(1)
const btnColor = ref('rgb(0,0,0)')
const bgcColor = ref('rgb(233,233,233)')
const lightColor = ref('rgb(255,255,255)')
// 随机颜色方法
const randomColor = (type: number) => {
  lightColor.value = lightColor.value === 'rgb(255,255,255)' ? 'rgb(0,0,0)' : 'rgb(255,255,255)'
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  if (type == 1) {
    count.value *= 2
    bgcColor.value = `rgb(${r},${g},${b})`
  } else {
    btnColor.value = `rgb(${r},${g},${b})`
  }
}
// 定时器
const timer = setInterval(() => {
  randomColor(1)
}, 1000 * 10)
//navBar组件
const text = 'click me'
const title = 'HelloPepe'
const goGoogle = () => {
  window.open('https://www.google.com')
}
const goLogin = () => {
  router.push('/login')
}
</script>

<template>
  <CpNavBar :right-text="text" :title="title" @click-right="goGoogle" @back="goLogin" />
  <div class="body">
    <div class="top">
      <h1>Hello world</h1>
      <h3>{{ count }}<button @click="randomColor(1)">click</button></h3>
    </div>
    <div class="text_box">
      <van-button type="primary" @click="randomColor(2)">Button</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body {
  background-color: v-bind(lightColor);
  height: 100vh;
  .top {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    text-align: center;
    background-color: v-bind(btnColor);
    color: red;
    h3 {
      color: blue;
      button {
        color: red;
        margin-left: 10px;
      }
    }
  }
  .text_box {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    background-color: v-bind(bgcColor);
    text-align: center;
    line-height: 300px;
  }
}
</style>
