import CpNavBar from '@/components/CpNavBar.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpConsultMore from '@/components/CpConsultMore.vue'
import CpPaySheet from '@/components/CpPaySheet.vue'
declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpRadioBtn: typeof CpRadioBtn
    CpIcon: typeof CpIcon
    CpConsultMore: typeof CpConsultMore
    CpPaySheet: typeof CpPaySheet
  }
}
