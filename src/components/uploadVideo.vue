<script setup lang="ts">
import { Delete, VideoCamera, View } from '@element-plus/icons-vue'
import { userStore } from '@/stores'
import { ref, watch } from 'vue'
import type { UploadFile, UploadRawFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { Awaitable } from 'element-plus/lib/utils'
import { VideoPath } from '@/hooks/video'

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  action: string
  data?: any
  modelValue: string | undefined
  name?: string
  kind?: string
}>()

const uploadHeader = {
  Authorization: 'Bearer ' + userStore.getToken()
}

// 上传功能
const dialogVideoUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = ref<any[]>([])

// 上传前限制
const handleBefore = (rawFile: UploadRawFile): Awaitable<boolean | any> => {
  const isLt2M = rawFile.size < 1024 * 1024 * 10
  const isValidFormat =
    ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(
      rawFile.type
    ) > -1
  if (!isLt2M) {
    ElMessage.warning('视频大小不超过10M')
    return false
  }
  //图片类型
  if (!isValidFormat) {
    ElMessage.warning('只能上传视频格式')
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
      if (duration.value <= 2 || duration.value >= 10) {
        ElMessage.warning('时长不能超过2~10s')
        reject(false)
      } else {
        resolve(true)
      }
    })
  })
}

// 视频上传
const coverUrl = ref()
const handleSuccess = async (file: any) => {
  // 区分正常上传和企微上传
  // if (props.name) {
  coverUrl.value = await VideoPath(file.path)
  // 正常上传
  emits('update:modelValue', coverUrl.value)
  // 隐藏上传按钮
  disabled.value = true
  // } else {
  //   // 企微上传
  //   // 将返回的media_id赋值给formData
  //   coverUrl.value = file.url + '?x-oss-process=video/snapshot,t_1000,w_60,h_60,f_jpg,m_fast'
  //   emits('update:modelValue', file.media_id)
  //   disabled.value = true
  // }
}

// 删除
const handleRemove = () => {
  coverUrl.value = ''
  fileList.value = []
  emits('update:modelValue', '')
  disabled.value = false
}

// 预览
const handlePictureCardPreview = (file: UploadFile) => {
  dialogVideoUrl.value = file.url!
  dialogVisible.value = true
}

// 监听返回的地址，回显数据
watch(
  () => props.modelValue,
  (val: any) => {
    if (val === undefined || val === '' || val === null) return
    // 当封面为空的时候是回显，可以解决新增时重复添加问题
    if (!coverUrl.value) {
      fileList.value.push({
        url: val
      })
    }
    coverUrl.value = val
    disabled.value = true
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
    accept="video"
    class="avatar-warp"
    :class="{ disabled }"
    :limit="1"
    :name="props.name ? props.name : 'filename'"
    :multiple="false"
    :before-upload="handleBefore"
    :on-preview="handlePictureCardPreview"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
  >
    <el-icon><VideoCamera /></el-icon>
    <template #file="{ file }">
      <img v-if="coverUrl" :src="coverUrl" alt="" />
      <div class="box" v-if="coverUrl">
        <el-icon
          :class="props.kind ? 'iconCenter' : 'iconLeft'"
          @click="handlePictureCardPreview(file)"
          ><View
        /></el-icon>
        <el-icon v-if="!props.kind" class="iconRight" @click="handleRemove"><Delete /></el-icon>
        <!-- 蒙版 -->
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible" width="640px">
    <video style="width: 600px; height: 400px" :src="dialogVideoUrl" controls />
  </el-dialog>
</template>

<style scoped lang="scss">
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

// 图标显示及位置
.iconCenter {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.iconLeft {
  position: absolute;
  left: 25%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.iconRight {
  position: absolute;
  left: 75%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
// 添加蒙版
.box {
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000;
  opacity: 0.4;
}
:deep(.el-upload-list__item:hover) .box {
  display: block;
}
</style>
