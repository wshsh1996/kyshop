<template>
  <div>
    <div>剩余数量：{{ fileMax }}/{{ props.max }}</div>
    <!-- 图片列表类型-->
    <div class="list-warp">
      <div class="list-item" v-for="(pic, index) in selectPath" :key="index">
        <el-image fit="cover" style="width: 60px; height: 60px" :src="ImagePath(pic, 80, 80)" />
        <div class="delete-btn" @click.stop="deletePic(index)">x</div>
      </div>

      <div v-if="fileMax > 0" class="list-item upload-btn" @click="showDialog">
        <svg-icon icon="el-icon-picture" :size="20" color="#cccccc" />
      </div>
    </div>

    <good-manage-dialog
      :max="props.max"
      :id="selectId"
      ref="fileMangeDialogRef"
      @confirm="confirmHandle"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import GoodManageDialog from '@/components/SelectTemplate/dialog.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { ImagePath } from '@/hooks/image'
const emits = defineEmits(['update:modelValue'])
const props = withDefaults(
  defineProps<{
    modelValue?: any
    max: number
  }>(),
  {
    modelValue: '',
    max: 10
  }
)
const selectPath = ref<string[]>([])
const selectId = ref<any[]>([])
watch(
  () => props.modelValue,
  (val) => {
    if (Array.isArray(val.categoryIds)) {
      selectId.value = val.categoryIds
    }
    if (Array.isArray(val.img)) {
      selectPath.value = val.img
    }
  },
  {
    immediate: true,
    deep: true
  }
)

// 剩余可上传数量
const fileMax = computed(() => {
  return props.max - selectPath.value.length
})

// 更新modelValue
const updateModelValue = () => {
  if (props.max === 1) {
    emits('update:modelValue', { id: selectId.value[0], img: selectPath.value[0] })
  } else {
    emits('update:modelValue', { id: selectId.value, img: selectPath.value })
  }
}

const fileMangeDialogRef = ref<InstanceType<typeof GoodManageDialog>>()
const showDialog = () => {
  fileMangeDialogRef.value?.openDialog()
}

const confirmHandle = (data: any) => {
  let imgList = data.map((item: any) => item.images[0])
  let idList = data.map((item: any) => item.id)
  selectPath.value = imgList
  selectId.value = idList

  updateModelValue()
}

// 移除图片
const deletePic = (index: number) => {
  selectPath.value.splice(index, 1)
  selectId.value.splice(index, 1)
  updateModelValue()
}
</script>

<style lang="scss" scoped>
.avatar-warp {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  cursor: pointer;
  position: relative;
  &:hover {
    border-color: var(--el-color-primary);
  }
}
.list-warp {
  display: flex;
  flex-wrap: wrap;
  .list-item {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 60px;
    height: 60px;
    border: 1px dashed #ccc;
    cursor: pointer;
    &:hover {
      border-color: var(--el-color-primary);
    }
    &.upload-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        margin-right: 0;
      }
    }
  }
}
.delete-btn {
  position: absolute;
  background-color: #ff0000;
  top: -5px;
  right: -5px;
  color: #ffffff;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  line-height: 18px;
  text-align: center;
}
</style>
