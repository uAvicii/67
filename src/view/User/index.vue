<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserInfoAPI } from '@/services/user'
import { uploadImageAPI } from '@/services/consult'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showImagePreview, showToast, showFailToast } from 'vant'
import type { User } from '@/types/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const store = useUserStore()
const userInfo = ref<User>({} as User)

const loadData = async () => {
  const res = await getUserInfoAPI()
  userInfo.value = res.data.data
}

const tools = [
  { label: t('user.label1'), path: '/consult' },
  { label: t('user.label2'), path: '/snake' },
  { label: t('user.label3'), path: '/patient' },
  { label: t('user.label4'), path: '/map' }
]

const loginOut = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '您确认要退出佩吗？',
    cancelButtonText: '取消',
    confirmButtonText: '确认'
  })
  store.delUser()
  router.push('/login')
}

const goDetail = (path: any) => {
  router.push(path)
}

const show = ref(false)
const actions = [{ name: t('user.avatarText1') }, { name: t('user.avatarText2') }]
const onSelect = (i: any) => {
  if (i.name == t('user.avatarText1')) {
    showImagePreview({ images: [avatarUrl.value!], showIndex: false })
  } else {
    if (!store.avatar.length) return showToast(t('user.avatarText4'))
    if (store.avatar.length == 1)
      return showImagePreview({ images: [store.avatar[store.avatar.length - 1]], showIndex: false })
    showImagePreview({ images: [store.avatar[store.avatar.length - 2]], showIndex: false })
  }
  show.value = false
}
const handerAvata = () => {
  show.value = true
}
const fileList = ref([])

const onAfterRead = async (file: any) => {
  // 通过 FileReader 将图片转换成 URL
  const reader = new FileReader()
  reader.onload = (event) => {
    // 上传接口
    uploadImageAPI(file.file).then((res: any) => {
      localStorage.setItem('avatarUrl', res?.data.data.url)
      store.saveAvatar(res?.data.data.url)
      avatarUrl.value = res?.data.data.url
    })
  }
  reader.readAsDataURL(file.file)

  // 图片列表置空
  fileList.value = []
  // 下拉框隐藏
  show.value = false
}
onMounted(loadData)
let paddingHeight = ref('20px')
onMounted(() => {
  // 根据不同的视口高度设置不同的padding-bottom值
  const height = window.innerHeight
  let heightToPaddingMap = {
    0: '20px',
    667: '25px',
    736: '60px',
    812: '85px',
    896: '100px',
    926: '120px'
  }
  const paddingHeightValue: string | undefined = Object.entries(heightToPaddingMap)
    .find(([minHeight]) => height <= Number(minHeight))
    ?.pop()
  paddingHeight.value = paddingHeightValue || '20px'
})

let avatarUrl = ref('')
onMounted(() => {
  avatarUrl.value =
    localStorage.getItem('avatarUrl') ||
    'https://p26-passport.byteacctimg.com/img/user-avatar/3227254b000ad5e103c72b91365dd4a0~90x90.awebp'
  // 'https://www.google.com/logos/doodles/2023/celebrating-the-first-landing-on-the-moons-south-pole-6753651837110163.2-2xa.gif'
})
</script>

<template>
  <div class="user-page" v-if="userInfo">
    <div class="user-page">
      <div class="user-page-head">
        <div class="top">
          <van-image round fit="cover" @click="handerAvata" :src="avatarUrl" />
          <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect">
            <van-uploader v-model="fileList" :after-read="onAfterRead">
              <van-button>{{ t('user.avatarText3') }}</van-button>
            </van-uploader>
          </van-action-sheet>
          <div class="name">
            <p>{{ userInfo.account }}</p>
            <p><van-icon name="edit" /></p>
          </div>
        </div>
        <van-row>
          <van-col span="6">
            <p>{{ userInfo.collectionNumber }}</p>
            <p>{{ t('user.tip1') }}</p>
          </van-col>
          <van-col span="6">
            <p>{{ userInfo.likeNumber }}</p>
            <p>{{ t('user.tip2') }}</p>
          </van-col>
          <van-col span="6">
            <p>{{ userInfo.score }}</p>
            <p>{{ t('user.tip3') }}</p>
          </van-col>
          <van-col span="6">
            <p>{{ userInfo.couponNumber }}</p>
            <p>{{ t('user.tip4') }}</p>
          </van-col>
        </van-row>
      </div>
      <div class="user-page-order">
        <div class="head">
          <h3>{{ $t('user.title') }}</h3>
          <router-link to="/">{{ t('user.littleTitle') }} <van-icon name="arrow" /></router-link>
        </div>
        <van-row>
          <van-col span="6">
            <van-badge :content="userInfo.orderInfo?.paidNumber || ''">
              <cp-icon name="user-paid" />
            </van-badge>
            <p>{{ $t('user.orderStatus1') }}</p>
          </van-col>
          <van-col span="6">
            <van-badge :content="userInfo.orderInfo?.shippedNumber || ''">
              <cp-icon name="user-shipped" />
            </van-badge>
            <p>{{ t('user.orderStatus2') }}</p>
          </van-col>
          <van-col span="6">
            <van-badge :content="userInfo.orderInfo?.receivedNumber || ''">
              <cp-icon name="user-received" />
            </van-badge>
            <p>{{ t('user.orderStatus3') }}</p>
          </van-col>
          <van-col span="6">
            <van-badge :content="userInfo.orderInfo?.finishedNumber || ''">
              <cp-icon name="user-finished" />
            </van-badge>
            <p>{{ t('user.orderStatus4') }}</p>
          </van-col>
        </van-row>
      </div>
      <div class="user-page-group">
        <h3>{{ t('user.subTitle') }}</h3>
        <van-cell
          :title="item.label"
          is-link
          :to="item.path"
          :border="false"
          v-for="(item, i) in tools"
          :key="i"
          @click="goDetail(item.path)"
        >
          <template #icon><cp-icon :name="`user-tool-0${i + 1}`" /></template>
        </van-cell>
      </div>
      <a class="logout" href="javascript:;" @click="loginOut">{{ t('user.logOut') }}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  // min-height: calc(100vh - 150px);
  padding: 0 7.5px v-bind(paddingHeight);
  // 头部
  &-head {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;
    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;
      .van-image {
        width: 70px;
        height: 70px;
      }
      .name {
        padding-left: 10px;
        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
      ::v-deep .van-popup--bottom.van-popup--round {
        border-radius: 8px 8px 0 0;
      }
      ::v-deep .van-uploader {
        width: 100%;
        text-align: center;
        .van-uploader__input-wrapper {
          width: 100%;
        }
        .van-button {
          border: none;
          font-size: 16px;
        }
      }
    }
    .van-row {
      margin: 0 -15px;
      padding-top: 15px;
      p {
        text-align: center;
        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }
        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  // 订单
  &-order {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      a {
        color: var(--cp-tip);
      }
    }
    .van-col {
      text-align: center;
      .cp-icon {
        font-size: 28px;
      }
      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }
  // 分组
  &-group {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
  }
}
</style>
