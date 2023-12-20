<script setup lang="ts">
import { uploadImageAPI } from '@/services/consult'
import type { Image } from '@/types/consult'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { ref } from 'vue'
import { showLoadingToast } from 'vant'
const text = ref('')
const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', img: Image): void
}>()

const onSendText = () => {
  emit('send-text', text.value)
  text.value = ''
}

const onSendImage: UploaderAfterRead = async (data) => {
  if (Array.isArray(data)) return
  if (!data.file) return
  const t = showLoadingToast('正在上传')
  const res = await uploadImageAPI(data.file)
  t.close()
  emit('send-image', res.data.data)
}
defineProps<{ disabled: boolean }>()
</script>

<template>
  <div class="room-action">
    <van-field
      :disabled="disabled"
      v-model="text"
      type="text"
      class="input"
      :border="false"
      placeholder="search..."
      autocomplete="off"
      @keyup.enter="onSendText"
    ></van-field>
    <!-- 不预览，使用小图标作为上传按钮 -->
    <van-uploader :preview-image="false" :disabled="disabled" :after-read="onSendImage">
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
