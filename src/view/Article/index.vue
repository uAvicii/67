<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { showImagePreview } from 'vant'
import { useI18n } from 'vue-i18n'
import users from '@/mock/index'
import { on } from 'events'
import MTImageEditor from 'mt-image-editor-sdk'

const { t } = useI18n()
const image = ref('') as any
const color = ref('aqua')

const onSubmit = (e: any) => {
  image.value = e.image
}
const showImage = () => {
  showImagePreview({ images: [image.value], showIndex: false })
}
const onClear = () => {
  console.log('onClear')
}
const handerSigning = (e: any) => {
  // 随机颜色
  color.value = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
}
const imgSrc = ref('https://img.yzcdn.cn/vant/cat.jpeg')
// 打开编辑器
const handleOpen = () => {
  MTImageEditor.init({
    moduleName: 'image-editor-sdk', // SDK名称
    accessKey: 'XHGLzWkbBZ9z87s4My03sT4WDRZSKcRd',
    title: 'web',
    el: '', // 默认以弹窗形式展现，指定el后嵌入到指定target
    imageSrc: imgSrc.value, // 初始打开的图片
    fullscreen: true, //是否带有全屏功能
    resizeAble: true // 窗体宽高是否跟随window.onresize变更
  })
}
// 保存图片
MTImageEditor.saveImage((base64, type, id) => {
  console.log(type, id, 33333333333)
  return {
    base64,
    type,
    id
  }
})

const userList = users
// onMounted(async () => {
//   const res = await axios.get('/api/users')
//   userList.value = res.data.data
// })

{
  const arr = [1, 2, 3, 4, 4, 5, 555, 5, 6, 63, 2, 444, 123, 4321]
  // 计算数组中出现相同元素的次数
  const arr1 = arr.reduce((prev: any, cur) => {
    prev[cur] ? prev[cur]++ : (prev[cur] = 1)
    return prev
  }, {})
  console.log(arr1)

  // 使用reduce方法数组去重
  const arr3 = arr.reduce((prev: any, cur) => {
    prev.includes(cur) ? prev : prev.push(cur)
    return prev
  }, [])
  console.log('reduce', arr3)

  const arr2 = arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
  console.log('filter', arr2)

  // arr数组去重
  const arr4 = [...new Set(arr)]
  console.log('Set', arr4)

  // arr数组去重
  const arr5 = Array.from(new Set(arr))
  console.log('Array.from', arr5)

  // foreach方法 arr数组去重
  const arr6: any[] = []
  arr.forEach((item) => {
    if (!arr6.includes(item)) {
      arr6.push(item)
    }
  })
  console.log('foreach', arr6)

  // for循环方法 arr数组去重
  const arr7: any[] = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr7.includes(arr[i])) {
      arr7.push(arr[i])
    }
  }
  console.log('for', arr7)

  // map方法 arr数组去重
  const arr8: any[] = []
  arr.map((item) => {
    if (!arr8.includes(item)) {
      arr8.push(item)
    }
  })
  console.log('map', arr8)

  // some方法 arr数组去重
  const arr9: any[] = []
  arr.some((item) => {
    if (!arr9.includes(item)) {
      arr9.push(item)
    }
  })
  console.log('some', arr9)

  // find方法 arr数组去重
  const arr10: any[] = []
  arr.find((item) => {
    if (!arr10.includes(item)) {
      arr10.push(item)
    }
  })
  console.log('find', arr10)

  // findIndex方法 arr数组去重
  const arr11: any[] = []
  arr.findIndex((item) => {
    if (!arr11.includes(item)) {
      arr11.push(item)
    }
  })
  console.log('findIndex', arr11)

  // indexOf方法 arr数组去重
  const arr12: any[] = []
  arr.forEach((item) => {
    if (arr12.indexOf(item) === -1) {
      arr12.push(item)
    }
  })
  console.log('indexOf', arr12)

  // lastIndexOf方法 arr数组去重
  const arr13: any[] = []
  arr.forEach((item) => {
    if (arr13.lastIndexOf(item) === -1) {
      arr13.push(item)
    }
  })
  console.log('lastIndexOf', arr13)
}

let obj: { age: number; sex?: string } = {
  age: 18
}
obj.sex = '男'
Object.defineProperty(obj, 'name', { value: '张三' })
</script>

<template>
  <div class="article-page">
    <header>{{ t('message.tipsText') }}:</header>
    <van-signature
      @submit="onSubmit"
      @clear="onClear"
      @signing="handerSigning"
      :clear-button-text="t('message.clearText')"
      :confirm-button-text="t('message.submitText')"
      :pen-color="color"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in userList" :key="item.id">
        <img :src="item.imageUrl" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-button @click="handleOpen" type="danger" size="mini">打开编辑器</van-button>
    <van-image @click="showImage" v-if="image" :src="image" />
  </div>
</template>

<style lang="scss" scoped></style>
