<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['change'])
const props = defineProps<{
  style: {
    name: string
    title: any
    style: any
  }
}>()

const config = ref(props.style)

watch(
  () => config.value,
  (val: any) => {
    emit('change', {
      name: val.name,
      title: val.title,
      style: val.style
    })
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <div class="component" v-if="props.style">
    <div class="component_name">
      <span>页面设置</span>
    </div>
    <div class="component_pane">
      <el-form>
        <el-form-item label="模板名称">
          <el-input
            v-model="config.name"
            placeholder="选填，不超过15个字"
            :max-length="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="页面标题">
          <el-input
            v-model="config.title"
            placeholder="选填，不超过30个字"
            :max-length="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="背景设置">
          <el-checkbox-group>
            <div class="bgc">
              <el-color-picker v-model="config.style.backgroundColor" />
            </div>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
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
:deep(.el-checkbox-group) {
  width: 100%;
}
.bgc,
.bgi {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
}
.bgi {
  .bgi_sty {
    border: 1px solid #f0f2f5;
    display: flex;
    justify-content: space-around;
    width: 150px;
    border-radius: 5px;
    .dan_tu {
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    .la_shen {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }
    .dan_tu,
    .ping_pu,
    .la_shen {
      border-right: 1px solid #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      font-size: 32px;
      border-collapse: collapse;
      cursor: pointer;
    }
    :hover {
      color: var(--el-color-primary);
    }
  }
}
.bgi_active {
  color: #fff !important;
  background-color: var(--el-color-primary);
}
</style>
