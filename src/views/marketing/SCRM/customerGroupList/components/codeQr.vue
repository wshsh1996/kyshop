<script setup lang="ts">
import { ApiGroupQrcode } from '@/api/wChart'
import { nextTick, onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps<{
  detail?: any
}>()

const qr = ref()
const loading = ref(false)
const getQr = async () => {
  loading.value = true
  const res: any = await ApiGroupQrcode(props.detail?.data.id)
  qr.value = res.qr
  await nextTick(() => {
    loading.value = false
  })
}

// 下载二维码
const downloadQrcode = () => {
  loading.value = true
  const a = document.createElement('a')
  const url = qr.value
  axios
    .get(url, {
      responseType: 'blob'
    })
    .then((re: any) => {
      a.href = URL.createObjectURL(re.data)
      a.download = 'qr.png'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getQr()
})
</script>

<template>
  <div class="body_box" v-loading="loading">
    <div class="header">{{ props.detail?.data.name }}</div>
    <div class="qr">
      <img class="qr_img" :src="qr" alt="" />
    </div>
    <div class="des">
      二维码7天内（02月28日前）有效，再次获取将更新，并将以群主身份邀请用户入群。
    </div>
    <div class="downloadBox">
      <el-button type="primary" link @click="downloadQrcode">下载二维码</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.body_box {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
}
.header {
  padding: 10px 0;
  font-size: 16px;
}
.qr {
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
  .qr_img {
    width: 100%;
    height: 100%;
  }
}
.des {
  margin-bottom: 20px;
  width: 150px;
}
.downloadBox {
  padding: 10px 0;
  border-top: 1px solid #e5e6e8;
  display: flex;
  justify-content: center;
  width: 150px;
}
</style>
