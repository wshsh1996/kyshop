<script setup lang="ts">
// import MaterialSelect from '@/component/MaterialSelect/MaterialSelect.vue'
// import type { skuType } from '@/models/sku'
// import usePropData from '@/hooks/propData'
// import type { FormRules, FormInstance } from 'element-plus'
// import { ref, watch } from 'vue'
//
// const emits = defineEmits(['update:modelValue'])
// const props = defineProps<{
//   modelValue: skuType[]
// }>()
//
// const formRef = ref<FormInstance>()
// const sku = usePropData(() => props.modelValue, null)
//
// watch(
//   sku,
//   (val: any) => {
//     const valueArr = Object.values(val[0])
//     if (valueArr.every((item) => item !== undefined)) {
//       emits('update:modelValue', val)
//     }
//   },
//   {
//     immediate: true
//   }
// )
// // 校验规则
// const rules: FormRules = {
//   // 规格
//   code: [{ required: true, message: '请填写单规格编码', trigger: 'blur' }],
//   cost_price: [{ required: true, message: '请输入成本价', trigger: 'blur' }],
//   original_price: [{ required: true, message: '请输入原价', trigger: 'blur' }],
//   price: [{ required: true, message: '请输入零售价', trigger: 'blur' }],
//   vip_price: [{ required: true, message: '请输入会员价', trigger: 'blur' }],
//   image: [{ required: true, message: '请选择图片', trigger: 'blur' }]
// }
// const isCode = ref<boolean>(false)
// const isCost = ref<boolean>(false)
// const isOriginal = ref<boolean>(false)
// const isPrice = ref<boolean>(false)
// const isVip = ref<boolean>(false)
// const isImage = ref<boolean>(false)
</script>

<!--<template>-->
<!--  <el-form ref="formRef" :rules="rules" label-width="100px">-->
<!--    <el-form-item label="编码" prop="code">-->
<!--      <el-input placeholder="请输入" v-model="sku[0].code" clearable></el-input>-->
<!--      &lt;!&ndash;      <div v-if="isCode">&ndash;&gt;-->
<!--      &lt;!&ndash;        <el-text v-if="!sku[0].code" type="danger">请输入单规格编码</el-text>&ndash;&gt;-->
<!--      &lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </el-form-item>-->
<!--    <el-form-item label="成本价" prop="cost_price">-->
<!--      <el-input placeholder="请输入" v-model="sku[0].cost_price" clearable></el-input>-->
<!--      &lt;!&ndash;      <div v-if="isCost">&ndash;&gt;-->
<!--      &lt;!&ndash;        <el-text v-if="!sku[0].code" type="danger">请输入成本价</el-text>&ndash;&gt;-->
<!--      &lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </el-form-item>-->
<!--    <el-form-item label="原价" prop="original_price">-->
<!--      <el-input placeholder="请输入" v-model="sku[0].original_price" clearable></el-input>-->
<!--      &lt;!&ndash;      <div v-if="isOriginal">&ndash;&gt;-->
<!--      &lt;!&ndash;        <el-text v-if="!sku[0].code" type="danger">请输入原价</el-text>&ndash;&gt;-->
<!--      &lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </el-form-item>-->
<!--    <el-form-item label="零售价" prop="price">-->
<!--      <el-input placeholder="请输入" v-model="sku[0].price" clearable></el-input>-->
<!--      &lt;!&ndash;      <div v-if="isPrice">&ndash;&gt;-->
<!--      &lt;!&ndash;        <el-text v-if="!sku[0].code" type="danger">请输入零售价</el-text>&ndash;&gt;-->
<!--      &lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </el-form-item>-->
<!--    <el-form-item label="会员价" prop="vip_price">-->
<!--      <el-input placeholder="请输入" v-model="sku[0].vip_price" clearable></el-input>-->
<!--      &lt;!&ndash;      <div v-if="isVip">&ndash;&gt;-->
<!--      &lt;!&ndash;        <el-text v-if="!sku[0].code" type="danger">请输入会员价</el-text>&ndash;&gt;-->
<!--      &lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </el-form-item>-->
<!--    <el-form-item label="图片" prop="image">-->
<!--      <material-select v-model="sku[0].image"></material-select>-->
<!--    </el-form-item>-->
<!--  </el-form>-->
<!--</template>-->

<style scoped lang="scss">
.el-text {
  margin-left: 5px;
  font-size: 12px;
}
</style>
