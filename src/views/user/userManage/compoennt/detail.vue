<script setup lang="ts">
import { ref, watch } from 'vue'
import UserInfo from '@/views/user/userManage/compoennt/userInfo.vue'
import CostRecord from '@/views/user/userManage/compoennt/costRecord.vue'
import useDetail from '@/hooks/detail'
import OssImage from '@/components/OssImage.vue'
import UserPackage from '@/views/user/userManage/compoennt/userPackage.vue'

const props = defineProps<{
  visible: boolean
}>()
const { detail, loading } = useDetail()

// tabs切换
const activeTab = ref('1')

watch(
  () => props.visible,
  (val: any) => {
    if (!val) {
      activeTab.value = '1'
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="user_detail" v-loading="loading">
    <div class="user">
      <oss-image
        v-if="detail?.avatar"
        :paths="[detail?.avatar]"
        :width="60"
        :height="60"
        :radius="true"
      ></oss-image>
      <img v-else src="@/assets/avatar.png" alt="" />
      <span class="user_name">{{ detail?.nickname ? detail?.nickname : '' }}</span>
    </div>
    <div class="user_info">
      <div class="info">
        <span class="info_name">余额</span>
        <span class="info_data">{{
          detail?.wallet?.balance ? detail?.wallet?.balance + '元' : '0元'
        }}</span>
      </div>
      <div class="info">
        <span class="info_name">总订单数</span>
        <span class="info_data">{{ detail?.order_count ? detail?.order_count : '0' }}</span>
      </div>
      <div class="info">
        <span class="info_name">总消费金额</span>
        <span class="info_data">{{
          detail?.wallet?.total_consume ? detail?.wallet?.total_consume + '元' : '0元'
        }}</span>
      </div>
      <div class="info">
        <span class="info_name">剩余积分</span>
        <span class="info_data">{{ detail?.wallet?.credit ? detail?.wallet?.credit : '0' }}</span>
      </div>
      <div class="info">
        <span class="info_name">会员等级</span>
        <span class="info_data">{{ detail?.grade?.name ? detail?.grade?.name : '' }}</span>
      </div>
      <div class="info">
        <span class="info_name">消费次数</span>
        <span class="info_data">{{ detail?.consume_time ? detail?.consume_time : '0' }}</span>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="用户信息" name="1">
          <user-info v-if="activeTab === '1'" :detail="detail"></user-info>
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="2">
          <cost-record v-if="activeTab === '2'" :detail="detail"></cost-record>
        </el-tab-pane>
        <el-tab-pane label="用户券包" name="3">
          <user-package v-if="activeTab === '3'" :detail="detail"></user-package>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 用户数据
.user {
  margin-bottom: 10px;
  display: flex;
  .user_name {
    margin-left: 10px;
    padding-top: 5px;
    font-size: 16px;
    font-weight: bold;
  }
}
.user_info {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  height: 60px;
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 160px;
    .info_name {
      height: 30px;
      font-size: 14px;
    }
    .info_data {
      height: 20px;
      font-size: 14px;
    }
  }
}

:deep(.el-tabs__nav-wrap) {
  background-color: #f5f7fa;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  background-color: #fff;
  border-top: 2px solid #1890ff;
}
</style>
