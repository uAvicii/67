<script setup lang="ts">
interface Props {
  options: { label: string; value: string | number }[]
  modelValue?: string | number
}
defineProps<Props>()

interface Emits {
  (name: 'update:modelValue', value: string | number): void
}
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="cp-radio-btn">
    <!-- <a class="item" href="javascript:;">男</a>
    <a class="item" href="javascript:;">女</a> -->
    <a
      class="item"
      href="javascript:;"
      v-for="item in options"
      :key="item.value"
      :class="{ active: item.value === modelValue }"
      @click="emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
