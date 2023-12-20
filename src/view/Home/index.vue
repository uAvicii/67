<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue'
import type { Ref } from 'vue'
import KnowledgeList from './components/KnowledgeList.vue'
import FollowDoctor from './components/FollowDoctor.vue'
import { useUserStore, useConsultStore, useLangueStore } from '@/stores'
import { ConsultType } from '@/enums'
import type { IKnowledgeType } from '@/types/consult'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import VanillaTilt from 'vanilla-tilt'
import { showImagePreview, showToast, showFailToast } from 'vant'
import OpenAI from 'openai'
import moment from 'moment'

const { t, locale } = useI18n()
const store = useUserStore()
const stores = useConsultStore()
const langStores = useLangueStore()

const active = ref<IKnowledgeType>('recommend') // tab
let values = ref('') // 搜索框值
let showCenter = ref(false) // 显示搜索结果
let historyList = ref<string[]>([]) // 历史记录列表
const searchResult = ref('') // 搜索结果
const isShow = ref(false) // loading
const showPopover = ref(false) // 历史记录显示
let actions = ref<any[]>([]) // 历史记录列表
const showHistory = ref(false) // 显示历史记录
const searchs = ref<Ref | null>(null) // ref
const progress = ref(0)

const key = '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' // openAI
const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true }) // openAI 实例
let synth = window.speechSynthesis // 语音合成器

// 文字转语音
const tts = (text: string) => {
  // 创建一个新的语音合成器

  // 创建一个文本到语音的请求
  // let text = 'Hello, this is a text-to-speech example.'
  let utterance = new SpeechSynthesisUtterance(text)

  // 设置语音选项（可选）
  utterance.rate = 1 // 语速，1为正常速度
  utterance.pitch = 1 // 音调，1为正常音调
  // 播放文本
  synth.speak(utterance)
}

// 语音转文字
const stt = async (e: any) => {
  showToast('开发中 敬请期待..')
}

//openAI Create image
async function createImg() {
  if (!values.value) return
  tts('正在生成图片,please wait')
  isShow.value = true
  store.saveSearchHistory(values.value)
  try {
    const images = await openai.images.generate({ prompt: values.value })
    if (images) isShow.value = false
    showImagePreview({
      images: [images.data[0].url] as any,
      showIndex: false,
      onClose() {
        values.value = ''
      }
    })
  } catch (error) {
    isShow.value = false
    showFailToast('生成图片失败,请重试')
  }
}

// 聚焦 显示 历史记录
const onFocus = () => {
  setTimeout(() => {
    if (values.value) return (showPopover.value = false)
    showPopover.value = true

    actions.value = store.searchHistory
      .map((item: any) => {
        return { text: item }
      })
      .reverse()
      .slice(0, 7)
  })
}

// 输入框值改变
const updateValues = (value: string) => {
  showPopover.value = true
  actions.value = actions.value.filter((item: any) => {
    return item.text.indexOf(value) > -1
  })

  if (!value) {
    actions.value = store.searchHistory.slice(0, 9).map((item: any) => {
      return { text: item }
    })
  }
}

// 历史记录选中
const onSelect = async (e: any) => {
  values.value = e.text
  // 聚焦
  searchs.value!.focus()

  await nextTick()

  const inputElement = searchs.value.$el.querySelector('input') // 获取输入框的 DOM 元素
  const inputValueLength = inputElement.value.length
  inputElement.selectionStart = inputValueLength // 将光标位置设置到输入框的末尾
  inputElement.selectionEnd = inputValueLength
}

// 搜索 chatGPT 
const onSearch = async (value: string) => {
  if (!value) return showFailToast('please input')
  isShow.value = true
  const time = moment().format('YYYY-MM-DD HH:mm:ss')
  store.saveSearchHistory(value)
  const completion = await openai.chat.completions
    .create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: value }],
      temperature: 0.8,
      max_tokens: 256
    })
    .catch((err) => {
      isShow.value = false
      showFailToast(err.message)
      return
    })
  if (completion) {
    isShow.value = false
    showCenter.value = true
    searchResult.value = completion?.choices[0].message.content as string
    tts(searchResult.value)

    historyList.value = store.searchHistory
  }
}

// 关闭历史记录弹窗
const handerClose = () => {
  // 清空搜索框
  values.value = ''
  // 停止语言播报
  synth.cancel()
}

// 国际化
const handerChangeL = () => {
  let lang = locale.value === 'en' ? 'zh' : 'en'
  langStores.saveLangue(lang)
  locale.value = lang
}

