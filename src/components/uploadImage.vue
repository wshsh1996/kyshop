<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'
import { userStore } from '@/stores'
import { ref, watch } from 'vue'
import type { UploadFile, UploadRawFile } from 'element-plus'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  action: string
  data?: any
  modelValue: any
  type?: string
}>()

const uploadHeader = {
  Authorization: 'Bearer ' + userStore.getToken()
}

// 上传功能
const fileList = ref<any[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

// 上传前限制
const handleBefore = (rawFile: UploadRawFile) => {
  const isLt2M = rawFile.size < 1024 * 1024 * 10
  const img = new Image()
  if (!isLt2M) {
    ElMessage.warning('图片大小不超过10M')
    return false
  }
  let fileBlobName = null
  if ((window as any).createObjectURL !== undefined) {
    fileBlobName = (window as any).createObjectURL(rawFile)
  } else if (window.URL !== undefined) {
    fileBlobName = (window as any).URL.createObjectURL(rawFile)
  } else if ((window as any).webkitURL !== undefined) {
    fileBlobName = (window as any).webkitURL.createObjectURL(rawFile)
  }
  img.src = fileBlobName
  img.onload = () => {
    const resSize = img.width <= 1440 && img.height <= 1080
    if (!resSize) {
      ElMessage.warning('上传图片尺寸不超过1440*1080')
    }
  }
}

// 图片上传
const handleSuccess = (file: any) => {
  // 将返回的media_id赋值给formData
  console.log(file)
  emits('update:modelValue', file)
  disabled.value = true
}

// 删除
const handleRemove = () => {
  emits('update:modelValue', [])
  disabled.value = false
}

// 预览
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

// 清空fileList
const clearFileList = () => {
  fileList.value = []
  disabled.value = false
}

// 监听图片信息，清空本地图片和回显
watch(
  () => props.modelValue,
  (val: any) => {
    // 退出清空本地
    if (val === undefined || val === '' || val === null || val.length < 1 || val.length < 0) {
      clearFileList()
    }
    // 当是朋友圈图片时
    if (props.type === 'friend') {
      // fileList.value.length < 0 解决朋友圈新增时会向fileList添加
      if (val && fileList.value.length < 0) {
        fileList.value.push({
          url: val
        })
        disabled.value = true
      }
    }
    // 欢迎语的图片
    if (props.type === 'welcome') {
      // 当图片变化且本地中没有数据时，添加回显
      if (val && fileList.value.length < 1) {
        fileList.value.push({
          url: val
        })
        disabled.value = true
      }
    }
    // 客户群发的图片处理
    if (props.type === 'clientSend') {
      // 添加小程序的回显
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    :action="props.action"
    list-type="picture-card"
    :headers="uploadHeader"
    :data="props.data"
    class="avatar-warp"
    :class="{ disabled }"
    :limit="1"
    :name="'filename'"
    :multiple="false"
    :before-upload="handleBefore"
    :on-preview="handlePictureCardPreview"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
  >
    <el-icon><Picture /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img class="preview" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped lang="scss">
.preview {
  width: 100%;
  height: 100%;
}
// 上传样式
// 框架尺寸
:deep(.el-upload) {
  width: 60px;
  height: 60px;
  border-radius: 0;
  background-color: #ffffff;
}
// 框架的icon大小
:deep(.el-upload--picture-card .el-icon) {
  width: 20px;
  height: 20px;
  color: #cccccc;
}
// 添加图片后框架大小
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 60px;
  height: 60px;
  border-radius: 0;
}
// 预览/删除的大小
:deep(.el-upload-list__item-actions) {
  font-size: 14px;
}
.preview {
  width: 100%;
  height: 100%;
}

// 限制一张隐藏框架
.disabled :deep(.el-upload--picture-card) {
  display: none;
}

// 隐藏删除提示
:deep(.el-icon--close-tip) {
  display: none !important;
}
</style>
