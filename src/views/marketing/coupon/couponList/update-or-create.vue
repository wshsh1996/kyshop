<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import useForm from '@/hooks/form'
import { ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
  formVisible: boolean
}>()
const formRef = ref<FormInstance>()
const { formLoading, formData } = useForm({
  formRef,
  defVal(detail) {
    return {
      title: detail?.title, // 优惠券名称
      type: detail?.type, // 优惠券类型
      price: detail?.price, // 优惠券面值
      discount_rate: detail?.discount_rate, // 折扣
      is_new: detail?.is_new ? detail.is_new : false, // 新人券
      enabled: detail?.enabled ? detail.enabled : false, // 优惠券状态
      use_start_time: detail?.use_start_time, // 使用开始时间
      use_end_time: detail?.use_end_time, // 使用结束时间
      days: detail?.days, // 有效天数
      limit: detail?.limit ? detail.limit : 0, // 是否限量 0 不限量 1 限量
      full_price: detail?.full_price ? detail.full_price : 0, // 门槛钱数
      open_start_time: detail?.open_start_time, // 开始领取时间
      open_end_time: detail?.open_end_time, // 结束领取时间
      use_time: ''
    }
  }
})

// 获取优惠卷类型
const couponType = ref([
  { title: '折扣', value: 1 },
  { title: '满减', value: 2 }
])

const rules: FormRules = {
  title: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
  type: [{ required: true, message: '请输入优惠券类型', trigger: 'blur' }],
  is_new: [{ required: true, message: '请选择是否开启新人券', trigger: 'blur' }],
  enabled: [{ required: true, message: '请选择优惠券状态', trigger: 'blur' }],
  days: [
    { required: true, message: '请输入有效天数', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: '请输入正确的有效天数', trigger: 'blur' }
  ],
  limit: [
    { required: true, message: '请填写限制数量', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback) => {
        if (isLimited.value === 1 && value <= 0) {
          callback(new Error('限制数量不能小于0'))
        } else {
          callback()
        }
      },
      message: '限制数量不能为0',
      trigger: 'blur'
    },
    { pattern: /^[0-9]+$/, message: '请输入正确的限制数量', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请输入优惠券面值', trigger: 'blur' },
    { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '请输入正确的优惠券面值', trigger: 'blur' }
  ],
  discount_rate: [
    { required: true, message: '请输入折扣', trigger: 'blur' },
    { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '请输入正确的优惠券折扣', trigger: 'blur' }
  ],
  full_price: [
    { required: true, message: '请选择是否有门槛', trigger: 'blur' },
    { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '请输入正确的门槛数', trigger: 'blur' }
  ],
  use_time: [{ required: true, message: '请选择使用时间', trigger: 'blur' }]
}

// 使用时间
const useTime = ref(0) // 使用时间切换

// 使用时间改变
const timeChange = (val: any) => {
  if (val) {
    formData.value.use_start_time = val[0]
    formData.value.use_end_time = val[1]
  }
}

// radio切换时清空绑定值
const clearMain = (value: any) => {
  if (value === 1) {
    formData.value.use_time = ''
    formRef.value?.clearValidate('use_time')
  }
  if (value === 0) {
    formData.value.days = ''
    formRef.value?.clearValidate('days')
  }
}

// 是否限量
// 限量切换
const isLimited = ref(0)
// radio切换时清空限量绑定值
const clearPublish = (value: any) => {
  if (value === 0) {
    formData.value.limit = 0
    formRef.value?.clearValidate('limit')
  }
  if (value === 1) {
    formData.value.limit = ''
  }
}

// 有无门槛
// 门槛格式提示
const isShowDoorSill = ref(0)
// 门槛切换
const clearLowestAmount = (value: any) => {
  if (value === 0) {
    formData.value.full_price = 0
    formRef.value?.clearValidate('full_price')
  }
  if (value === 1) {
    formData.value.full_price = ''
  }
}

// 领取日期
// 限时切换
const isShowDate = ref(0)
const open_time = ref()
const openTimeText = ref(false)
// pick时间改变，将获取的值赋值给领取日期
const openChange = (val: any) => {
  if (val) {
    formData.value.open_start_time = val[0]
    formData.value.open_end_time = val[1]
  } else {
    openTimeText.value = true
  }
}

