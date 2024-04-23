<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ApiAppStatus } from '@/api/comment'
import { ElMessage, ElMessageBox } from 'element-plus'
import useConfigStore from '@/stores/modules/config'

const { state, query } = useCurd({
  url: '/admin/plugins',
  openPage: false
})

// 改变插件状态
const configStore = useConfigStore()
const changeStatus = async (name: string, enabled: boolean) => {
  if (!enabled) {
    ElMessageBox.confirm('禁用应用后，用户待成团的订单数据会报错，确定要禁用该应用吗？', '提示', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '我在想想'
    })
      .then(async () => {
        await ApiAppStatus({ name, enabled })
        ElMessage.success('禁用成功')
        configStore.refresh()
        query()
      })
      .catch(() => {
        query()
      })
  } else {
    await ApiAppStatus({ name, enabled })
    ElMessage.success('启用成功')
    configStore.refresh()
    query()
  }
}
</script>

<template>
  <div class="today_overview">
    <h4 class="title">营销组件</h4>
    <div class="overview_content">
      <div class="card_box" v-for="item in state.dataList" :key="item.name">
        <div class="btn">
          <el-switch
            v-model="item.enabled"
            @change="changeStatus(item.name, item.enabled)"
          ></el-switch>
        </div>
        <div class="bottom">
          <img
            :class="{ grey: !item.enabled }"
            style="width: 48px; height: 48px"
            :src="item.icon"
            alt=""
          />
          <div class="card_info">
            <p class="name">{{ item.title === '拼活动团' ? '拼团活动' : item.title }}</p>
            <div class="info">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 今日概览
.today_overview {
  .title {
    margin-bottom: 20px;
    padding-left: 20px;
    font-size: 15px;
  }
  .overview_content {
    display: flex;
    justify-content: space-around;
    width: 100%;

    .card_box {
      width: 24%;
      border-radius: 10px;
      background-color: #fff;
      .btn {
        padding: 10px 12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .bottom {
        padding: 0 35px 35px;
        display: flex;
        .card_info {
          margin-left: 25px;
          .name {
            margin-bottom: 10px;
            width: 170px;
            font-size: 16px;
            font-weight: bold;
          }
          .info {
            color: #b6b6b6;
          }
        }
      }
    }
  }
}
.disabled {
  background-color: #b6b6b6;
}
//.enabled {
//  color: #71b4e8;
//  border: 1px solid #71b4e8;
//}
//.disabled {
//  color: #b6b6b6;
//  border: 1px solid #b6b6b6;
//}
//<el-button
// round
// size="small"
//style="padding: 0 15px; font-weight: bold"
//:class="item.enabled ? 'disabled' : 'enabled'"
//@click="changeStatus(item.name, !item.enabled)"
//>{{ item.enabled ? '禁用' : '启用' }}</el-button
//>

// 哀悼模式
.grey {
  filter: grayscale(100%);
}
</style>
