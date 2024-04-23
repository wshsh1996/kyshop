<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import usePublicModal from '@/hooks/publicModal'
import { ArrowRight, Delete } from '@element-plus/icons-vue'
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import AddressModal from '@/components/decoration/banner/component/addressModal.vue'
import Sortable from 'sortablejs'
import { ElMessage } from 'element-plus'

const { state: publicState, showAddress } = usePublicModal()
const props = defineProps<{
  name: string
  title: string
  bind: any
}>()
const emits = defineEmits(['change'])
const config = ref(props.bind)

const linkOnChange = (path: any, index: any) => {
  config.value.list[index].link = path
}
watch(
  () => config,
  () => {
    emits('change', {
      ...config.value,
      name: props.name,
      title: props.title
    })
  }
)
// 右侧pane
const activeKey = ref('1')

// 内容
// 添加模板
const addGroup = () => {
  if (config.value.list.length >= 4) {
    ElMessage.warning('最多可添加4张图片')
    return
  }

  config.value.list.push({
    title: '',
    desc: '',
    img: '',
    link: ''
  })
}
// 删除模板
const deleteGroup = (id: number) => {
  config.value.list = config.value.list.filter((item: any) => item.title !== id)
}

// 模板排序
const bannerSort = () => {
  const banner: any = document.querySelector('.content .banner_sort')
  Sortable.create(banner, {
    animation: 1000,
    handle: '.icon_sortable',
    onEnd(el: any) {
      const arr = JSON.parse(JSON.stringify(config.value.list))
      const changeData = arr.splice(el.oldIndex, 1)
      arr.splice(el.newIndex, 0, changeData[0])
      config.value.list = []
      nextTick(() => {
        config.value.list = arr
      })
    }
  })
}

// 样式
// 重置
const resetColor = (type: string) => {
  if (type === 'titleColor') {
    config.value.titleColor = '#ff0000'
  }
  if (type === 'tag') {
    config.value.tagBackgroundColor = '#ffe5e3'
  }
  if (type === 'backgroundColor') {
    config.value.backgroundColor = '#ffe5e3'
  }
  // config.value.backgroundColor = '#ffe5e3'
}

onMounted(() => {
  bannerSort()
})
</script>

<template>
  <div class="activity_style">
    <div class="component_name">
      <span>{{ props.title }}</span>
    </div>
    <div class="component_pane">
      <div class="toggle_pane">
        <div
          class="toggle_pane_content common_content"
          :class="{ right_active: activeKey === '1' }"
          @click="activeKey = '1'"
        >
          内容
        </div>
        <div
          class="toggle_pane_style common_content"
          :class="{ right_active: activeKey === '2' }"
          @click="activeKey = '2'"
        >
          样式
        </div>
      </div>
    </div>
    <!--  内容  -->
    <div v-if="activeKey === '1'" class="content">
      <div class="component_info">
        <el-form>
          <el-form-item label="促销标题">
            <el-input v-model="config.title"></el-input>
          </el-form-item>
          <el-form-item label="促销简介">
            <el-input v-model="config.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span class="des"
        >最多可添加4个板块，建议尺寸140 * 140px；鼠标拖拽左侧圆点可调整图片顺序</span
      >
      <div class="banner_sort">
        <div class="banner_img" v-for="(item, index) in config.list" :key="index">
          <div class="icon_sortable">
            <span class="icon" v-for="t in 5" :key="t">..</span>
          </div>
          <material-select v-model="item.img" type="avatar"></material-select>
          <div class="banner_style">
            <div class="title">
              <span class="name">标题</span>
              <el-input v-model="item.title"></el-input>
            </div>
            <div class="title des">
              <span class="name">简介</span>
              <el-input v-model="item.desc"></el-input>
            </div>
            <div class="address">
              <span class="name">链接</span>
              <el-input
                v-model="item.link"
                :suffix-icon="ArrowRight"
                placeholder="请输入链接"
                @click="showAddress(index, item.link, linkOnChange)"
              ></el-input>
            </div>
          </div>
          <div class="delete" @click="deleteGroup(item.title)">
            <el-icon><Delete /></el-icon>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button class="add_group" type="primary" @click="addGroup">添加模板</el-button>
      </div>
      <!--  链接弹窗  -->
      <address-modal
        v-model:visible="publicState.linkVisible"
        :loading="publicState.linkLoading"
        :id="publicState.id"
        type="dialog"
        title="选择链接"
      ></address-modal>
    </div>
    <!--  样式  -->
    <div v-if="activeKey === '2'" class="content">
      <el-form label-position="left" label-width="100px">
        <el-form-item label="促销标题颜色">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-color-picker v-model="config.titleColor" />
              <el-button class="color_reset" link @click="resetColor('titleColor')">重置</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="标签背景颜色">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-color-picker v-model="config.tagBackgroundColor" />
              <el-button class="color_reset" link @click="resetColor('tag')">重置</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="背景颜色">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-color-picker v-model="config.backgroundColor" />
              <el-button class="color_reset" link @click="resetColor('backgroundColor')"
                >重置</el-button
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item label="页面间距">
          <div class="banner_radius">
            <el-slider
              v-model="config.marginTop"
              show-input
              :show-input-controls="false"
              :min="0"
            ></el-slider>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.activity_style {
  padding: 0 10px;
}
.component_name {
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  span {
    margin-left: 10px;
  }
}
.component_pane {
  padding-top: 10px;
  width: 100%;

  .toggle_pane {
    display: flex;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    background-color: #f2f2f2;
    .common_content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 30px;
      background-color: #f2f2f2;
      cursor: pointer;
    }
    .toggle_pane_content {
      border-bottom-left-radius: 15px;
      border-top-left-radius: 15px;
    }
    .toggle_pane_style {
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
    }
  }
}
.right_active {
  color: #fff;
  background-color: var(--el-color-primary) !important;
}

// 内容
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

// 样式
:deep(.el-form-item) {
  align-items: center;
}
.banner_radius {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.bgi {
  display: flex;
  justify-content: space-between;
  .bgi_sty {
    border: 1px solid #f0f2f5;
    display: flex;
    justify-content: space-around;
    //width: 100px;
    border-radius: 5px;
    .icon_box:first-child {
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    .icon_box:last-child {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }
    .icon_box {
      border-right: 1px solid #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      font-size: 25px;
      border-collapse: collapse;
      cursor: pointer;
      //.icon:hover {
      //  color: var(--el-color-primary);
      //}
    }
  }
}
.bgi_active {
  color: #fff !important;
  background-color: var(--el-color-primary);
}
.bgi .color_reset {
  margin-left: 5px;
}
</style>
