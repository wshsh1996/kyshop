import { nextTick, reactive } from 'vue'

export default function useManage() {
  const state = reactive<{
    id: any
    listVisible: boolean
    listLoading: boolean
    orderLoading: boolean
    orderVisible: boolean
    outLoading: boolean
    outVisible: boolean
    memberVisible: boolean
    memberLoading: boolean
    teamOrderVisible: boolean
    teamOrderLoading: boolean
    teamOutVisible: boolean
    teamOutLoading: boolean
  }>({
    id: null,
    listVisible: false,
    listLoading: false,
    orderLoading: false,
    orderVisible: false,
    outLoading: false,
    outVisible: false,
    memberVisible: false,
    memberLoading: false,
    teamOrderVisible: false,
    teamOrderLoading: false,
    teamOutVisible: false,
    teamOutLoading: false
  })

  // 弹窗显示
  const showForm = (id?: any, type?: string) => {
    if (type === 'list') {
      // 表单加载中
      state.listLoading = true
      // 显示弹框
      state.listVisible = true
    }
    if (type === 'order') {
      // 表单加载中
      state.orderLoading = true
      // 显示弹框
      state.orderVisible = true
    }
    if (type === 'cash') {
      // 表单加载中
      state.outLoading = true
      // 显示弹框
      state.outVisible = true
    }
    if (type === 'member') {
      // 表单加载中
      state.memberLoading = true
      // 显示弹框
      state.memberVisible = true
    }
    if (type === 'teamOrder') {
      // 表单加载中
      state.teamOrderLoading = true
      // 显示弹框
      state.teamOrderVisible = true
    }
    if (type === 'teamOut') {
      // 表单加载中
      state.teamOutLoading = true
      // 显示弹框
      state.teamOutVisible = true
    }
    if (!id) {
      return
    } else {
      state.id = id
    }

    // 获取详情
    nextTick(() => {
      state.listLoading = false
      state.orderLoading = false
      state.outLoading = false
      state.memberLoading = false
      state.teamOrderLoading = false
      state.teamOutLoading = false
    })
  }

  return {
    state,
    showForm
  }
}
