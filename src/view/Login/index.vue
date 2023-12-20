<script setup lang="ts">
import { ref, onUnmounted, computed, onMounted } from 'vue'
import { mobileRules, passwordRules } from '@/utils/rules'
import { showToast, showFailToast, showSuccessToast } from 'vant'
import { loginAPI, sendCodeAPI, loginByCodeAPI } from '@/services/user'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index'
const router = useRouter()
const route = useRoute()
const store = useUserStore()

const show = ref(false) // 是否密码可见
const isPass = ref(true) // 是否短信登陆
const agree = ref(false) // 是否同意协议
const mobile = ref('13230000001') // 手机号
const password = ref('abc12345') // 密码
const code = ref('') // 验证码
const second = ref(0) // 倒计时
let timerId: any

// 表单提交 -登陆
const onLogin = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
  const res = isPass.value
    ? await loginAPI(mobile.value, password.value)
    : await loginByCodeAPI(mobile.value, code.value)
  // 登陆失败处理

  if (res.data.code == 500) return showFailToast(res.data.message)
  // 使用pinia保存用户信息
  store.saveUser(res.data.data)
  // 提示
  showSuccessToast('登录成功')
  // 跳转首页
  const returnPath = route.query.returnPath
  if (returnPath) {
    router.push(returnPath as string)
  } else {
    router.push('/')
  }
}

// 发送验证码
const sendCode = async () => {
  const { data } = await sendCodeAPI(mobile.value)
  if (data.code == 500) return showFailToast(data.message)
  showSuccessToast('发送成功')
  code.value = data.data.code
  second.value = 60
  timerId = setInterval(() => {
    second.value--
    if (second.value <= 0) clearInterval(timerId)
  }, 1000)
}
onUnmounted(() => {
  clearInterval(timerId)
})

// 注册页
const goRegister = () => {
  router.push('/register')
}

// 密码框是否可见
const inputType = computed(() => (show.value ? 'text' : 'password'))
</script>

<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册" :isLeftArrow="false" @click="goRegister"></cp-nav-bar>
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- form 表单 -->
    <van-form autocomplete="off" @submit="onLogin">
      <van-field
        placeholder="请输入手机号"
        v-model="mobile"
        :rules="mobileRules"
        type="tel"
      ></van-field>
      <van-field
        v-if="isPass"
        placeholder="请输入密码"
        v-model="password"
        :rules="passwordRules"
        :type="inputType"
      >
        <template #button>
          <cp-icon
            @click="show = !show"
            :name="`login-login-eye-${show ? 'on' : 'off'}`"
          /> </template
      ></van-field>
      <van-field
        v-else
        placeholder="短线验证码"
        v-model="code"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码6个数字' }
        ]"
      >
        <template #button>
          <span v-if="second">{{ second }}s后再次发送</span>
          <span v-else class="btn-send" @click="sendCode">发送验证码</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>

    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <a
        class="icon"
        href="https://graph.qq.com/oauth2.0/authorize?client_id=102015968&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fconsult-patients.itheima.net%2Flogin%2Fcallback"
      >
        <img src="@/assets/qq.svg" alt="" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
      color: var(--cp-orange);
      font-weight: 700;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

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
  .btn-send {
    color: var(--cp-orange);
  }
}
</style>
