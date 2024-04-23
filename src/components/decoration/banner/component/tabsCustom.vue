<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  id: any
}>()
// 单选
const radio1 = ref(1)
// 普通链接
const commonFormData = ref({
  goPath: ''
})
// 其他小程序
const otherFormData = ref({
  appid: '',
  path: ''
})
</script>

<template>
  <div v-if="props.id === 5" class="custom">
    <div class="radios">
      <el-radio-group v-model="radio1">
        <el-radio :label="1">普通链接</el-radio>
        <el-radio :label="2">跳转其他小程序</el-radio>
      </el-radio-group>
    </div>
    <div class="common" v-if="radio1 === 1">
      <el-form :model="commonFormData" label-width="100px">
        <el-form-item
          prop="goPath"
          label="跳转路径："
          :rules="[{ required: true, message: '请填写路径', trigger: 'blur' }]"
        >
          <el-input
            v-model="commonFormData.goPath"
            input-style="width: 300px"
            placeholder="请输入正确的跳转路径"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="other" v-if="radio1 === 2">
      <el-form :model="otherFormData" label-width="100px">
        <el-form-item
          prop="appid"
          label="APPID："
          :rules="[{ required: true, message: '请填写路径', trigger: 'blur' }]"
        >
          <el-input
            v-model="otherFormData.appid"
            input-style="width: 300px"
            placeholder="请输入正确的APPID"
          ></el-input>
        </el-form-item>
        <el-form-item label="小程序路径：">
          <el-input
            v-model="otherFormData.appid"
            input-style="width: 300px"
            placeholder="请输入正确的小程序路径"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.radios {
  margin-bottom: 20px;
}
</style>
