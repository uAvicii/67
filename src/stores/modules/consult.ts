import { defineStore } from 'pinia'
import { ConsultType } from '@/enums'
import type { PartialConsult, ConsultIllness, Image } from '@/types/consult'
import { ref } from 'vue'

export const formData = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: [] as Image[]
})

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    const consult = ref<PartialConsult>({})

    /** 设置病情描述 */
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    const setId = (id: string) => (consult.value.patientId = id)
    // 设置问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)

    // 设置极速问诊类型
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)

    // 设置科室
    const setDep = (id: string) => (consult.value.depId = id)

    return { consult, setType, setIllnessType, setDep, setIllness, setId }
  },
  { persist: true }
)
