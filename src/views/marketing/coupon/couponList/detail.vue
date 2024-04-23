<script setup lang="ts">
import useDetail from '@/hooks/detail'
import RecordList from '@/views/marketing/coupon/couponList/record-list.vue'

const { detail } = useDetail()
</script>

<template>
  <div>
    <record-list v-if="detail?.id" :id="detail?.id"></record-list>
  </div>
</template>

<style scoped lang="scss"></style>
