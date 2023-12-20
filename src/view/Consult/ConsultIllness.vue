<script setup lang="ts">
import { IllnessTime } from '@/enums'
import { formData } from '@/stores'
import type { UploaderFileListItem } from 'vant'
import { Uploader } from 'vant/es/uploader'
import { showConfirmDialog } from 'vant'
import { useConsultStore } from '@/stores'
import { useRouter } from 'vue-router'
import { uploadImageAPI } from '@/services/consult'
import { computed, watch, ref, onMounted } from 'vue'
const store = useConsultStore()
const router = useRouter()
type UploadFile = (typeof Uploader)['file']
const timeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '大于半年', value: IllnessTime.More }
]
const flagOptions = [
  { label: '就诊过', value: 0 },
  { label: '没就诊过', value: 1 }
]

const fileList = ref<UploaderFileListItem[]>([])

type UploaderAfterRead = (item: UploadFile) => void
const onAfterRead: UploaderAfterRead = (item: any) => {
  if (Array.isArray(item)) return
  if (!item.file) return
  // 开始上传
  item.status = 'uploading'
  item.message = '上传中...'
  uploadImageAPI(item.file)
    .then((res: any) => {
      item.status = 'done'
      item.message = undefined
      item.url = res.data.data.url
      formData.value.pictures?.push(res.data.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}

const onDelete = (item: UploaderFileListItem) => {
  formData.value.pictures = formData.value.pictures?.filter((pic: any) => pic.url !== item.url)
}

const disabled = computed(
  // illnessDesc consultFlag illnessTime均为必选
  () =>
    !formData.value.illnessDesc ||
    formData.value.illnessTime === undefined ||
    formData.value.consultFlag === undefined
)

const onNext = () => {
  store.setIllness(formData.value)
  // 跳转档案管理（复用），需要根据 isSelect 实现选择功能
  router.push('/patient?isSelect=1')
}

// 回显数据
onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的信息呢？',
      confirmButtonColor: 'var(--cp-primary)'
    }).then(() => {
      // 回显数据
      formData.value = store.consult
      // 回显图片
      fileList.value = store.consult.pictures || []
    })
  }
})
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文咨询" />
  </div>

  <!-- 医生提示 -->
  <div class="illness-tip van-hairline--bottom">
    <img class="img" src="@/assets/avatar-doctor.svg" />
    <div class="info">
      <p class="tit">在线killer</p>
      <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
      <p class="safe"><cp-icon name="consult-safe" /><span>内容仅killer可见</span></p>
    </div>
  </div>

  <!-- 表单 -->
  <div class="illness-form">
    <van-field
      type="textarea"
      rows="3"
      placeholder="请详细描述您的病情，病情描述不能为空"
      v-model="formData.illnessDesc"
    />
    <div class="item">
      <p>本次患病多久了？</p>
      <cp-radio-btn :options="timeOptions" v-model="formData.illnessTime" />
    </div>
    <div class="item">
      <p>此次病情是否去医院就诊过？</p>
      <cp-radio-btn :options="flagOptions" v-model="formData.consultFlag" />
    </div>
    <!-- 图片上传区域 -->
    <div class="illness-img">
      <van-uploader
        v-model="fileList"
        upload-icon="photo-o"
        upload-text="上传图片"
        max-count="9"
        :max-size="5 * 1024 * 1024"
        :after-read="onAfterRead"
        @delete="onDelete"
      />
      <p class="tip" v-show="!fileList.length">上传内容仅医生可见,最多9张图,最大5MB</p>
    </div>
    <van-button @click="onNext" :class="{ disabled: disabled }" type="primary" block round
      >下一步</van-button
    >
  </div>
</template>

<style lang="scss" scoped>
.illness-tip {
  display: flex;
  padding: 15px;
  .img {
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
  }
  .info {
    flex: 1;
    padding-left: 12px;
    .tit {
      font-size: 16px;
      margin-bottom: 5px;
    }
    .tip {
      padding: 12px;
      background: var(--cp-bg);
      color: var(--cp-text3);
      font-size: 13px;
      margin-bottom: 10px;
    }
    .safe {
      font-size: 10px;
      color: var(--cp-text3);
      display: flex;
      align-items: center;
      .cp-icon {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
}

.illness-form {
  padding: 15px;
  .van-field {
    padding: 0;
    &::after {
      border-bottom: none;
    }
  }
  .item {
    > p {
      color: var(--cp-text3);
      padding: 15px 0;
    }
  }
}

.illness-img {
  padding-top: 16px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  .tip {
    font-size: 12px;
    color: var(--cp-tip);
  }
  ::v-deep() {
    .van-uploader {
      &__preview {
        &-delete {
          left: -6px;
          top: -6px;
          border-radius: 50%;
          background-color: var(--cp-primary);
          width: 20px;
          height: 20px;
          &-icon {
            transform: scale(0.9) translate(-22%, 22%);
          }
        }
        &-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
      &__upload {
        border-radius: 8px;
      }
      &__upload-icon {
        color: var(--cp-text3);
      }
    }
  }
}

.van-button {
  font-size: 16px;
  margin-bottom: 30px;
  &.disabled {
    opacity: 1;
    background: #fafafa;
    color: #d9dbde;
    border: #fafafa;
  }
}
</style>
