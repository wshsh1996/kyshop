<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import useForm from '@/hooks/form'
import { ElMessage } from 'element-plus'

const formRef = ref<FormInstance>()
const { formLoading, formData } = useForm({
  formRef,
  defVal(detail) {
    return {
      title: detail?.title, // 储值名称
      price: detail?.price, // 充值面额
      sort: detail?.sort, // 排序
      is_give_coupon: detail?.is_give_coupon ? detail?.is_give_coupon : false, // 赠送类型 true 赠送优惠券 false 赠送金额
      give_amount: detail?.give_amount ? detail?.give_amount : null, // 赠送金额
      coupons: detail?.coupons ? detail?.coupons : ([] as any)
    }
  }
})

const rules: FormRules = {
  title: [{ required: true, message: '请填写充值金额', trigger: 'blur' }],
  price: [
    { required: true, message: '请填写充值金额', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '充值金额只能是数字', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请填写排序', trigger: 'blur' },
    { pattern: /^[1-9]+$/, message: '排序只能是大于0的数字', trigger: 'blur' }
  ],
  is_give_coupon: [{ required: true, message: '请选择赠送类型', trigger: 'blur' }],
  give_amount: [
    { required: true, message: '请选择赠送金额', trigger: 'blur' },
    { pattern: /^([1-9]\d*|0\.\d*[1-9])$/, message: '请填写正确格式', trigger: 'blur' }
  ],
  couponsPrice: [
    { required: true, message: '请填写面值', trigger: 'blur' },
    { pattern: /^([1-9]\d*|0\.\d*[1-9])$/, message: '请填写正确格式', trigger: 'blur' }
  ],
  full_price: [
    { required: true, message: '请填写面值', trigger: 'blur' },
    { pattern: /^([1-9]\d*|0\.\d*[1-9])$/, message: '请填写正确格式', trigger: 'blur' }
  ]
}

// 切换单选按钮，清空数据
const changeRadio = () => {
  formData.value.give_amount = null
  formData.value.coupons = []
}

// 添加优惠券
const addCoupon = () => {
  if (formData.value.coupons.length >= 5) {
    ElMessage.warning('最多添加5个优惠券')
    return
  }
  formData.value.coupons.push({
    full_price: null,
    price: null
  })
}

// 删除优惠券
const deleteCoupon = (index: number) => {
  formData.value.coupons.splice(index, 1)
}
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-position="right"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item prop="title" label="储值名称">
        <el-input v-model="formData.title" placeholder="请填写储值名称" style="width: 300px">
        </el-input>
      </el-form-item>
      <el-form-item label="充值金额" prop="price">
        <el-input v-model="formData.price" placeholder="请填写充值金额" style="width: 300px">
          <template #suffix>元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="请填写排序" style="width: 300px"> </el-input>
      </el-form-item>
      <el-form-item label="赠送类型" prop="is_give_coupon">
        <el-radio-group v-model="formData.is_give_coupon" @change="changeRadio">
          <el-radio :label="false">赠送金额</el-radio>
          <el-radio :label="true">赠送优惠券</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="!formData.is_give_coupon" prop="give_amount">
        <el-input v-model="formData.give_amount" style="width: 300px" placeholder="请填写赠送金额">
          <template #suffix>元</template>
        </el-input>
      </el-form-item>
      <div class="table" v-else>
        <div class="btn_box">
          <el-button class="table_btn" type="primary" @click="addCoupon">添加优惠券</el-button>
          <span class="tips">最多添加五张优惠券</span>
        </div>
        <el-table
          :data="formData.coupons"
          border
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          v-loading="formLoading"
        >
          <el-table-column prop="coupons.price" label="面值（元）" class-name="couponPrice">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="'coupons.' + $index + '.price'"
                :rules="rules.couponsPrice"
                label-width="0"
              >
                <el-input v-model="row.price" style="width: 200px" placeholder="请填写面值">
                  <template #suffix>元</template>
                </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="coupons.full_price" label="使用门槛（元）" class-name="fullPrice">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="'coupons.' + $index + '.full_price'"
                :rules="rules.full_price"
                label-width="0"
              >
                <el-input
                  v-model="row.full_price"
                  style="width: 200px"
                  placeholder="请填写使用门槛"
                >
                  <template #suffix>元</template>
                </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template #default="{ $index }">
              <el-button type="primary" link @click="deleteCoupon($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.table {
  margin-left: 100px;
  .btn_box {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .table_btn {
      margin-right: 10px;
    }
    .tips {
      font-size: 12px;
      color: #f6af50;
    }
  }
}

:deep(.couponPrice .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
:deep(.fullPrice .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
