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
const bannerList = ref<any>([
  { id: 1, title: '', address: '' },
  { id: 2, title: '', address: '' }
])
// 添加模板
const addGroup = () => {
  let id = 1
  bannerList.value.forEach((item: any) => {
    if (item.id === id) {
      id = id + 1
    }
    return id
  })
  bannerList.value.push({
    id: id,
    title: '',
    address: ''
  })
}
// 删除模板
const deleteGroup = (id: number) => {
  bannerList.value = bannerList.value.filter((item: any) => item.id !== id)
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
        bannerList.value.splice(newIndex, 0, bannerList.value.splice(oldIndex, 1)[0])
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
    <span class="des">最多可添加1张图片，建议宽度750px；鼠标拖拽左侧圆点可调整图片顺序</span>
    <div class="banner_sort">
      <div class="banner_img" v-for="item in bannerList" :key="item.id" :id="item.id">
        <div class="icon_sortable">
          <span class="icon" v-for="item in 5" :key="item">..</span>
        </div>
        <material-select type="avatar"></material-select>
        <div class="banner_style">
          <div class="title">
            <span class="name">标题</span>
            <el-input v-model="item.title"></el-input>
          </div>
          <div class="address">
            <span class="name">链接</span>
            <el-input
              v-model="item.address"
              :suffix-icon="ArrowRight"
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
