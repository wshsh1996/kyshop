<script setup lang="ts">
import { ref } from 'vue'

// 创建协议列表
const tabList = ref([
  {
    id: 1,
    name: 'Privacy',
    title: '隐私协议'
  },
  {
    id: 2,
    name: 'User',
    title: '用户协议'
  }
])

// 当前绑定tabs
const activeName = ref('Privacy')
</script>
<script lang="ts">
import User from '@/views/setting/agreement/user.vue'
import Privacy from '@/views/setting/agreement/privacy.vue'

export default {
  components: {
    User,
    Privacy
  }
}
</script>
<template>
  <el-card>
    <el-tabs v-model="activeName" :border="false">
      <el-tab-pane v-for="item in tabList" :label="item.title" :name="item.name" :key="item.id">
        <component :is="item.name"></component>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped lang="scss"></style>
