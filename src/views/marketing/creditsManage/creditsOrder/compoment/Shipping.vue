<script setup lang="ts">
import Express from '@/views/marketing/creditsManage/creditsOrder/compoment/express.vue'
import StorePickUp from '@/views/marketing/creditsManage/creditsOrder/compoment/storePickUp.vue'
import VRSend from '@/views/marketing/creditsManage/creditsOrder/compoment/VRSend.vue'
import { ref } from 'vue'

const props = defineProps<{
  id: number
}>()

const activeClick = ref(1)
</script>

<template>
  <div class="main">
    <el-tabs v-model="activeClick">
      <el-tab-pane label="快递" :name="1">
        <Express v-if="props.id" :activeClick="activeClick" :id="props?.id"></Express>
      </el-tab-pane>
      <el-tab-pane label="门店配送" :name="2">
        <store-pick-up v-if="props.id" :activeClick="activeClick" :id="props?.id"></store-pick-up>
      </el-tab-pane>
      <el-tab-pane label="虚拟发货" :name="3">
        <VRSend v-if="props.id" :activeClick="activeClick" :id="props?.id"></VRSend>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
