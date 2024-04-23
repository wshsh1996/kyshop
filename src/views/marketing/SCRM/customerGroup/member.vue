<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ref, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'
import usePropData from '@/hooks/propData'

const emits = defineEmits(['update:visible', 'update:sender'])
const props = defineProps<{
  width?: string | number
  visible?: boolean
  loading?: boolean
  sender?: string
  detail?: boolean
}>()

const formVisible = usePropData(() => props.visible, false)
const formLoading = usePropData(() => props.loading, false)
// 获取员工列表信息
const { state } = useCurd({
  url: '/admin/wework/employee',
  page: 1,
  limit: 100
})
const userInfo = ref<any>()

// 监听获取数据
watch(
  () => state.dataList,
  (val: any) => {
    userInfo.value = val
  },
  {
    immediate: true
  }
)

const content = ref('')
// 聚焦显示菜单，失焦隐藏
const activeShow = ref(false as boolean)
const showMenu = (type: string) => {
  if (type === 'open') {
    activeShow.value = true
  }
  if (type === 'close') {
    fn()
  }
}

// 防抖
function fn() {
  let timer = 0
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      activeShow.value = false
    }, 1000)
  }
}
// 搜索关键字
const searchKey = () => {
  userInfo.value = userInfo.value.filter((item: any) => {
    return item.name.includes(content.value)
  })
}
// 内容为空时，重新获取全部
watch(content, (val: string) => {
  if (val === '' || val.trim() === '') {
    userInfo.value = state.dataList
  }
})

// ---已选功能---
const saveUserInfo = ref<any[]>([])
const selectOk = (id: any) => {
  // 如果是详情，不能点击
  if (!props.detail) {
    return
  }
  // 将选中的信息保存到右侧结构中
  let arr: any[]
  arr = userInfo.value.filter((item: any, index: any) => {
    return id === index
  })
  saveUserInfo.value.push(...arr)
  saveUserInfo.value = saveUserInfo.value.filter((item: any, index: any, array: any) => {
    return array.indexOf(item) === index
  })
}

// 删除用户信息
const deleteUserInfo = (id: any) => {
  saveUserInfo.value.splice(id, 1)
}

// 取消关闭弹窗
const cancel = () => {
  if (saveUserInfo.value.length > 0) {
    emits('update:visible', false)
  } else {
    saveUserInfo.value = []
    emits('update:visible', false)
  }
}

// 保存信息，传id
const saveUserId = () => {
  const id = saveUserInfo.value.map((item: any) => {
    return item.userid
  })
  emits('update:sender', id)
  emits('update:visible', false)
}

// 监听id,若为undefined，则清空成员信息
watch(
  () => props.sender,
  (val: any) => {
    if (val === undefined) {
      saveUserInfo.value = []
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :close-on-click-modal="false"
    append-to-body
    direction="rtl"
    :size="width"
    @close="cancel"
  >
    <template #default>
      <div class="main" v-loading="formLoading">
        <div class="left">
          <!-- 搜索框 -->
          <el-input
            v-model="content"
            size="large"
            placeholder="搜索成员"
            @focus="showMenu('open')"
            @blur="showMenu('close')"
            clearable
          >
            <template #suffix>
              <el-button link size="small" @click="searchKey">搜索</el-button>
            </template>
          </el-input>
          <!-- 下拉菜单 -->
          <ul v-if="activeShow">
            <li v-for="(item, index) in userInfo" :key="index" @click="selectOk(index)">
              {{ item.name }} {{ item.email }}
            </li>
          </ul>
        </div>
        <!-- 右侧框 -->
        <div class="right">
          <h3>已选择成员</h3>
          <div class="save">
            <div class="save_user" v-for="(item, index) in saveUserInfo" :key="item.id">
              {{ item.name }} {{ item.email }}
              <span class="save_icon" @click="deleteUserInfo(index)" v-if="props.detail">
                <el-icon><Close /></el-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:footer v-if="props.detail">
      <slot name="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="saveUserId">确定</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  height: 300px;
}
.left {
  padding: 10px;
  width: 50%;
}
.right {
  flex: 1;
  padding-top: 20px;
  margin-left: 20px;
  h3 {
    margin-bottom: 20px;
  }
}

.save_user {
  width: 100%;
  height: 30px;
}

.save_icon {
  float: right;
}
ul {
  margin-top: 10px;
  border: 1px solid #c5c8ce;
  height: 260px;
  overflow: auto;
  border-radius: 10px;
}

li {
  //border-bottom: 1px solid #c5c8ce;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  height: 25px;
  list-style: none;
  cursor: pointer;
}
</style>
