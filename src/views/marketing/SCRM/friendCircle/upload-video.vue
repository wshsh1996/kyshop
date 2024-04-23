<script setup lang="ts">
import { userStore } from '@/stores'
import { ref } from 'vue'
import type { UploadRawFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { Awaitable } from 'element-plus/lib/utils'

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  action: string
  data?: any
  modelValue: string
  name?: string
}>()

const uploadHeader = {
  Authorization: 'Bearer ' + userStore.getToken()
}

// 上传功能
const disabled = ref(false)
const fileList = ref<any[]>([])

// 上传前限制
const handleBefore = (rawFile: UploadRawFile): Awaitable<boolean | any> => {
  const isLt2M = rawFile.size < 1024 * 1024 * 10
  if (!isLt2M) {
    ElMessage.warning('视频大小不超过10M')
    return false
  }
  // 获取时长
  let url = URL.createObjectURL(rawFile)
  let audioElement = new Audio(url)
  const duration = ref()
  return new Promise<Awaitable<any>>(function (resolve, reject) {
    audioElement.addEventListener('loadedmetadata', function () {
      // 视频时长值的获取要等到这个匿名函数执行完毕才产生
      duration.value = audioElement.duration //得到时长为秒，小数，182.36
      if (duration.value <= 9 || duration.value >= 30) {
        ElMessage.warning('时长不能超过9~30s')
        reject(false)
      } else {
        resolve(true)
      }
    })
  })
}

// 视频上传
const handleSuccess = (file: any) => {
  console.log(file, 'file')
  // 将返回的media_id赋值给formData
  emits('update:modelValue', file.media_id)
  disabled.value = true
}

// 删除
const handleRemove = () => {
  fileList.value = []
  emits('update:modelValue', '')
  disabled.value = false
}
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    :action="props.action"
    :headers="uploadHeader"
    :data="props.data"
    accept="video"
    class="avatar-warp"
    :class="{ disabled }"
    :limit="1"
    :name="props.name ? props.name : 'filename'"
    :multiple="false"
    :before-upload="handleBefore"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
  >
    <el-button type="primary" style="margin-left: 30px">上传视频</el-button>
  </el-upload>
</template>

<style scoped lang="scss">
// 上传样式

//.preview {
//  width: 100%;
//  height: 100%;
//}
//
// 限制一张隐藏框架
.disabled :deep(.el-button--primary) {
  display: none;
}
.disabled :deep(.el-upload--text) {
  display: none;
}

// 隐藏删除提示
:deep(.el-icon--close-tip) {
  display: none !important;
}
//
//// 图标显示及位置
//.iconLeft {
//  position: absolute;
//  left: 25%;
//  top: 50%;
//  transform: translate(-50%, -50%);
//  color: #fff;
//  font-size: 16px;
//  cursor: pointer;
//}
//
//.iconRight {
//  position: absolute;
//  left: 75%;
//  top: 50%;
//  transform: translate(-50%, -50%);
//  color: #fff;
//  font-size: 16px;
//  cursor: pointer;
//}
//// 添加蒙版
//.box {
//  display: none;
//  width: 100%;
//  height: 100%;
//  position: absolute;
//  background-color: #000;
//  opacity: 0.4;
//}
//:deep(.el-upload-list__item:hover) .box {
//  display: block;
//}
</style>
