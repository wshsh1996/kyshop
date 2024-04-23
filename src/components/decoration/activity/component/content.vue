<script setup lang="ts">
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import { onMounted, ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import { ArrowRight } from '@element-plus/icons-vue'
import usePublicModal from '@/hooks/publicModal'
import AddressModal from '@/components/decoration/banner/component/addressModal.vue'

const { state: publicState, showForm } = usePublicModal()

// 创建模板数组
const activityList = ref<any>([
  { id: 1, title: '今日推荐', des: '店主诚意推荐 品质商品', address: '' },
  { id: 2, title: '热门榜单', des: '店主诚意推荐 品质商品', address: '' },
  { id: 3, title: '首发新品', des: '店主诚意推荐 品质商品', address: '' },
  { id: 4, title: '促销单品', des: '店主诚意推荐 品质商品', address: '' }
])
// 添加模板
const addGroup = () => {
  if (activityList.value.length >= 4) return
  let id = 1
  activityList.value.forEach((item: any) => {
    if (item.id === id) {
      id = id + 1
    }
    return id
  })
  activityList.value.push({
    id: id,
    title: '',
    des: '',
    address: ''
  })
}
// 删除模板
const deleteGroup = (id: number) => {
  activityList.value = activityList.value.filter((item: any) => item.id !== id)
}

// 模板排序
const bannerSort = () => {
  const banner: any = document.querySelector('.content .banner_sort')
  Sortable.create(banner, {
    animation: 1000,
    handle: '.icon_sortable',
    onEnd(evt: any) {
      // 获取拖动前和拖动后的行索引——可以直接在这里拿到对应的列和排序后的位置进行保存
      const oldIndex = evt.oldIndex
      const newIndex = evt.newIndex
      // 根据行索引交换数据
      if (oldIndex !== newIndex) {
        // 删除位置 删除个数 替换元素
        activityList.value.splice(newIndex, 0, activityList.value.splice(oldIndex, 1)[0])
      }
    }
  })
}
onMounted(() => {
  bannerSort()
})
</script>

<template>
  <div class="content">
    <div class="component_info">
      <el-form>
        <el-form-item label="促销标题">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="促销简介">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span class="des">最多可添加4个板块，建议尺寸140 * 140px；鼠标拖拽左侧圆点可调整图片顺序</span>
    <div class="banner_sort">
      <div class="banner_img" v-for="item in activityList" :key="item.id" :id="item.id">
        <div class="icon_sortable">
          <span class="icon" v-for="item in 5" :key="item">..</span>
        </div>
        <material-select type="avatar"></material-select>
        <div class="banner_style">
          <div class="title">
            <span class="name">标题</span>
            <el-input v-model="item.title"></el-input>
          </div>
          <div class="title des">
            <span class="name">简介</span>
            <el-input v-model="item.des"></el-input>
          </div>
          <div class="address">
            <span class="name">链接</span>
            <el-input
              v-model="item.address"
              :suffix-icon="ArrowRight"
              placeholder="请输入链接"
              @focus="showForm(item.id, 'address')"
            ></el-input>
          </div>
        </div>
        <div class="delete" @click="deleteGroup(item.id)">
          <el-icon><Delete /></el-icon>
        </div>
      </div>
    </div>
    <div class="btn">
      <el-button class="add_group" type="primary" @click="addGroup">添加模板</el-button>
    </div>
    <!--  链接弹窗  -->
    <address-modal
      v-model:visible="publicState.addressVisible"
      :loading="publicState.addressLoading"
      :id="publicState.id"
      type="dialog"
      title="选择链接"
    ></address-modal>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin: 15px 0;
  width: 100%;
  .component_info {
    padding-top: 10px;
  }
  .des {
    font-size: 12px;
    color: #a8abb2;
  }
  .banner_img {
    margin: 15px 0;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    .icon_sortable {
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      height: 50px;
      font-size: 20px;
      color: #a8abb2;
      cursor: move;
      .icon {
        height: 5px;
      }
    }
    .banner_style {
      margin-left: 20px;
      .title,
      .address {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        .name {
          margin-right: 10px;
          width: 40px;
        }
      }
    }
    .delete {
      margin-left: 10px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .btn {
    text-align: center;
    .add_group {
      width: 80%;
      height: 40px;
    }
  }
}
</style>
