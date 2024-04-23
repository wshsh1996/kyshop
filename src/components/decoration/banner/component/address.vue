<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import TabsMarket from '@/components/decoration/banner/component/tabsMarket.vue'
import TabsSort from '@/components/decoration/banner/component/tabsSort.vue'
import TabsProduct from '@/components/decoration/banner/component/tabsProduct.vue'
import TabsCredit from '@/components/decoration/banner/component/tabsCredit.vue'
import useLinkStore from '@/stores/modules/links'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  id: any
  visible: boolean
}>()
const store = useLinkStore()
const addressList = ref([
  { id: 1, name: '营销链接' },
  { id: 2, name: '商品分类' },
  { id: 3, name: '商品' },
  { id: 4, name: '积分商品' }
  // { id: 5, name: '自定义链接' }
])
const tabSelect = ref(1)
const link = ref()
// 关闭弹窗
const cancel: any = inject('cancel')
const onClick = () => {
  cancel()
}

// 保存链接
const saveLinks = () => {
  if (link.value) {
    store.saveLink(link.value, props.id)
    cancel()
  } else {
    ElMessage.warning('请选择链接')
  }
}

watch(
  () => props.visible,
  (val: any) => {
    if (val) {
      link.value = store.link
      if (!link.value) {
        tabSelect.value = 1
        link.value = ''
      }
      if (link.value.includes('pagesUser') || link.value.includes('pagesHome')) {
        tabSelect.value = 1
      }
      if (link.value.includes('/pages/category/category?id')) {
        tabSelect.value = 2
      }
      if (link.value.includes('goodsDetails')) {
        if (/Integral$/.test(link.value)) {
          tabSelect.value = 4
        } else {
          tabSelect.value = 3
        }
      }
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="main">
    <el-tabs v-model="tabSelect" tab-position="left" style="height: 500px">
      <el-tab-pane
        v-for="item in addressList"
        :key="item.id"
        :label="item.name"
        :name="item.id"
        style="height: 100%"
      >
        <!--    营销链接    -->
        <tabs-market v-if="tabSelect === 1" v-model:link="link" :id="item.id"></tabs-market>
        <!--    商品分类    -->
        <tabs-sort v-if="tabSelect === 2" v-model:link="link" :id="item.id"></tabs-sort>
        <!--    商品    -->
        <tabs-product v-if="tabSelect === 3" v-model:link="link" :id="item.id"></tabs-product>
        <!--    积分商品    -->
        <tabs-credit v-if="tabSelect === 4" v-model:link="link" :id="item.id"></tabs-credit>
        <!--    自定义链接    -->
        <!--        <tabs-custom v-model:link="link" :id="item.id"></tabs-custom>-->
      </el-tab-pane>
    </el-tabs>
    <div class="footer">
      <el-button @click="onClick">取消</el-button>
      <el-button type="primary" @click="saveLinks">确定</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  position: relative;
  min-height: 500px;
}

:deep(.el-tabs__content) {
  padding: 0 15px;
  height: 500px;
}
.footer {
  margin: 10px 0;
  position: absolute;
  bottom: 0;
  right: 20px;
}

// 商品分类
</style>
