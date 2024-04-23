<script setup lang="ts">
import { UploadFilled, SuccessFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userStore } from '@/stores'
import http from '@/utils/http'

const uploadHeader = {
  Authorization: 'Bearer ' + userStore.getToken()
}

const status = ref(1)
const successFile = ref(null)
const failFile = ref(null)
const loading = ref(false)
// 文件上传
const handleSuccess = (file: any) => {
  // 将返回的media_id赋值给formData
  console.log(file, 'file')
  successFile.value = file.success
  failFile.value = file.errors
  status.value = 2
}

// 下载失败列表
const outExport = () => {
  loading.value = true
  // '/admin/orders-batch-delivery?export=1'
  const url = `/admin/orders-batch-delivery?export=1`
  http
    .request('POST', url, {
      responseType: 'blob'
    })
    .then((re) => {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(re as Blob)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
<template>
  <el-upload
    v-loading="loading"
    class="upload-demo"
    drag
    action="/api/admin/orders-batch-delivery"
    :headers="uploadHeader"
    multiple
    :show-file-list="false"
    :on-success="handleSuccess"
  >
    <div class="empty" v-if="status === 1">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload_text">
        <span>批量发货单，拖入上传或</span>
        <el-button type="primary" link>点击上传</el-button>
      </div>
    </div>

    <div class="finish" v-if="status === 2">
      <el-icon class="el-icon--success"><SuccessFilled /></el-icon>
      <div class="el-upload_text_success">发货完成</div>
      <el-divider border-style="dashed" />
      <div class="order_info">
        <div class="success_upload">
          发货成功：<span class="success_upload_value">{{ successFile }}</span
          >个订单
        </div>
        <div class="fail_upload">
          发货失败：<span class="fail_upload_value">{{ failFile }}</span
          >个订单
        </div>
      </div>
    </div>
  </el-upload>
  <el-button
    v-if="status === 2"
    style="position: absolute; top: 88%; left: 50%; transform: translate(-50%)"
    type="primary"
    link
    @click="outExport"
  >
    下载发货失败列表
  </el-button>
</template>
<style lang="scss" scoped>
.el-icon--upload {
  color: #303133;
}
.el-icon--success {
  font-size: 40px;
  color: var(--el-color-primary);
}
.el-upload_text_success {
  font-size: 18px;
}
//.order_info {
//  display: flex;
//  justify-content: center;
//  flex-direction: column;
//}
.success_upload {
  //text-align: left;
}
.success_upload_value {
  color: var(--el-color-primary);
}
.fail_upload_value {
  color: #dc1831;
}
</style>
