<script setup lang="ts">
import usePropData from '@/hooks/propData'
import { ref, watch } from 'vue'
import type { IConfigApp } from '@/models/vip'
import UploadImage from '@/components/uploadImage.vue'

const emits = defineEmits(['update:visible', 'update:info'])
const props = defineProps<{
  width: string | number
  visible?: boolean
  loading?: boolean
  info?: IConfigApp
}>()

// 创建小程序数据
const appInfo = ref<IConfigApp>({
  title: '',
  pic_media_id: '',
  appid: '',
  page: ''
})

const formVisible = usePropData(() => props.visible, false)
const formLoading = usePropData(() => props.loading, false)

// 接受image的media_id
const handImage = (e: any) => {
  appInfo.value.pic_media_id = e.url
}

// 保存小程序信息
const saveAppInfo = () => {
  emits('update:info', appInfo.value)
  emits('update:visible', false)
}

// 取消关闭弹窗
const cancel = () => {
  appInfo.value = {
    title: '',
    pic_media_id: '',
    appid: '',
    page: ''
  }
  emits('update:info', appInfo.value)
  emits('update:visible', false)
}

// 小程序回显
watch(
  () => props.info,
  (val: any) => {
    appInfo.value = val
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :close-on-click-modal="false"
    append-to-body
    direction="rtl"
    :size="width"
    @close="emits('update:visible', false)"
  >
    <template #default>
      <el-form label-position="right" label-width="120px" v-loading="formLoading">
        <el-form-item label="封面图">
          <upload-image
            action="/api/admin/wework/upload"
            :model-value="appInfo.pic_media_id"
            @update:modelValue="handImage"
            type="welcome"
          ></upload-image>
        </el-form-item>
        <el-form-item label="小程序消息标题">
          <el-input v-model="appInfo.title" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="小程序Appid">
          <el-input v-model="appInfo.appid" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="小程序功能页">
          <el-input v-model="appInfo.page" style="width: 320px"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template v-slot:footer>
      <slot name="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveAppInfo">确定</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
