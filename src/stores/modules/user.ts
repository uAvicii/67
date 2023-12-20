import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    const user = ref<User>()
    const avatar =
      ref<string[]>([
        'https://p26-passport.byteacctimg.com/img/user-avatar/3227254b000ad5e103c72b91365dd4a0~90x90.awebp'
      ]) || []
    // searchHistory 定义为空数组
    const searchHistory = ref<string[]>([])
    const saveSearchHistory = (u: any) => {
      searchHistory.value = [...searchHistory.value, u]
    }
    const saveAvatar = (u: any) => {
      if (avatar.value.length > 1) {
        avatar.value.splice(0, 1)
      }
      avatar.value = [...avatar.value, u]
    }
    const saveUser = (u: User) => {
      user.value = u
    }
    // 清空用户，退出后使用
    const delUser = () => {
      user.value = undefined
    }

    return {
      avatar,
      saveAvatar,
      searchHistory,
      saveSearchHistory,
      user,
      saveUser,
      delUser
    }
  },
  {
    persist: true
  }
)
