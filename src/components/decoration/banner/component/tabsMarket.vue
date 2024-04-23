<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emits = defineEmits(['update:link'])
const props = defineProps<{
  id: any
  link: any
}>()

// 子标签页
const tabsList = ref([
  { id: 1, name: '领券中心', path: '/pagesUser/coupon/coupon' },
  { id: 2, name: '秒杀活动', path: '/pagesHome/sekilling/sekilling' },
  { id: 3, name: '拼团活动', path: '/pagesHome/group/group' },
  { id: 4, name: '积分商城', path: '/pagesUser/integral/integralShop' },
  { id: 5, name: '我的收藏', path: '/pagesUser/mark/mark' }
])
// 选择标签
const tabsActive = ref<any>()
const selectTag = (item: any) => {
  tabsActive.value = item.id
  emits('update:link', item.path)
}

onMounted(() => {
  if (props.link) {
    tabsList.value.forEach((item: any) => {
      if (item.path === props.link) {
        tabsActive.value = item.id
      }
    })
  }
})
</script>

<template>
  <div v-if="props.id === 1" class="market">
    <div class="box_tags">
      <div
        class="tags"
        :class="{ market_active: tabsActive === item.id }"
        v-for="item in tabsList"
        :key="item.id"
        @click="selectTag(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 营销
.market {
  padding: 5px 10px;
  position: relative;
  height: 100%;
  .box_tags {
    display: flex;
    width: 100%;
    .tags {
      margin-right: 20px;
      margin-bottom: 30px;
      padding: 6px 15px;
      border-radius: 2px;
      background-color: #f2f2f2;
      cursor: pointer;
    }
  }
}
.market_active {
  color: #fff;
  background-color: var(--el-color-primary) !important;
}
</style>