// radio切换时清空领取日期绑定值
const clearReceiveDate = (value: any) => {
  if (value === 0) {
    openTimeText.value = false
  }
}

watch(
  () => props.formVisible,
  (val: any) => {
    if (!val) {
      useTime.value = 0
      isLimited.value = 0
      isShowDoorSill.value = 0
      isShowDate.value = 0
    }
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <div class="contain">
    <el-form
      :model="formData"
      ref="formRef"
      :rules="rules"
      label-position="right"
      label-width="100px"
      v-loading="formLoading"
    >
      <div class="left">
        <el-form-item label="优惠券名称" prop="title">
          <el-input v-model="formData.title" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="优惠券类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in couponType"
              :key="item.value"
              :label="item.title"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面值" prop="price" v-if="formData.type === 2">
          <el-input v-model="formData.price" placeholder="请输入" clearable>
            <template #suffix>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discount_rate" v-else>
          <el-input v-model="formData.discount_rate" placeholder="请输入" clearable>
            <template #suffix>折</template>
          </el-input>
        </el-form-item>
        <el-form-item label="新人券" required>
          <el-switch
            v-model="formData.is_new"
            inline-prompt
            active-text="是"
            inactive-text="否"
            :active-value="true"
            :inactive-value="false"
          ></el-switch>
        </el-form-item>
        <el-form-item label="优惠券状态" required>
          <el-switch
            v-model="formData.enabled"
            inline-prompt
            active-text="开启"
            inactive-text="关闭"
            :active-value="true"
            :inactive-value="false"
          ></el-switch>
        </el-form-item>
        <el-form-item label="使用时间" required style="margin-bottom: 10px">
          <el-radio-group v-model="useTime" @change="clearMain">
            <el-radio :label="0">时间段</el-radio>
            <el-radio :label="1">天数</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="useTime === 1" prop="days">
          <el-input placeholder="请输入有效时间" v-model="formData.days" clearable>
            <template #suffix>
              天
              <el-tooltip content="领取多少天后有效" placement="top-start">
                <el-button link :icon="QuestionFilled"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="useTime === 0" prop="use_time">
          <el-date-picker
            v-model="formData.use_time"
            type="datetimerange"
            clearable
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="timeChange"
          />
        </el-form-item>
      </div>
      <div class="right">
        <el-form-item label="是否限量" required prop="limit">
          <el-radio-group v-model="isLimited" @change="clearPublish">
            <el-radio :label="0">不限量</el-radio>
            <el-radio :label="1">限量</el-radio>
          </el-radio-group>
          <el-input
            placeholder="请输入发布数量"
            v-if="isLimited === 1"
            v-model.number="formData.limit"
            clearable
          >
            <template #suffix>
              <el-tooltip content="填写优惠券发布数量" placement="top-start">
                <el-button link :icon="QuestionFilled"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="有无门槛" required prop="full_price">
          <el-radio-group v-model="isShowDoorSill" @change="clearLowestAmount">
            <el-radio :label="0">无门槛</el-radio>
            <el-radio :label="1">有门槛</el-radio>
          </el-radio-group>
          <el-input
            v-if="isShowDoorSill === 1"
            v-model="formData.full_price"
            placeholder="请填写最低消费金额"
            clearable
          >
            <template #suffix>
              <el-tooltip content="填写优惠券最低消费金额" placement="top-start">
                <el-button link :icon="QuestionFilled"></el-button>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="领取日期" required>
          <el-radio-group v-model="isShowDate" @change="clearReceiveDate">
            <el-radio :label="0">不限时</el-radio>
            <el-radio :label="1">限时</el-radio>
          </el-radio-group>
          <el-date-picker
            v-if="isShowDate === 1"
            v-model="open_time"
            type="datetimerange"
            clearable
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="openChange"
          />
          <div v-if="openTimeText" class="text">请选择领取时间</div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.el-input,
.el-select {
  width: 200px;
}

:deep(.el-form-item__content) {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.el-radio-group {
  margin-bottom: 14px;
}

.contain :deep(.el-form) {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.contain :deep(.el-form-item) {
  margin-bottom: 40px;
}
.left {
  width: 500px;
}
.right {
  margin-left: 30px;
  flex: 1;
}
.text {
  position: relative;
  top: -8px;
  height: 0;
  font-size: 12px;
  color: #f56c6c;
}
</style>
