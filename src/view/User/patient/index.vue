<!-- 档案 -->
<script setup lang="ts">
import { getPatientListAPI, addPatientAPI, editPatientAPI, delPatientAPI } from '@/services/user'
import type { Patient, IAddPatient } from '@/types/user'
import { ref, onMounted, computed, watch } from 'vue'
import { showToast, showSuccessToast, showConfirmDialog, Search } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores'
const route = useRoute()
const router = useRouter()
const store = useConsultStore()
import Validator from 'id-validator'

const isSelect = route.query.isSelect
const isShow = ref(false)
const list = ref<Patient[]>([])
const loadData = async () => {
  const res = await getPatientListAPI()
  list.value = res.data.data

  // 设置默认选中的ID，当你是选择患者的时候，且有患者信息的时候
  if (!isSelect || !list.value.length) return
  const defPatient = list.value.find((item) => item.defaultFlag === 1)
  if (defPatient) {
    selectId.value = defPatient.id
  } else {
    selectId.value = list.value[0].id
  }
}

// 新增弹出层数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
const initFormData: IAddPatient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
const formData = ref<IAddPatient>({ ...initFormData })
// 默认值需要转换
const defaultFlag = computed({
  get() {
    return formData.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    formData.value.defaultFlag = value ? 1 : 0
  }
})
// 关闭弹出层时，还原表单初始值
watch(isShow, (newValue) => {
  if (!newValue) {
    // 还原表单的初始值
    formData.value = { ...initFormData }
  }
})
const submit = async () => {
  if (!formData.value.name) return showToast('请输入真实姓名')
  if (!formData.value.idCard) return showToast('请输入身份证号')
  // 校验身份证
  const validate = new Validator()
  if (!validate.isValid(formData.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validate.getInfo(formData.value.idCard)
  if (formData.value.gender !== sex) return showToast('性别和身份证不符')

  formData.value.id
    ? await editPatientAPI(formData.value)
    : await addPatientAPI(formData.value as any)

  isShow.value = false
  loadData()
  showSuccessToast(formData.value.id ? '编辑成功' : '添加成功')
}

// 编辑
const showEdit = (item: Patient) => {
  isShow.value = true
  const { id, gender, name, idCard, defaultFlag } = item
  formData.value = { id, gender, name, idCard, defaultFlag }
}

// 删除
const delById = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: `您确认要删除 ${formData.value.name} 患者信息吗 ？`,
    cancelButtonText: '取消',
    confirmButtonText: '确认'
  })
  await delPatientAPI(formData.value.id as string)
  isShow.value = false
  loadData()
  showSuccessToast('删除成功')
}
onMounted(() => {
  loadData()
})

const value = ref('')

const onSearch = async (value: string) => {
  const newList = list.value.filter((item: any) => item?.name.includes(value))
  list.value = newList
}
const onCancel = () => {
  loadData()
}

//设置选中效果
const selectId = ref<string>()
interface Item {
  id: string
}
const setId = (item: Item) => {
  if (isSelect) {
    selectId.value = item.id
  }
}

// 下一步跳转支付
const onNext = () => {
  if (!selectId.value) return showToast('请选择患者')
  store.setId(selectId.value)
  router.push('/consult/pay')
}

// 获取 url中的参数
const url = new URLSearchParams(window.location.search)
console.log(url.get('isSelect'))

const url2 = new URL(window.location.href)
const params = url2.searchParams
console.log(params.get('isSelect'))
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar :title="isSelect ? '选择killer' : 'killers'" />
    <div class="patient-change" v-if="isSelect">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <van-search
      shape="round"
      v-model="value"
      @search="onSearch"
      @clear="onCancel"
      placeholder="请输入名字搜索"
    />
    <div class="patient-list">
      <div v-if="list.length">
        <div
          class="patient-item"
          v-for="item in list"
          :key="item.id"
          @click="setId(item as any)"
          :class="{ selected: selectId === item.id }"
        >
          <div class="info">
            <span class="name">{{ item.name }}</span>
            <span class="id">{{ item.idCard }}</span>
            <span>{{ item.genderValue }}</span>
            <span>{{ item.age }}</span>
          </div>
          <div class="icon"><cp-icon name="user-edit" @click="showEdit(item)" /></div>
          <div class="tag" v-if="item.defaultFlag === 1">默认</div>
        </div>
      </div>
      <van-empty v-else image="search" description="暂无数据" />
      <div class="patient-add" @click="isShow = true">
        <cp-icon name="user-add" />
        <p>添加killer</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <div class="patient-next" v-if="isSelect">
      <van-button @click="onNext" type="primary" round block>下一步</van-button>
    </div>
    <van-popup v-model:show="isShow" position="right">
      <cp-nav-bar
        :title="formData.id ? '编辑killer' : '添加killer'"
        right-text="保存"
        @click-right="submit"
      />
      <van-form autocomplete="off">
        <van-field label="真实姓名" placeholder="请输入真实姓名" v-model="formData.name" />
        <van-field label="身份证号" placeholder="请输入身份证号" v-model="formData.idCard" />
        <van-field label="性别">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn :options="options" v-model="formData.gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="formData.id">
        <van-action-bar-button @click="delById">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 0 0 80px;
  ::v-deep() {
    .van-popup {
      width: 100%;
      height: 100%;
    }
    .van-search {
      padding-bottom: 0;
    }
  }
}

.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>
