<script setup lang="ts">
import { useRouter } from 'vue-router'
interface Props {
  title?: string
  rightText?: string
  onBack?: () => void
  isLeftArrow?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isLeftArrow: true
})

interface Emits {
  (e: 'click-right'): void
}
const emit = defineEmits<Emits>()

const router = useRouter()

const clickLeft = () => {
  if (props.onBack) return props.onBack()
  router.back()
}
</script>

<template>
  <van-nav-bar
    :title="title"
    :right-text="rightText"
    @click-right="emit('click-right')"
    @click-left="clickLeft"
    :left-arrow="isLeftArrow"
    fixed
    placeholder
  />
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
