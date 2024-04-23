import { nextTick, reactive } from 'vue'

export default function useWelcome() {
  const state = reactive<{
    appVisible: boolean
    appLoading: boolean
    memberVisible: boolean
    memberLoading: boolean
    detail: boolean
  }>({
    appVisible: false,
    appLoading: false,
    memberVisible: false,
    memberLoading: false,
    detail: true
  })

  // 弹窗显示
  const showForm = (type?: any, detail?: any) => {
    if (type === 'app') {
      // 表单加载中
      state.appLoading = true
      // 显示弹框
      state.appVisible = true
    }
    if (type === 'member') {
      // 表单加载中
      state.memberLoading = true
      // 显示弹框
      state.memberVisible = true
      state.detail = detail !== 'detail'
    }

    nextTick(() => {
      state.appLoading = false
      state.memberLoading = false
    })
  }

  return {
    state,
    showForm
  }
}
