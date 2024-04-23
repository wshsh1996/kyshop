<script setup lang="ts">
import Member from '@/views/marketing/SCRM/welcome/member.vue'
import App from '@/views/marketing/SCRM/welcome/app.vue'
import useWelcome from '@/hooks/welcomeModal'
import useForm from '@/hooks/form'
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import UploadImage from '@/components/uploadImage.vue'

const formRef = ref()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      type: detail?.type ? detail.type : 1, // 欢迎语类型
      user_id: detail?.user_id, // 用户名称
      content: detail?.content, // 欢迎语内容
      image: detail?.image, // 图片
      mini_program: detail?.mini_program || {
        title: '',
        pic_media_id: '',
        appid: '',
        page: ''
      }, // 小程序
      sort: detail?.sort // 排序
    }
  }
})
const { state, showForm } = useWelcome()

// 插入客户名称
const showContent = () => {
  formData.value.content = '##客户名称##，欢迎加入'
}

// 接收小程序数据
const handleMiniProgram = (e: any) => {
  formData.value.mini_program = e
}

// 接收上传图片的url
const handleImage = (e: any) => {
  formData.value.image = e.url
}
</script>

<template>
  <el-form ref="formRef" label-position="right" label-width="100px" v-loading="formLoading">
    <el-form-item label="类型">
      <el-radio-group v-model="formData.type">
        <el-radio :label="1">通用</el-radio>
        <el-radio :label="2">指定企业成员</el-radio>
      </el-radio-group>
      <el-text type="info" tag="div"
        >一个成员如果被设置了多个欢迎语，将会使用最新设置或修改的欢迎语</el-text
      >
    </el-form-item>
    <el-form-item label="添加成员" v-if="formData.type === 2">
      <div>
        <el-button @click="showForm('member')">添加成员</el-button>
        <el-button type="primary" link @click="showForm('member', 'detail')">
          查看成员<el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </el-form-item>
    <el-form-item label="欢迎语内容">
      <el-input v-model="formData.content" type="textarea" style="width: 260px" rows="3"></el-input>
      <div class="customer">
        <el-button type="primary" @click="showContent">插入客户名称</el-button>
        <el-text type="info" tag="div"
          >可以插入客户名称，在发送给客户之前系统会自动解析成客户的名称</el-text
        >
      </div>
      <div>
        <el-button type="primary" @click="showForm('app')">添加小程序</el-button>
      </div>
    </el-form-item>
    <el-form-item label="图片">
      <upload-image
        action="/api/admin/wework/upload"
        :model-value="formData.image"
        @update:model-value="handleImage"
        type="welcome"
      ></upload-image>
    </el-form-item>
    <el-form-item label="排序">
      <el-input-number v-model="formData.sort" :min="1"></el-input-number>
      <el-text type="info" tag="div">数字越大，排序越靠前</el-text>
    </el-form-item>
  </el-form>
  <!-- 小程序弹窗 -->
  <app
    v-model:visible="state.appVisible"
    :width="800"
    title="添加小程序"
    :loading="state.appLoading"
    :info="formData.mini_program"
    @update:info="handleMiniProgram"
  ></app>
  <!-- 选择成员弹窗 -->
  <member
    v-model:visible="state.memberVisible"
    :width="800"
    :title="state.detail ? '添加成员' : '查看成员'"
    :loading="state.memberLoading"
    v-model:id="formData.user_id"
    :detail="state.detail"
  ></member>
</template>

<style scoped lang="scss">
.el-form-item {
  display: flex;
  margin-bottom: 20px;
  :deep(.el-form-item__content) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: none;
  }
}
:deep(.el-textarea__inner) {
  margin-bottom: 20px;
}
.customer {
  margin-bottom: 20px;
}
</style>
