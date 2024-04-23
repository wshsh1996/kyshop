<script setup lang="ts">
import useForm from '@/hooks/form'
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import Member from '@/views/marketing/SCRM/friendCircle/member.vue'
import useWelcome from '@/hooks/welcomeModal'
import useCurd from '@/hooks/curd'
import UploadImage from '@/components/uploadImage.vue'
import UploadVideo from '@/views/marketing/SCRM/friendCircle/upload-video.vue'
import type { FormRules } from 'element-plus'

const formRef = ref()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      name: detail?.name, // 任务名称
      user_type: detail?.user_type ? detail.user_type : 1, // 成员类型
      user_list: detail?.user_list, // 发表成员
      customer_type: detail?.customer_type ? detail.customer_type : 1, // 可见客户
      tags: detail?.tags || [], // 企业客户标签
      contents: detail?.contents, // 消息内容1
      media_type: detail?.media_type ? detail.media_type : 1, // 消息内容2选项 1 2 3
      images: detail?.images ? detail?.images : [], // 1图片
      video: detail?.video, // 2视频
      link: detail?.link || { title: '', url: '', media_id: '' } // 3图文链接
    }
  }
})
// 展示弹窗
const { state, showForm } = useWelcome()
// 获取可用客户
const { state: stateTags } = useCurd({
  url: '/admin/wework/tag',
  queryForm: {
    sublevel: 1,
    page: 1,
    limit: 100
  }
})

// 校验规则
const rules = ref<FormRules>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  user_type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  contents: [{ required: true, message: '请输入消息内容', trigger: 'blur' }]
})

// 接受image的media_id
const handImage = (e: any) => {
  formData.value.images.push(e.media_id)
}

// 接受link的media_id
const handLink = (e: any) => {
  console.log(e, 'e')
  formData.value.link.media_id = e.media_id
}
</script>

<template>
  <el-form
    ref="formRef"
    :rules="rules"
    :model="formData"
    label-position="right"
    label-width="100px"
    v-loading="formLoading"
  >
    <el-form-item label="任务名称" prop="name">
      <el-input
        v-model="formData.name"
        placeholder="请输入名称"
        style="width: 280px"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="成员类型" prop="user_type">
      <el-radio-group v-model="formData.user_type">
        <el-radio :label="1">全部成员</el-radio>
        <el-radio :label="2">选定成员</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="发表成员" v-if="formData.user_type === 2">
      <el-button @click="showForm('member')">选择成员</el-button>
      <el-button type="primary" link @click="showForm('member', 'detail')">
        查看成员<el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>
    </el-form-item>
    <el-form-item label="可见的客户">
      <el-radio-group v-model="formData.customer_type">
        <el-radio :label="1">全部客户</el-radio>
        <el-radio :label="2">筛选客户</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签" v-if="formData.customer_type === 2">
      <el-select
        v-if="formData.customer_type === 2"
        v-model="formData.tags"
        placeholder="请选择"
        style="width: 280px"
        multiple
        clearable
      >
        <el-option
          v-for="item in stateTags.dataList"
          :key="item.id"
          :value="item.tag_id"
          :label="item.name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="消息内容1" prop="contents">
      <el-input
        v-model="formData.contents"
        type="textarea"
        placeholder="请输入消息内容"
        :rows="3"
        style="width: 280px"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="消息内容2">
      <div>
        <el-radio-group v-model="formData.media_type">
          <el-radio :label="1">图片</el-radio>
          <el-radio :label="2">视频</el-radio>
          <el-radio :label="3">图文链接</el-radio>
        </el-radio-group>

        <!-- 图片 -->
        <div class="content_image" v-if="formData.media_type === 1">
          <upload-image
            :data="{ media_type: 'image', attachment_type: '1' }"
            action="/api/admin/wework/upload_attachment"
            :model-value="formData.images"
            @update:modelValue="handImage"
            type="friend"
          ></upload-image>
          <div style="font-size: 12px; color: #cccccc">
            因企业微信设置，图片长宽建议不超过1440*1080，大小不超过10M
          </div>
        </div>

        <!-- 视频 -->
        <div class="content_video" v-else-if="formData.media_type === 2">
          <uploadVideo
            v-model:model-value="formData.video"
            action="/api/admin/wework/upload_attachment"
            :data="{ media_type: 'video', attachment_type: '1' }"
          ></uploadVideo>
          <div style="font-size: 12px; color: #cccccc">建议时长：9~30s，大小不超过10M</div>
        </div>

        <!-- 图文链接 -->
        <div class="content_link" v-else>
          <el-form-item label="图文链接" label-width="70px">
            <el-input
              v-model="formData.link.url"
              placeholder="链接地址请以http或https开头"
              style="width: 200px"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="链接标题" label-width="70px">
            <el-input
              v-model="formData.link.title"
              placeholder="请输入链接标题"
              style="width: 200px"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="链接图" label-width="70px">
            <upload-image
              :data="{ media_type: 'image', attachment_type: '1' }"
              action="/api/admin/wework/upload_attachment"
              :model-value="formData.link"
              @update:modelValue="handLink"
              type="friend"
            ></upload-image>
          </el-form-item>
        </div>
      </div>
    </el-form-item>
  </el-form>
  <!-- 添加成员 -->
  <member
    v-model:visible="state.memberVisible"
    :width="800"
    :title="state.detail ? '添加成员' : '查看成员'"
    :loading="state.memberLoading"
    v-model:list="formData.user_list"
    :detail="state.detail"
  ></member>
</template>

<style scoped lang="scss">
.el-form-item {
  display: flex;
  margin-bottom: 20px;
}
:deep(.el-textarea__inner) {
  margin-bottom: 20px;
}
.customer {
  margin-bottom: 20px;
}
.label {
  display: flex;
  flex-direction: column;
  .label_btn {
    margin-top: 20px;
  }
}
.content_image {
  margin-top: 10px;
}
.content_video {
  margin-top: 10px;
}
.content_link {
  margin-top: 10px;
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
</style>
