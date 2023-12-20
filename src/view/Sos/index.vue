<script setup lang="ts">
import logo from '@/assets/logo.svg'
import xhz from '@/assets/xhz.jpg'
import { ref } from 'vue'
const onIkun = (e: MouseEvent) => {}
</script>

<template>
  <div class="body">
    <img :src="logo" alt="" class="zhiYin" />
    <div class="content">
      <div class="kun"></div>
      <div class="backKun"></div>
      <div class="shade"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body {
  padding: 20px;
}
.zhiYin {
  animation: zhiYin 2s infinite;
}
@keyframes zhiYin {
  0% {
    transform: scale(1);
  }
  25% {
    transform: translate(20px, -20px);
  }
  50% {
    transform: translate(0, 0);
  }
  75% {
    transform: translate(-20px, -20px);
  }
  100% {
    transform: scale(1);
  }
}
.content {
  position: relative;
}
.kun {
  display: none;
  width: 75px;
  height: 75px;
  background-color: #ff7802;
  border-radius: 50%;
  animation: ikun 1s infinite;
  position: absolute;
  top: -100px;
  left: 12%;
}
@keyframes ikun {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);

    background-color: purple;
    transform: translateY(120px);
  }
  100% {
    transform: scale(1);
  }
}
.backKun {
  width: 75px;
  height: 75px;
  background-color: #ff7802;
  border-radius: 50%;
  animation: backIkun 2s ease infinite;
  position: absolute;
  top: -100px;
  left: 12%;
}
@keyframes backIkun {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1);
    transform: translate(120px, 180px);
  }
  50% {
    transform: scale(1.2);
    background-color: gold;
    transform: translate(240px, -120px);
  }
  75% {
    transform: scale(1);
    transform: translate(120px, 180px);
  }
  100% {
    transform: scale(1);
  }
}

.shade {
  position: absolute;
  top: 150px;
  left: 50%;
  width: 40px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(#666, transparent 50%);
  animation: shadeMove 1s infinite;
  transform: scale(2);
}
@keyframes shadeMove {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
