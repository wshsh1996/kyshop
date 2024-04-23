<template>
  <div class="navbar-right">
    <Document></Document>
    <Customer></Customer>
    <Fullscreen />
    <User />
  </div>
</template>

<script setup lang="ts">
import Fullscreen from './Fullscreen.vue'
import User from './User.vue'
import Document from '@/layout/components/Navbar/Document.vue'
import Customer from '@/layout/components/Navbar/Customer.vue'
</script>

<style lang="scss" scoped>
.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &-link {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    &-photo {
      width: 25px;
      height: 25px;
      border-radius: 100%;
    }
  }
}
</style>