// 静态资源动态引入 轮播图
let imgList = (index: number) => {
  return new URL(`../../assets/pepe${index}.jpg`, import.meta.url) as unknown as string as any
}
const showimageUrl = (i: any) => {
  showImagePreview({
    images: [imgList(i)?.href],
    showIndex: false
  })
}

// 监听页面滚动条滚动事件
window.addEventListener('scroll', () => {
  // 获取页面滚动条滚动距离
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 获取页面滚动条总高度
  let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  // 获取窗口可视范围高度
  let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  // 滚动条到底部的条件
  if (scrollTop + clientHeight >= scrollHeight) {
    // 滚动条到底部了
    progress.value = 100
  } else {
    // 滚动条没有到底部
    progress.value = (scrollTop / (scrollHeight - clientHeight)) * 100
  }
})

// 动画
onMounted(() => {
  const element = document.querySelector('.box-item') as HTMLElement | null
  const elements = Array.from(document.querySelectorAll('.box-item')) as HTMLElement[]
  if (element) {
    VanillaTilt.init(element, {
      max: 100,
      speed: 400
    })
  }
  if (elements.length > 0) {
    elements.forEach((el) => {
      VanillaTilt.init(el, {
        max: 100,
        speed: 400
      })
    })
  }
})
</script>

<template>
  <div class="home-page">
    <div class="home-header">
      <div class="con">
        <h1 @click="handerChangeL">{{ $t('home.title') }}</h1>
        <van-popover
          class="vanPopover"
          v-model:show="showPopover"
          :actions="actions"
          @select="onSelect"
          placement="bottom-start"
          style="width: 300px"
        >
          <template #reference>
            <van-search
              class="search"
              ref="searchs"
              autocomplete="off"
              show-action
              shape="round"
              v-model="values"
              @update:model-value="updateValues"
              @focus="onFocus"
              @blur="showPopover = false"
              @search="onSearch"
              :placeholder="t('home.searchText')"
            >
              <template #right-icon>
                <CpIcon @click="stt" name="home-mc" />
              </template>
              <template #action>
                <div @click="createImg" class="GenImg">TGPI</div>
              </template>
            </van-search>
          </template>
        </van-popover>
      </div>
    </div>

    <div class="home-navs">
      <van-row>
        <van-col span="8" class="box-item">
          <router-link to="/sunny" class="nav">
            <cp-icon name="home-bicycle"></cp-icon>
            <p class="title">{{ t('home.userText') }}</p>
            <p class="desc">{{ t('home.userText2') }}</p>
          </router-link>
        </van-col>
        <van-col span="8" class="box-item">
          <router-link to="/consult/fast" @click="stores.setType(ConsultType.Fast)" class="nav">
            <cp-icon name="home-olympic"></cp-icon>
            <p class="title">{{ t('home.oText') }}</p>
            <p class="desc">{{ t('home.oText2') }}</p>
          </router-link>
        </van-col>
        <van-col span="8" class="box-item">
          <router-link to="/sos" class="nav">
            <cp-icon name="home-tree" class="zhiYin"></cp-icon>
            <p class="title">{{ t('home.rText') }}</p>
            <p class="desc">{{ t('home.rText2') }}</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6" class="box-item">
          <router-link to="/text" class="nav min">
            <cp-icon name="home-goggles"></cp-icon>
            <p class="title">{{ t('home.bannerText1') }}</p>
          </router-link>
        </van-col>
        <van-col span="6" class="box-item">
          <a href="/test/timing.html" class="nav min">
            <cp-icon name="home-baseball"></cp-icon>
            <p class="title">{{ t('home.bannerText2') }}</p>
          </a>
        </van-col>
        <van-col span="6" class="box-item">
          <router-link to="/" class="nav min">
            <cp-icon name="home-boxing"></cp-icon>
            <p class="title">{{ t('home.bannerText3') }}</p>
          </router-link>
        </van-col>
        <van-col span="6" class="box-item">
          <router-link to="/" class="nav min">
            <cp-icon name="home-kayak"></cp-icon>
            <p class="title">{{ t('home.bannerText4') }}</p>
          </router-link>
        </van-col>
      </van-row>
    </div>

    <div class="home-banner">
      <van-swipe indicator-color="#fff" :autoplay="2000">
        <van-swipe-item v-for="index in 9" :key="index">
          <img :src="imgList(index)" @click="showimageUrl(index)" />
          <!-- <img :src="'./src/assets/pepe'+index+'.jpg'" /> -->
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-tabs shrink sticky v-model:active="active">
      <van-tab :title="t('home.tabText1')" name="like">
        <!-- <follow-doctor></follow-doctor> -->
        <KnowledgeList type="like" />
      </van-tab>
      <van-tab :title="t('home.tabText2')" name="recommend"
        ><KnowledgeList type="recommend"
      /></van-tab>
      <van-tab :title="t('home.tabText3')" name="fatReduction"
        ><KnowledgeList type="fatReduction"
      /></van-tab>
      <van-tab :title="t('home.tabText4')" name="food"><KnowledgeList type="food" /></van-tab>
    </van-tabs>

    <van-overlay :show="isShow">
      <van-loading />
    </van-overlay>
    <van-popup v-model:show="showCenter" @close="handerClose" round class="popup"
      >{{ searchResult }}
      <van-button type="primary" size="mini" @click="showHistory = true"
        >历史记录</van-button
      ></van-popup
    >
    <van-popup
      v-model:show="showHistory"
      :style="{ marginTop: '200px', maxHeight: '300px' }"
      round
      position="center"
    >
      {{ historyList }}</van-popup
    >
    <van-back-top right="7.5vw" bottom="15vh" />

    <div class="progressBar"></div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;
  ::v-deep() {
    .van-search {
      padding: 0;
      width: 345px;
      transform: translateY(-10px);
      background-color: transparent;
    }
  }
}
.home-header {
  height: 100px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg, #ef9ac6, #e3ebf5);
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  .con {
    position: relative;
    padding: 0 15px;
    > h1 {
      font-size: 18px;
      color: #fff;
      font-weight: normal;
      padding: 20px 0;
      line-height: 1;
      // float: right;
      display: inline-block;
    }
    .search {
      position: relative;
      .cp-icon {
        font-size: 16px;
        margin-right: 5px;
      }
      // &::after {
      //   content: url('@/icons/home/mc.svg');
      //   position: absolute;
      //   right: -3%;
      //   transform: scale(0.13);
      // }
      .cp-icon {
        font-size: 20px;
        margin-top: 5px;
      }
      .GenImg {
        font-weight: 700;
      }
    }
  }
}

