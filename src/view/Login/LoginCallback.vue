<script setup lang="ts">
import { sendCodeAPI } from '@/services/user'
import { mobileRules } from '@/utils/rules'
import { onUnmounted, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { loginByQQAPI, bindMobileAPI } from '@/services/user'
import type { User } from '@/types/user'
import { showSuccessToast } from 'vant'

const mobile = ref('13230000001')
const code = ref('')
const second = ref(0)
const openId = ref('')
const isBind = ref(true)
const router = useRouter()

// 登录成功
const store = useUserStore()
const loginSuccess = (res: { data: User }) => {
  store.saveUser(res.data)
  router.replace('/')
  showSuccessToast('登录成功')
}

const onSubmit = async () => {
  const res = await bindMobileAPI({
    mobile: mobile.value,
    code: code.value,
    openId: openId.value
  })
  loginSuccess(res)
}

let timerId: any
const onSendCode = async () => {
  const res = await sendCodeAPI(mobile.value, 'bindMobile')
  code.value = res.data.code
  second.value = 60
  timerId = setInterval(() => {
    second.value--
    if (second.value === 0) clearInterval(timerId)
  }, 100)
}
onMounted(() => {
  if (window.QC.Login.check()) {
    window.QC.Login.getMe((id) => {
      openId.value = id
      // QQ，登录
      loginByQQAPI(id)
        .then((res: any) => {
          // 登录成功
          router.push('/')
          loginSuccess(res)
        })
        .catch(() => {
          // 登录失败
          isBind.value = false
        })
    })
  }
})

onUnmounted(() => {
  clearInterval(timerId)
})
</script>

<template>
  <div class="login-page">
    <cp-nav-bar title="绑定手机号"></cp-nav-bar>

    <van-form autocomplete="off" @submit="onSubmit">
      <van-field v-model="mobile" placeholder="请输入手机号" type="tel" :rules="mobileRules" />

      <van-field
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码6个数字' }
        ]"
        v-model="code"
        placeholder="请输入验证码"
      >
        <template #button>
          <span class="send-code" v-show="second === 0" @click="onSendCode">发送验证码</span>
          <span v-show="second > 0">{{ second }}秒后获取</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"> 立即绑定 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .send-code {
    --cp-primary: #16c2a3;
    color: var(--cp-primary);
  }
}
</style>
