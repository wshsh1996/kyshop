<script setup lang="ts">
import WangEditor from '@/components/wangEditor.vue'
import { onMounted, ref } from 'vue'
import { ApiEditAgreement, ApiGetAgreement } from '@/api/comment'
import { ElMessage } from 'element-plus'

// 创建富文本内容
const data = ref<{ [prop: string]: any }>({
  content: ''
})

const getDetail = async () => {
  const { content }: any = await ApiGetAgreement(1)
  data.value.content = content
}

// 保存协议
const handleClick = async () => {
  await ApiEditAgreement(1, data.value)
  ElMessage.success('保存成功')
}

onMounted(() => {
  getDetail()
})
</script>

<template>
  <div class="privacy">
    <wang-editor v-model="data.content"></wang-editor>
    <el-button type="primary" @click="handleClick" style="margin-top: 10px">保存</el-button>
  </div>
</template>

<style scoped lang="scss">
.privacy {
  width: 100%;
  height: 100%;
}
</style>