.home-navs {
  padding: 10px 15px 0 15px;
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .cp-icon {
      font-size: 48px;
    }
    .zhiYin {
      animation: zhiYin 2s infinite;
    }
    @keyframes zhiYin {
      0% {
        transform: scale(1);
      }
      25% {
        transform: translate(10px, -10px);
      }
      50% {
        transform: translate(0, 0);
      }
      75% {
        transform: translate(-10px, -10px);
      }
      100% {
        transform: scale(1);
      }
    }
    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--cp-text1);
    }
    .desc {
      font-size: 11px;
      color: var(--cp-tag);
      margin-top: 2px;
    }
    &.min {
      .cp-icon {
        font-size: 31px;
      }
      .title {
        font-size: 13px;
        color: var(--cp-text2);
        font-weight: normal;
      }
    }
  }
}

.home-banner {
  padding: 10px 15px;
  height: 200px;
  img {
    width: 100%;
    height: 200px;
  }
}
::v-deep .van-popup {
  width: 300px;
  max-height: 500px;
  // 换行
  white-space: pre-wrap;
  word-wrap: break-word;

  background-color: aqua;
  padding: 5px 5px;
  transform: translateY(-244.2px);
}
::v-deep .van-overlay {
  z-index: 999999;
}
::v-deep .van-loading {
  position: absolute;
  left: 51%;
  top: 19%;
  transform: translateX(-50%);
}

.progressBar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background-color: #0a74da;
  width: v-bind("progress + '%'");
  z-index: 9999999999;
}
</style>

<style lang="scss">
.van-popup.vanPopover {
  top: 90px !important;
  .van-popover__content {
    width: 74vw;
    // background: linear-gradient(180deg, #e3ebf5, #ef9ac6);
    background-color: #f7f8fa;
    .van-popover__action {
      width: 100%;
      height: auto;
      // background-color: #e3e9f4;
      &:hover {
        background-color: aqua;
      }
      &::before {
        content: url('');
        position: absolute;
        left: 13px;
        background-image: url('@/assets/history.svg');
        background-size: contain;
        background-repeat: no-repeat;
        display: inline-block;
        width: 15px;
        height: 15px;
      }
      .van-popover__action-text {
        justify-content: start;
        // height: 30px;
        line-height: 30px;
        padding-left: 20px;
        // 文字溢出 显示省略号 一行显示
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
.van-tabs {
  .van-tab {
    padding: 0 8px;
  }
  .van-tabs__line {
    width: 30px;
    background-color: var(--cp-primary);
  }
}
.van-back-top {
  background-color: #ebb0d3;
}
</style>
