<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import { ApiSetTag, ApiUserDetail, ApiUserTags } from '@/api/user'
import type { RootObject } from '@/models/user'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  id: number | number[] | undefined
}>()

// 获取用户标签
const tagsList = ref<RootObject[]>()
const getTagsList = async () => {
  tagsList.value = await ApiUserTags()
}

// 多选标签
const selectList = ref<any>()
watch(
  () => props.id,
  (val: any) => {
    if (val.length > 0) {
      selectList.value = {
        user_ids: val,
        label_ids: []
      }
    } else if (typeof val === 'number') {
      selectList.value = {
        user_id: val,
        label_ids: []
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 获取用户详情
const useDetail = async () => {
  if (props.id && typeof props.id === 'number') {
    const res: any = await ApiUserDetail(props.id)
    if (res.labels.length > 0) {
      selectList.value.label_ids = res.labels.map((item: any) => item.id)
    }
  }
}

const selectTag = (item: RootObject) => {
  if (selectList.value) {
    let subscript = selectList.value.label_ids.indexOf(item.id) //indexOf:返回某个指定的字符串值在字符串中首次出现的位置
    if (subscript > -1) {
      selectList.value.label_ids.splice(subscript, 1) //splice:用于添加或删除数组中的元素
    } else {
      selectList.value.label_ids.push(item.id) //通过push方法将选中id添加到数组中
    }
  }
}

// 设置标签
const setTags = async () => {
  await ApiSetTag(selectList.value)
  ElMessage.success('设置成功')
  cancel()
}

// 关闭弹窗
const cancel: any = inject('cancel')
const onClick = () => {
  cancel()
}

onMounted(() => {
  getTagsList()
  useDetail()
})
</script>

<template>
  <div class="main" v-if="tagsList">
    <div class="box_tags">
      <div
        class="tags"
        :class="{ active: selectList?.label_ids.indexOf(item.id) > -1 }"
        v-for="item in tagsList"
        :key="item.id"
        @click="selectTag(item)"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="footer">
      <el-button @click="onClick">取消</el-button>
      <el-button type="primary" @click="setTags">确定</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
}
.box_tags {
  display: flex;
  width: 100%;
}
.tags {
  margin-right: 20px;
  margin-bottom: 30px;
  padding: 6px 15px;
  border-radius: 2px;
  background-color: #f2f2f2;
  cursor: pointer;
}
.active {
  color: #fff;
  background-color: var(--el-color-primary);
}
</style>
