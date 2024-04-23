<script setup lang="ts">
import useForm from '@/hooks/form'
import { ref, watch } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import useWelcome from '@/hooks/welcomeModal'
import Member from '@/views/marketing/SCRM/customerGroup/member.vue'
import App from '@/views/marketing/SCRM/customerGroup/app.vue'
import useCurd from '@/hooks/curd'
import type { FormRules } from 'element-plus'
import UploadImage from '@/components/uploadImage.vue'

const formRef = ref()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      name: detail?.name, // 群发名称
      contents: detail?.contents, // 群发内容
      sender: detail?.sender, // 群发账号
      type: detail?.type ? detail?.type : 1, // 选择客户 1 全部 2 筛选
      tag: detail?.tag, //
      images: detail?.images, // 图片
      miniprogram: detail?.miniprogram || {
        title: '',
        pic_media_id: '',
        appid: '',
        page: ''
      } // 小程序
    }
  }
})
// 获取可用客户
const { state: stateTags } = useCurd({
  url: '/admin/wework/tag',
  queryForm: {
    sublevel: 1,
    page: 1,
    limit: 100
  }
})
const { state, showForm } = useWelcome()

// 校验规则
const rules = ref<FormRules>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择客户', trigger: 'blur' }],
  sender: [{ required: true, message: '请选择群发账号', trigger: 'change' }]
})

// 接受image传递的图片地址
const handleImage = (e: any) => {
  formData.value.images = e.url
}

// 监听选择客户类型
watch(
  () => formData.value.type,
  (val: any) => {
    if (val === 1) {
      formData.value.tag = null
    }
  }
)
</script>

<template>
  <el-form
    ref="formRef"
    :rules="rules"
    :model="formData"
    label-position="right"
    label-width="120px"
    v-loading="formLoading"
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="formData.name" placeholder="请输入名称" style="width: 280px"></el-input>
    </el-form-item>
    <el-form-item label="选择群发账号" prop="sender">
      <el-button @click="showForm('member')">选择成员</el-button>
      <el-button type="primary" link @click="showForm('member', 'detail')">
        查看账号<el-icon class="el-icon--right"><ArrowRight /></el-icon>
      </el-button>
    </el-form-item>
    <el-form-item label="选择客户" prop="type">
      <el-radio-group v-model="formData.type">
        <el-radio :label="1">全部客户</el-radio>
        <el-radio :label="2">筛选客户</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签" v-if="formData.type === 2">
      <div class="label">
        <el-select multiple v-model="formData.tag" placeholder="请选择" style="width: 280px">
          <el-option
            v-for="item in stateTags.dataList"
            :key="item.id"
            :value="item.tag_id"
            :label="item.name"
          ></el-option>
        </el-select>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="showForm('app')">添加小程序</el-button>
    </el-form-item>
    <el-form-item label="群发内容">
      <el-input
        v-model="formData.contents"
        type="textarea"
        rows="3"
        placeholder="请输入名称"
        style="width: 280px"
      ></el-input>
    </el-form-item>
    <el-form-item label="图片">
      <upload-image
        action="/api/admin/wework/upload"
        :model-value="formData.images"
        @update:modelValue="handleImage"
        type="clientSend"
      ></upload-image>
    </el-form-item>
  </el-form>
  <!-- 添加成员 -->
  <member
    v-model:visible="state.memberVisible"
    :width="800"
    :title="state.detail ? '添加成员' : '查看成员'"
    :loading="state.memberLoading"
    v-model:sender="formData.sender"
    :detail="state.detail"
  ></member>
  <!-- 添加小程序 -->
  <app
    v-model:visible="state.appVisible"
    :width="800"
    title="添加小程序"
    :loading="state.appLoading"
    v-model:program="formData.miniprogram"
  ></app>
</template>

<style scoped lang="scss">
.el-form-item {
  display: flex;
  margin-bottom: 20px;
  //:deep(.el-form-item__content) {
  //  display: flex;
  //  flex-direction: column;
  //  align-items: flex-start;
  //  flex: none;
  //}
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
</style>
