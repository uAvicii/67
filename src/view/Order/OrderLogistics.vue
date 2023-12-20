<!-- 物流信息 -->
<script setup lang="ts">
import { getLogisticsAPI } from '@/services/order'
import endImg from '@/assets/end.png'
import startImg from '@/assets/start.png'
import carImg from '@/assets/car.png'
import type { Logistics } from '@/types/order'
import { onMounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useRoute } from 'vue-router'

window._AMapSecurityConfig = {
  securityJsCode: '415e917da833efcf2d5b69f4d821784b'
}
// 获取物流信息
const logistics = ref<Logistics>()
const route = useRoute()
onMounted(async () => {
  const res = await getLogisticsAPI(route.params.id as string)
  logistics.value = res.data.data

  // 加载地图
  AMapLoader.load({
    key: '4eed3d61125c8b9c168fc22414aaef7e',
    version: '2.0',
    plugins: ['AMap.Driving']
  }).then((AMap) => {
    // 使用 Amap 初始化地图
    const map = new AMap.Map('map', {
      mapStyle: 'amap://styles/whitesmoke',
      zoom: 12
    })

    AMap.plugin('AMap.Driving', function () {
      const driving = new AMap.Driving({
        map: map,
        showTraffic: false,
        hideMarkers: true
      })

      // 起点
      const start = res.data.data.logisticsInfo.shift()
      const startMarker = new AMap.Marker({
        position: [start?.longitude, start?.latitude],
        icon: startImg
      })
      map.add(startMarker)
      // 终点
      const end = res.data.data.logisticsInfo.pop()
      const endMarker = new AMap.Marker({
        position: [end?.longitude, end?.latitude],
        icon: endImg
      })
      map.add(endMarker)

      // 3. 添加车的图标
      const carMarker = new AMap.Marker({
        icon: carImg,
        position: [
          logistics.value?.currentLocationInfo.longitude,
          logistics.value?.currentLocationInfo.latitude
        ]
      })
      map.add(carMarker)
      driving.search(
        [start?.longitude, start?.latitude],
        [end?.longitude, end?.latitude],
        {
          waypoints: res.data.data.logisticsInfo.map((item: any) => [item.longitude, item.latitude])
        },
        function () {
          // 3s后，定位到货车，放大地图
          setTimeout(() => {
            map.setFitView([carMarker])
            map.setZoom(10)
          }, 3000)
        }
      )
    })
  })
})
</script>

<template>
  <div class="order-logistics-page">
    <div id="map">
      <div class="title">
        <van-icon name="arrow-left" @click="$router.back()" />
        <span>{{ logistics?.statusValue }}</span>
        <van-icon name="service" />
      </div>
      <div class="current">
        <p class="status">{{ logistics?.statusValue }} 预计{{ logistics?.estimatedTime }}送达</p>
        <p class="predict">
          <span>{{ logistics?.name }}</span>
          <span>{{ logistics?.awbNo }}</span>
        </p>
      </div>
    </div>
    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="item in logistics?.list" :key="item.id">
          <p class="status" v-if="item.statusValue">{{ item.statusValue }}</p>
          <p class="content">{{ item.content }}</p>
          <p class="time">{{ item.createTime }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-logistics-page {
  --van-step-icon-size: 18px;
  --van-step-circle-size: 10px;
}
#map {
  height: 450px;
  background-color: var(--cp-bg);
  overflow: hidden;
  position: relative;
  .title {
    background-color: #fff;
    height: 46px;
    width: 355px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 16px;
    position: absolute;
    left: 10px;
    top: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 999;
    > span {
      flex: 1;
      text-align: center;
    }
    .van-icon {
      font-size: 18px;
      color: #666;
      &:last-child {
        color: var(--cp-primary);
      }
    }
  }
  .current {
    height: 80px;
    border-radius: 4px;
    background-color: #fff;
    height: 80px;
    width: 355px;
    box-sizing: border-box;
    padding: 15px;
    position: absolute;
    left: 10px;
    bottom: 10px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    z-index: 999;
    .status {
      font-size: 15px;
      line-height: 26px;
    }
    .predict {
      color: var(--cp-tip);
      font-size: 13px;
      margin-top: 5px;
      > span {
        padding-right: 10px;
      }
    }
  }
}
.logistics {
  padding: 0 10px 20px;
  .title {
    font-size: 16px;
    padding: 15px 5px 5px;
  }
  .van-steps {
    :deep(.van-step) {
      &::after {
        display: none;
      }
    }
    .status {
      font-size: 15px;
      color: var(--cp-text3);
      margin-bottom: 4px;
    }
    .content {
      font-size: 13px;
      color: var(--cp-tip);
      margin-bottom: 4px;
    }
    .time {
      font-size: 13px;
      color: var(--cp-tag);
    }
  }
}
</style>
