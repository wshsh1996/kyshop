<script setup lang="ts">
import { ref, watch } from 'vue'
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'

const emit = defineEmits(['change'])
const props = defineProps<{
  tabBar: any
}>()

const config = ref(props.tabBar)

watch(
  () => config.value,
  (val: any) => {
    emit('change', val)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <div class="component">
    <div class="component_name">
      <span>{{ config.title }}</span>
    </div>
    <div class="component_pane">
      <div class="tip">图片建议宽度81*81px</div>
      <div class="tabBar-box" v-for="(item, index) in config.bind.lists" :key="index">
        <div class="img-box">
          <div class="img-item">
            <MaterialSelect v-model="item.selectedIconPath"></MaterialSelect>
            <div class="mark">选中</div>
          </div>
          <div class="img-item">
            <MaterialSelect v-model="item.iconPath"></MaterialSelect>
            <div class="mark">未选中</div>
          </div>
        </div>
        <div class="name-box">
          <div class="name">名称</div>
          <el-input v-model="item.text" maxlength="4" style="width: 200px"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component_name {
  padding-left: 5px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  //width: 100%;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
}
.component_pane {
  padding: 10px 20px;
}

.tip {
  margin-bottom: 15px;
}

.tabBar-box {
  margin-bottom: 15px;
  padding: 15px 15px;
  border: 1px solid #f2f2f2;
}

.img-box {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.img-item {
  display: flex;
  margin-right: 10px;
  position: relative;
}
.mark {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 100%;
}

.name-box {
  display: flex;
  align-items: center;
}
.name {
  width: 60px;
}
</style>
