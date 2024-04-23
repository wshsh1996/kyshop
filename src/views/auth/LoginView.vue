<script lang="ts" setup>
import { ref } from 'vue'
import { userStore, configStore } from '@/stores'
import { useRouter } from 'vue-router'
import type { ILoginRequest } from '@/models/user'
import useLoading from '@/hooks/loading'
import type { FormInstance } from 'element-plus'
import { validateForm } from '@/utils'
import OssImage from '@/components/OssImage.vue'

const router = useRouter()

// 登录数据
const loginData = ref({} as ILoginRequest)

// 是否记住登录
const remember = ref(false)

// 表单实例
const loginFormRef = ref<FormInstance>()

// 登录菊花转
const loading = useLoading()
// 点击登录
const submit = (formEl?: FormInstance) => {
  validateForm(formEl).then(() => {
    loading.start()
    userStore
      .login(loginData.value, remember.value)
      .then(() => {
        router.push('/')
      })
      .finally(loading.end)
  })
}
</script>
<template>
  <div class="login-warp">
    <div class="login-main">
      <div class="right">
        <div style="margin-bottom: 15px; text-align: center">
          <oss-image :radius="true" :paths="[configStore.logo]"></oss-image>
        </div>
        <h2 style="color: #000">电商后台管理系统</h2>
        <el-form
          ref="loginFormRef"
          :disabled="loading.status"
          :model="loginData"
          @keyup.enter="submit(loginFormRef)"
        >
          <el-form-item
            prop="username"
            :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
          >
            <el-input
              v-model="loginData.username"
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
          >
            <el-input
              show-password
              v-model="loginData.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item class="remember">
            <el-checkbox v-model="remember" label="记住密码" class="flex-1"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="submit(loginFormRef)"
              :loading="loading.status"
              >立即登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-warp {
  background: #ffffff url('@/assets/login.png') no-repeat center;
  position: absolute;
  overflow: hidden;
  background-size: cover;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .login-main {
    width: 460px;
    max-width: 90%;
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    box-shadow: 0 0 13px 5px rgb(14 25 80 / 20%);
    border-radius: 30px;
    display: flex;
    @media screen and (max-width: 960px) {
      width: 418px;
    }
    //.left {
    //  flex: 1;
    //  text-align: center;
    //  display: flex;
    //  flex-direction: column;
    //  justify-content: center;
    //  color: #ffffff;
    //  background-size: cover;
    //  h1 {
    //    font-size: 36px;
    //    margin-bottom: 20px;
    //  }
    //  p {
    //    font-size: 18px;
    //  }
    //  @media screen and (max-width: 960px) {
    //    display: none;
    //  }
    //}
    .right {
      width: 100%;
      padding: 60px;
      background-color: #ffffff;
      @media screen and (min-width: 960px) and (max-width: 1200px) {
        width: 400px;
      }
      @media screen and (max-width: 960px) {
        width: 418px;
      }
      h2 {
        letter-spacing: 2px;
        margin-bottom: 50px;
        display: block;
        text-align: center;
        color: #000;
        font-size: 25px;
      }
      .remember :deep(.el-form-item__content) {
        display: flex;
        justify-content: flex-end;
      }
      :deep(.el-input__wrapper) {
        box-shadow: none;
        border-bottom: 1px solid #e6e6e6;
        height: 48px;
        font-size: 16px;
      }
      .captcha-img {
        cursor: pointer;
        position: absolute;
        right: 0;
        bottom: 2px;
      }
      .login-btn {
        height: 56px;
        line-height: 56px;
        width: 82%;
        border: none;
        border-radius: 60px;
        background: var(--el-color-primary);
        color: #fff;
        font-size: 18px;
        letter-spacing: 2px;
        cursor: pointer;
        transition: 0.3s all linear;
        margin: 20px auto 0;
      }
    }
  }
}
:deep(.avatar) {
  border-radius: 50%;
}
</style>
