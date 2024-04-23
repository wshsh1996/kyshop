<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import usePublicModal from '@/hooks/publicModal'
import AddressModal from '@/components/decoration/banner/component/addressModal.vue'

const { state: publicState, showForm } = usePublicModal()

// 创建模板数组
const textList = ref<any>({ id: 1, title: '标题', address: '' })
</script>

<template>
  <div class="content">
    <div class="banner_sort">
      <div class="banner_style">
        <div class="title">
          <span class="name">标题</span>
          <el-input v-model="textList.title"></el-input>
        </div>
        <div class="address">
          <span class="name">链接</span>
          <el-input
            :suffix-icon="ArrowRight"
            v-model="textList.address"
            placeholder="请输入链接地址"
            @focus="showForm(textList.id, 'address')"
          ></el-input>
        </div>
      </div>
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
}
</style>
