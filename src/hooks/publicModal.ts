import { nextTick, reactive } from 'vue'
import useLinkStore from '@/stores/modules/links'
import { ElMessage } from 'element-plus'

const store = useLinkStore()

export default function usePublicModal() {
  const state = reactive<{
    id: any
    data: any
    couponVisible: boolean
    couponLoading: boolean
    labelVisible: boolean
    labelLoading: boolean
    batchVisible: boolean
    batchLoading: boolean
    shippingVisible: boolean
    shippingLoading: boolean
    checkVisible: boolean
    checkLoading: boolean
    addressVisible: boolean
    addressLoading: boolean
    sweepVisible: boolean
    sweepLoading: boolean
    ruleVisible: boolean
    ruleLoading: boolean
    teamVisible: boolean
    teamLoading: boolean
    saleVisible: boolean
    saleLoading: boolean
    orderVisible: boolean
    orderLoading: boolean
    linkVisible: boolean
    linkLoading: boolean
    refundOrderVisible: boolean
    refundOrderLoading: boolean
    originalOrderVisible: boolean
    originalOrderLoading: boolean
    qrVisible: boolean
    qrLoading: boolean
    groupVisible: boolean
    groupLoading: boolean
  }>({
    id: null,
    data: null,
    couponVisible: false,
    couponLoading: false,
    labelVisible: false,
    labelLoading: false,
    batchVisible: false,
    batchLoading: false,
    shippingVisible: false,
    shippingLoading: false,
    checkVisible: false,
    checkLoading: false,
    addressVisible: false,
    addressLoading: false,
    sweepVisible: false,
    sweepLoading: false,
    ruleVisible: false,
    ruleLoading: false,
    teamVisible: false,
    teamLoading: false,
    saleVisible: false,
    saleLoading: false,
    orderVisible: false,
    orderLoading: false,
    linkVisible: false,
    linkLoading: false,
    refundOrderVisible: false,
    refundOrderLoading: false,
    originalOrderVisible: false,
    originalOrderLoading: false,
    qrVisible: false,
    qrLoading: false,
    groupVisible: false,
    groupLoading: false
  })

  // 弹窗显示
  const showForm = (id?: any, type?: string) => {
    if (type === 'coupon') {
      if (id.length === 0) {
        ElMessage.warning('请选择需要发放的用户')
      } else {
        // 表单加载中
        state.couponVisible = true
        // 显示弹框
        state.couponLoading = true
      }
    }
    if (type === 'label') {
      if (id.length === 0) {
        ElMessage.warning('请选择需要设置标签的用户')
      } else {
        // 表单加载中
        state.labelVisible = true
        // 显示弹框
        state.labelLoading = true
      }
    }
    if (type === 'batch') {
      state.batchVisible = true
      // 显示弹框
      state.batchLoading = true
    }
    if (type === 'shipping') {
      state.shippingVisible = true
      // 显示弹框
      state.shippingLoading = true
    }
    if (type === 'check') {
      // 表单加载中
      state.checkLoading = true
      // 显示弹框
      state.checkVisible = true
    }

    if (type === 'address') {
      // 表单加载中
      state.addressLoading = true
      // 显示弹框
      state.addressVisible = true
    }
    if (type === 'sweep') {
      // 表单加载中
      state.sweepLoading = true
      // 显示弹框
      state.sweepVisible = true
    }
    if (type === 'rule') {
      // 表单加载中
      state.ruleLoading = true
      // 显示弹框
      state.ruleVisible = true
    }
    if (type === 'team') {
      // 表单加载中
      state.teamLoading = true
      // 显示弹框
      state.teamVisible = true
    }
    if (type === 'sale') {
      // 表单加载中
      state.saleLoading = true
      // 显示弹框
      state.saleVisible = true

      state.data = JSON.parse(JSON.stringify(id))
    }
    if (type === 'order') {
      // 表单加载中
      state.orderLoading = true
      // 显示弹框
      state.orderVisible = true
    }
    if (type === 'link') {
      // 表单加载中
      state.linkLoading = true
      // 显示弹框
      state.linkVisible = true
      state.id = id
    }
    if (type === 'refundOrder') {
      // 表单加载中
      state.refundOrderLoading = true
      // 显示弹框
      state.refundOrderVisible = true
      state.data = JSON.parse(JSON.stringify(id))
    }
    if (type === 'originalOrder') {
      // 表单加载中
      state.originalOrderLoading = true
      // 显示弹框
      state.originalOrderVisible = true
      state.data = JSON.parse(JSON.stringify(id))
    }
    if (type === 'qr') {
      state.qrVisible = true
      // 显示弹框
      state.qrLoading = true
      state.data = JSON.parse(JSON.stringify(id))
    }
    if (type === 'group') {
      state.groupVisible = true
      // 显示弹框
      state.groupLoading = true
      state.data = JSON.parse(JSON.stringify(id))
    }

    if (!id) {
      return
    } else {
      state.id = id
    }

    // 结束刷新
    nextTick(() => {
      state.couponLoading = false
      state.labelLoading = false
      state.batchLoading = false
      state.shippingLoading = false
      state.checkLoading = false
      state.addressLoading = false
      state.sweepLoading = false
      state.ruleLoading = false
      state.teamLoading = false
      state.saleLoading = false
      state.orderLoading = false
      state.linkLoading = false
      state.refundOrderLoading = false
      state.originalOrderLoading = false
      state.qrLoading = false
      state.groupLoading = false
    })
  }
  const showAddress = async (id: any, data: any, callback?: any) => {
    // 表单加载中
    state.linkLoading = true
    // 显示弹框
    state.linkVisible = true
    await store.saveLink(data, id, callback)
    state.id = id

    // 结束刷新
    nextTick(() => {
      state.linkLoading = false
    })
  }

  return {
    state,
    showForm,
    showAddress
  }
}
