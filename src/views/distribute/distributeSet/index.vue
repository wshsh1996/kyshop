<script setup lang="ts">
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import useCurd from '@/hooks/curd'
import { ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ApiAllSet } from '@/api/comment'
import { ElMessage } from 'element-plus'

const { state } = useCurd({
  url: '/admin/configs/commission',
  openPage: false
})

const formRef = ref<FormInstance>()
const formData = ref<any>({
  open_commission: false,
  commission_poster: undefined,
  commission_withdraw_ratio: undefined,
  commission_withdraw_min: undefined,
  commission_withdraw_max: undefined,
  commission_level: '1',
  commission_level_1: undefined,
  commission_level_2: undefined
})

// 监听详情信息回显
watch(
  () => state.dataList,
  (val: any) => {
    if (val && typeof val === 'object') {
      formData.value = {
        open_commission: val.open_commission,
        commission_poster: val.commission_poster,
        commission_withdraw_ratio: Number(val.commission_withdraw_ratio),
        commission_withdraw_min: Number(val.commission_withdraw_min),
        commission_withdraw_max: Number(val.commission_withdraw_max),
        commission_level: val.commission_level,
        commission_level_1: Number(val.commission_level_1),
        commission_level_2: Number(val.commission_level_2)
      }
    }
  },
  {
    immediate: true
  }
)

const rules = ref<FormRules>({
  open_commission: [{ required: true, message: '请选择海报', trigger: 'blur' }],
  commission_withdraw_ratio: [{ required: true, message: '请填写提现手续费', trigger: 'blur' }],
  commission_withdraw_min: [
    { required: true, message: '请填写最少提现额度', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '最多2位小数', trigger: 'blur' }
  ],
  commission_withdraw_max: [
    { required: true, message: '请填写最多提现额度', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '最多2位小数', trigger: 'blur' }
  ],
  commission_level: [{ required: true, message: '请选择分销层级', trigger: 'blur' }],
  commission_level_1: [{ required: true, message: '请填写一级分销比例', trigger: 'blur' }],
  commission_level_2: [{ required: true, message: '请填写二级分销比例', trigger: 'blur' }]
})

// 分销等级切换，清空rate
const gradeChange = (value: string | number | boolean) => {
  if (value === '1') {
    formData.value.commission_level_1 = undefined
    formData.value.commission_level_2 = undefined
    formRef.value?.clearValidate('commission_level_1')
    formRef.value?.clearValidate('commission_level_2')
  }
  if (value === '2') {
    formData.value.commission_level_1 = undefined
    formData.value.commission_level_2 = undefined
    formRef.value?.clearValidate('commission_level_1')
    formRef.value?.clearValidate('commission_level_2')
  }
}

// 保存分销设置
const saveDistribute = async (ref: FormInstance | undefined) => {
  if (!ref) return
  await ref.validate().then(async () => {
    await ApiAllSet('commission', formData.value).then(() => {
      ElMessage.success('保存成功')
    })
  })
}
</script>

<template>
  <el-card>
    <el-form
      :model="formData"
      ref="formRef"
      :rules="rules"
      label-position="right"
      label-width="110"
    >
      <el-form-item label="状态" required prop="open_commission">
        <el-switch
          :active-value="true"
          :inactive-value="false"
          v-model="formData.open_commission"
        ></el-switch>
      </el-form-item>
      <el-form-item label="海报" prop="">
        <material-select v-model="formData.commission_poster"></material-select>
      </el-form-item>
      <el-form-item label="提现手续费" prop="commission_withdraw_ratio">
        <div>
          <el-input-number
            data-unit="%"
            class="my-el-input-number"
            :min="0"
            :max="100"
            v-model="formData.commission_withdraw_ratio"
          ></el-input-number>
          <div>提现手续费(单位：百分数)，0表示不设置提现手续费，提现手续费额外从提现中扣除</div>
        </div>
      </el-form-item>
      <el-form-item label="最少提现额度" prop="commission_withdraw_min">
        <div>
          <el-input-number :min="0.01" v-model="formData.commission_withdraw_min"></el-input-number>
          <div>单位：元</div>
        </div>
      </el-form-item>
      <el-form-item label="每日提现上限" prop="commission_withdraw_max">
        <div>
          <el-input-number :min="0" v-model="formData.commission_withdraw_max"></el-input-number>
          <div>单位：元，0元表示不限制每日提现金额</div>
        </div>
      </el-form-item>
      <el-form-item label="分销层级" prop="commission_level">
        <div>
          <el-radio-group v-model="formData.commission_level" @change="gradeChange">
            <el-radio label="1">一级</el-radio>
            <el-radio label="2">二级</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item
        prop="commission_level_1"
        class="show_test"
        v-if="formData.commission_level === '1' || formData.commission_level === '2'"
      >
        <div class="test">
          <div class="brokerage">
            <span>1级佣金</span>
            <el-input-number
              data-unit="%"
              class="my-el-input-number"
              :min="0"
              :max="100"
              v-model="formData.commission_level_1"
            ></el-input-number>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        prop="commission_level_2"
        class="show_test"
        v-if="formData.commission_level === '2'"
      >
        <div class="test">
          <div class="brokerage">
            <span>2级佣金</span>
            <el-input-number
              data-unit="%"
              class="my-el-input-number"
              :min="0"
              :max="100"
              v-model="formData.commission_level_2"
            ></el-input-number>
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveDistribute(formRef)">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.brokerage {
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  span {
    width: 80px;
    height: 16px;
  }
  .el-input {
    width: 180px;
  }
}
.show_test :deep(.el-form-item__error) {
  position: absolute;
  top: 100%;
  left: 80px;
}

// 分销百分比展示
.my-el-input-number[data-unit] {
  --el-input-number-unit-offset-x: 40px;
  position: relative;
}
.my-el-input-number[data-unit]::after {
  content: attr(data-unit);
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: var(--el-input-number-unit-offset-x);
  color: #999999;
}
.my-el-input-number[data-unit] .el-input__inner {
  padding-left: 30px;
  padding-right: calc(var(--el-input-number-unit-offset-x) + 12px);
}

// 自定义提示
.text {
  display: flex;
  flex-direction: column;
  .showText {
    position: relative;
    top: 0;
    height: 0;
    color: var(--el-color-primary);
  }
}

// 测试结构
.test {
  display: flex;
  flex-direction: column;
}
</style>
