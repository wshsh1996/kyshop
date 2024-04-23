import { nextTick, reactive } from 'vue'

export default function useArea() {
  const state = reactive<{
    index: any
    data: any
    areaVisible: boolean
    areaLoading: boolean
  }>({
    areaVisible: false,
    areaLoading: false,
    data: '',
    index: ''
  })

  // 弹窗显示
  const showForm = (row: any, index: any) => {
    // 表单加载中
    state.areaLoading = true
    // 显示弹框
    state.areaVisible = true
    state.index = index
    // 将当前行的内容赋值给data
    state.data = row

    nextTick(() => {
      state.areaLoading = false
    })
  }

  return {
    state,
    showForm
  }
}
