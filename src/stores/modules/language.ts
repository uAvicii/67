import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLangueStore = defineStore(
  'language',
  () => {
    const langue = ref()
 
    const saveLangue = (u: any) => {
        langue.value = u
    }
 
    return {
      langue,
      saveLangue
    }
  },
  {
    persist: true
  }
)
