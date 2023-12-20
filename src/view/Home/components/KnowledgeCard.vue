<script setup lang="ts">
import { showImagePreview } from 'vant'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import edc1 from '@/assets/edc1.jpg'
import edc2 from '@/assets/edc2.jpg'
import edc3 from '@/assets/edc3.jpg'
const { t } = useI18n()
const showPhoto = (url: string) => {
  showImagePreview({
    images: [url],
    showIndex: false
  })
}
const imgList = [edc3, edc1, edc2]

let focus = ref(false)
const handerFocus = () => {
  focus.value = !focus.value
}
</script>

<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <van-image round class="avatar" src="./x.png"></van-image>
      <div class="info">
        <p class="name">{{ t('home.cardTittle') }}</p>
        <p class="dep van-ellipsis">{{ t('home.cardPlace') }}</p>
      </div>
      <van-button
        class="btn"
        size="small"
        plain
        round
        :color="focus ? 'pink' : 'hotpink'"
        @click="handerFocus"
      >
        {{ focus ? t('home.cardTip2') : '+' + t('home.cardTip') }}</van-button
      >
    </div>
    <div class="body">
      <h3 class="title van-ellipsis">{{ t('home.cardNav') }}</h3>
      <p class="tag">
        <span># {{ t('home.cardTag1') }}</span>
        <span># {{ t('home.cardTag2') }}</span>
        <span># {{ t('home.cardTag3') }}</span>
      </p>
      <!-- <p class="intro">{{ t('home.cardContent') }}</p> -->
      <van-text-ellipsis
        class="intro"
        rows="4"
        :content="t('home.cardContent')"
        :expand-text="t('home.cardOpen')"
        :collapse-text="t('home.cardColse')"
      />
      <div class="imgs">
        <van-image v-for="i in imgList" :key="i" :src="i" @click="showPhoto(i)" />
      </div>
      <p class="logs">
        <span>10 收藏</span>
        <span>50 评论</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-card {
  padding: 20px 0 16px;
  .head {
    display: flex;
    align-items: center;
    .avatar {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }
    .info {
      width: 200px;
      padding-right: 10px;
      .name {
        color: var(--cp-text2);
      }
      .dep {
        color: var(--cp-tip);
        font-size: 12px;
      }
    }
    .btn {
      padding: 0 12px;
      border-color: var(--cp-primary);
      color: var(--cp-primary);
      height: 28px;
      width: 72px;
    }
  }
  .body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: normal;
    }
    .tag {
      margin-top: 6px;
      > span {
        color: var(--cp-primary);
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .intro {
      margin-top: 7px;
      line-height: 2;
      color: var(--cp-text3);
    }
    .imgs {
      margin-top: 7px;
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 12px;
        border-radius: 12px;
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
      }
      &.large {
        .van-image {
          width: 185px;
          height: 125px;
        }
      }
    }
    .logs {
      margin-top: 10px;
      > span {
        color: var(--cp-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
