<template>
  <div>
    <!-- 头像类型-->
    <div v-if="props.type === 'avatar'" class="avatar-warp" @click="showDialog">
      <el-image
        fit="cover"
        style="width: 60px; height: 60px"
        v-if="selectPath.length"
        :src="ImagePath(selectPath, 80, 80)"
      />
      <div v-if="selectPath.length" class="delete-btn" @click.stop="deletePic(0)">x</div>
      <svg-icon v-else icon="el-icon-picture" :size="20" color="#cccccc" />
    </div>

    <!-- 图片列表类型-->
    <div v-if="props.type === 'list'" class="list-warp">
      <div class="list-item" v-for="(pic, index) in selectPath" :key="index">
        <el-image fit="cover" style="width: 60px; height: 60px" :src="ImagePath(pic, 80, 80)" />
        <div class="delete-btn" @click.stop="deletePic(index)">x</div>
      </div>

      <div v-if="fileMax > 0" class="list-item upload-btn" @click="showDialog">
        <svg-icon icon="el-icon-picture" :size="20" color="#cccccc" />
      </div>
    </div>

    <file-manage-dialog
      :kind="props?.type"
      :max="fileMax"
      ref="fileMangeDialogRef"
      @confirm="confirmHandle"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import FileManageDialog from './dialog.vue'
import { ElMessage } from 'element-plus'
import SvgIcon from '@/components/SvgIcon.vue'
import { ImagePath } from '@/hooks/image'
const emits = defineEmits(['update:modelValue'])
const props = withDefaults(
  defineProps<{
    modelValue?: string | string[]
    type?: 'avatar' | 'list'
    max?: number
  }>(),
  {
    modelValue: '',
    type: 'avatar',
    max: 1
  }
)

const selectPath = ref<string[]>([])
watch(
  () => props.modelValue,
  (val) => {
    if (Array.isArray(val)) {
      selectPath.value = val
    } else {
      selectPath.value = val ? [val] : []
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
    emits('update:modelValue', selectPath.value[0] || '')
  } else {
    emits('update:modelValue', selectPath.value)
  }
}

const fileMangeDialogRef = ref<InstanceType<typeof FileManageDialog>>()
const showDialog = () => {
  if (props.type === 'avatar' && selectPath.value.length) {
    return
  }
  if (selectPath.value.length >= props.max) {
    return ElMessage.warning(`最多只能上传${props.max}张图片`)
  }
  fileMangeDialogRef.value?.openDialog()
}

const confirmHandle = (data: any) => {
  selectPath.value = selectPath.value.concat(data) // 合并数组
  updateModelValue()
}

// 移除图片
const deletePic = (index: number) => {
  selectPath.value.splice(index, 1)
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
  .list-item {
    position: relative;
    margin-right: 10px;
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
