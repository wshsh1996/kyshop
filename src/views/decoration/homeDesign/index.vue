<script setup lang="ts">
import pageFoot from '@/views/decoration/homeDesign/components/pageFoot.vue'
import PageSet from '@/components/decoration/pageSet/index.vue'
import FootStyle from '@/components/decoration/pagesFoot/index.vue'
import Sortable from 'sortablejs'
import ComponentConfig from '@/views/decoration/homeDesign/componentConfig'
import { nextTick, onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ApiAddMode, ApiEditMode, ApiGetMode } from '@/api/decoration'
import { useRoute } from 'vue-router'

const route: any = useRoute()
const InitConfig = ref<any>()
// 获取详情
const getInitConfig = async () => {
  if (route.query.id) {
    InitConfig.value = await ApiGetMode(route.query.id)
    nextTick(() => {
      diyConfig.value = {
        name: InitConfig.value.name,
        title: InitConfig.value.title,
        style: InitConfig.value.style,
        components: InitConfig.value.components
      }
    })
  }
}

const diyConfig = ref({
  name: '默认主题',
  title: '首页',
  style: {
    backgroundColor: '#f4f4f4'
  },
  components: [] as any[]
})

const pageSetStyle = ref<any>()
const pageFootStyle = ref<any>({
  name: 'TabBar',
  title: '底部标签栏',
  bind: {
    lists: [
      {
        index: 0,
        text: '首页',
        iconPath: 's3://2024/01/20/7mUblltZ97dBQa7OoafZrUscoCMLuAqiZnNN1wkm.png',
        selectedIconPath: 's3://2024/01/20/eMSyQzvAiol9BgBeaBm7x4eh0npJJMPTcgcOM8AA.png',
        pagePath: 'pages/home/home'
      },
      {
        index: 1,
        text: '分类',
        iconPath: 's3://2024/01/20/YGuUpxPc42ipADw8iJGSISVEbb1FNrmyUd94d4SQ.png',
        selectedIconPath: 's3://2024/01/20/rl6pZM2G6HonB1gIJQc4s5sPFiyz8r04T28KMDwb.png',
        pagePath: 'pages/category/category'
      },
      {
        index: 2,
        text: '购物车',
        iconPath: 's3://2024/01/20/O9bHpOMjdAV1gRw1M0PLdYRHQoeJww3fH09ezwyC.png',
        selectedIconPath: 's3://2024/01/20/87NkpSTE4pXOydWOmzgVvxHoIElEfuX6jFzX0gjp.png',
        pagePath: 'pages/cart/cart'
      },
      {
        index: 3,
        text: '我的',
        iconPath: 's3://2024/01/20/2rCOZoKs9IsydcyihaCmzDQMxSSRYI3ZUMmeAV7W.png',
        selectedIconPath: 's3://2024/01/20/UXuRyvoXrQL7kz0H8bmkRF9Oo55WWrS3rH0PM1AN.png',
        pagePath: 'pages/user/user'
      }
    ]
  }
})

watch(
  () => diyConfig.value,
  (val: any) => {
    pageSetStyle.value = {
      name: val.name,
      title: val.title,
      style: val.style
    }
    val.components.forEach((item: any) => {
      if (item.name === 'TabBar') {
        pageFootStyle.value = item
      }
    })
  },
  {
    immediate: true,
    deep: true
  }
)

// 左侧
const leftMenu = ref(JSON.parse(JSON.stringify(ComponentConfig)))

// 点击组件传输数据
const clickGroup = (config: any) => {
  diyConfig.value.components.push(JSON.parse(JSON.stringify(config)))
  activeMenu.value = '2'
  activeGroup.value = diyConfig.value.components.length - 1
}

// 拖动组件插入模板功能
const mvIndex = ref(0)
const startDrop = ref(false)
const startMain = () => {
  mvIndex.value = 0
  startDrop.value = true
}
// 拖拽左侧数据传到中间
const toMain = (el: any) => {
  setTimeout(() => {
    diyConfig.value.components.splice(
      mvIndex.value,
      0,
      JSON.parse(el.item.getAttribute('data-config'))
    )
    activeMenu.value = '2'
    activeGroup.value = diyConfig.value.components.length - 1
    mvIndex.value = -1
    startDrop.value = false
  }, 60)
}
// 基础组件拖拽

const baseSort = () => {
  const base: any = document.querySelector('.base_component .base')
  Sortable.create(base, {
    group: {
      name: 'group',
      pull: false
    },
    animation: 1000,
    sort: false,
    onEnd: toMain,
    onStart: startMain
  })
}
// 营销组件拖拽
const marketSort = () => {
  const market: any = document.querySelector('.base_component .market')
  Sortable.create(market, {
    group: {
      name: 'group',
      pull: false
    },
    animation: 1000,
    sort: false,
    onEnd: toMain,
    onStart: startMain
  })
}
// 工具组件拖拽
const toolSort = () => {
  const tool: any = document.querySelector('.base_component .tool')
  Sortable.create(tool, {
    group: {
      name: 'group',
      pull: false
    },
    animation: 1000,
    sort: false,
    onEnd: toMain,
    onStart: startMain
  })
}

const currentComponentIndex = ref(-1)

// 拖拽功能

const phoneSort = () => {
  const phone: any = document.querySelector('.scrollCon .scroll-box')
  Sortable.create(phone, {
    group: {
      name: 'group',
      pull: false
    },
    animation: 1000,
    onEnd(el: any) {
      const arr = JSON.parse(JSON.stringify(diyConfig.value.components))
      const changeData = arr.splice(el.oldIndex, 1)
      arr.splice(el.newIndex, 0, changeData[0])
      diyConfig.value.components = []
      nextTick(() => {
        diyConfig.value.components = arr
      })
      activeGroup.value = el.newIndex
    }
  })
}

// 菜单栏
const activeMenu = ref('0')
const clickMenu = (num: string) => {
  activeMenu.value = num
}

// 组件点击事件
const rConfig = ref<any>('') // 右侧组件
const activeGroup = ref()
const bindConfig = (index: number) => {
  currentComponentIndex.value = index
  if (diyConfig.value.components[currentComponentIndex.value]) {
    // 先清空动态名称，再赋值，让动态组件重新加载
    rConfig.value = ''
    nextTick(() => {
      rConfig.value = diyConfig.value.components[currentComponentIndex.value].name + 'Style'
    })
  }
  activeGroup.value = index
  activeMenu.value = '2'
}

// 底部点击事件
const showFoot = () => {
  activeGroup.value = -101
  activeMenu.value = '2'
  currentComponentIndex.value = -1
}
// 删除模组
const handleDeleteGroup = (index: any) => {
  diyConfig.value.components.splice(index, 1)
  // 所有模组删除，清空右侧
  if (diyConfig.value.components.length <= 0) {
    rConfig.value = ''
  }
  // 删除模组后，自动定位下一个模组，没有下一个，则定位上一个
  if (activeGroup.value >= diyConfig.value.components.length) {
    setTimeout(() => {
      activeGroup.value = diyConfig.value.components.length - 1
      rConfig.value = ''
      nextTick(() => {
        currentComponentIndex.value = activeGroup.value
        rConfig.value = diyConfig.value.components[activeGroup.value].name + 'Style'
      })
    }, 30)
  }
}
// 复制模组
const handleCloneGroup = (group: any, index: any) => {
  diyConfig.value.components.splice(index, 0, JSON.parse(JSON.stringify(group)))
}
// 移动组件
const handleMoveGroup = (index: any, type: any) => {
  const arr = JSON.parse(JSON.stringify(diyConfig.value.components))
  if (type === 'up') {
    if (index === 0) {
      return ElMessage.warning('已经是最上层了')
    }
    const changeData = arr.splice(index, 1)
    arr.splice(index - 1, 0, changeData[0])
    setTimeout(() => {
      activeGroup.value = index - 1
    }, 30)
  }
  if (type === 'down') {
    if (index === diyConfig.value.components.length - 1) {
      return ElMessage.warning('已经是最下层了')
    }
    const changeData = arr.splice(index, 1)
    arr.splice(index + 1, 0, changeData[0])
    setTimeout(() => {
      activeGroup.value = index + 1
    }, 30)
  }

  diyConfig.value.components = []
  nextTick(() => {
    diyConfig.value.components = arr
  })
}

const updateDiy = (options: any) => {
  diyConfig.value.components[currentComponentIndex.value] = options
}

// 更新页面设置
const updatePageSet = (options: any) => {
  diyConfig.value.title = options.title
  diyConfig.value.name = options.name
  diyConfig.value.style = options.style
}

// 更新tabBar
const tabs = ref()
const tabsIndex = ref()
const updatePageFoot = (options: any) => {
  diyConfig.value.components.forEach((item: any, index: any) => {
    if (item.name === 'TabBar') {
      tabs.value = true
      tabsIndex.value = index
    } else {
      tabs.value = false
    }
  })
  if (tabs.value) {
    diyConfig.value.components[tabsIndex.value] = options
  } else {
    diyConfig.value.components.push(options)
  }
}

// 关闭界面

const closePage = () => {
  ElMessageBox.confirm('确定离开此页面？系统可能不会保存您所做的更改', '注意', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 关闭界面
      window.close()
    })
    .catch((e: any) => {
      console.log(e, 'e')
    })
}
// 保存界面
const savePage = async () => {
  if (route.query.id) {
    const id: any = JSON.parse(route.query.id)
    await ApiEditMode(id, diyConfig.value)
    ElMessage.success('修改成功')
  } else {
    await ApiAddMode(diyConfig.value)
    ElMessage.success('保存成功')
  }
}

// 循环获取父级元素
const getInsertIndex = (el: any): number => {
  if (el.classList.contains('scrollCon')) {
    return diyConfig.value.components.length ? diyConfig.value.components.length - 1 : 0
  }
  if (el.classList.contains('Js_component_item')) {
    return +el.getAttribute('data-index')
  } else {
    return getInsertIndex(el.parentElement)
  }
}

const demo = (e: any) => {
  mvIndex.value = getInsertIndex(e.target)
}

onMounted(() => {
  getInitConfig()
  baseSort()
  marketSort()
  toolSort()
  phoneSort()
})
</script>
<script lang="ts">
import Banner from '@/components/decoration/banner/index.vue'
import BannerStyle from '@/components/decoration/banner/indexStyle.vue'
import GoodsList from '@/components/decoration/productList/index.vue'
import GoodsListStyle from '@/components/decoration/productList/indexStyle.vue'
import NavList from '@/components/decoration/nav/index.vue'
import NavListStyle from '@/components/decoration/nav/indexStyle.vue'
import Search from '@/components/decoration/search/index.vue'
import SearchStyle from '@/components/decoration/search/indexStyle.vue'
import Skill from '@/components/decoration/spike/index.vue'
import SkillStyle from '@/components/decoration/spike/indexStyle.vue'
import Coupon from '@/components/decoration/coupon/index.vue'
import CouponStyle from '@/components/decoration/coupon/indexStyle.vue'
import Cube from '@/components/decoration/activity/index.vue'
import CubeStyle from '@/components/decoration/activity/indexStyle.vue'
import Group from '@/components/decoration/groupTeam/index.vue'
import GroupStyle from '@/components/decoration/groupTeam/indexStyle.vue'
import Customer from '@/components/decoration/supporter/index.vue'
import CustomerStyle from '@/components/decoration/supporter/indexStyle.vue'
import CustomText from '@/components/decoration/text/index.vue'
import CustomTextStyle from '@/components/decoration/text/indexStyle.vue'
import CustomRich from '@/components/decoration/rich/index.vue'
import CustomRichStyle from '@/components/decoration/rich/indexStyle.vue'
import Blank from '@/components/decoration/blank/index.vue'
import BlankStyle from '@/components/decoration/blank/indexStyle.vue'
import Promotion from '@/components/decoration/Promotion/index.vue'
import PromotionStyle from '@/components/decoration/Promotion/indexStyle.vue'
import PictureCube from '@/components/decoration/pictureCube/index.vue'
import PictureCubeStyle from '@/components/decoration/pictureCube/indexStyle.vue'
import ShortVideo from '@/components/decoration/shortVideo/index.vue'
import ShortVideoStyle from '@/components/decoration/shortVideo/indexStyle.vue'
import Broadcast from '@/components/decoration/broadcast/index.vue'
import BroadcastStyle from '@/components/decoration/broadcast/indexStyle.vue'

export default {
  components: {
    Banner: Banner,
    BannerStyle: BannerStyle,
    GoodsList: GoodsList,
    GoodsListStyle: GoodsListStyle,
    NavList: NavList,
    NavListStyle: NavListStyle,
    Search: Search,
    SearchStyle: SearchStyle,
    Skill: Skill,
    SkillStyle: SkillStyle,
    Coupon: Coupon,
    CouponStyle: CouponStyle,
    Cube: Cube,
    CubeStyle: CubeStyle,
    Group: Group,
    GroupStyle: GroupStyle,
    Customer: Customer,
    CustomerStyle: CustomerStyle,
    CustomText: CustomText,
    CustomTextStyle: CustomTextStyle,
    CustomRich: CustomRich,
    CustomRichStyle: CustomRichStyle,
    Blank: Blank,
    BlankStyle: BlankStyle,
    Promotion: Promotion,
    PromotionStyle: PromotionStyle,
    PictureCube: PictureCube,
    PictureCubeStyle: PictureCubeStyle,
    ShortVideo: ShortVideo,
    ShortVideoStyle: ShortVideoStyle,
    Broadcast: Broadcast,
    BroadcastStyle: BroadcastStyle
  }
}
</script>

<template>
  <div class="diy_page" v-if="diyConfig">
    <el-container>
      <el-header>
        <div class="left">首页设计</div>
        <div class="right">
          <el-button class="close_btn" @click="closePage">关闭</el-button>
          <el-button class="save_btn" @click="savePage">保存</el-button>
        </div>
      </el-header>
      <el-container class="bottom_container">
        <!--    左侧    -->
        <el-aside class="el_aside_left" width="320px">
          <div class="components">组件库</div>
          <div>
            <div class="base_component" v-for="item in leftMenu" :key="item.title">
              <div class="name">{{ item.title }}</div>
              <div class="component" :class="item.class">
                <div
                  class="box_icon"
                  v-for="i in item.components"
                  :key="i.name"
                  @click="clickGroup(i.config)"
                  :data-config="JSON.stringify(i.config)"
                >
                  <div class="iconfont" :class="i.icon"></div>
                  <span class="icon_name">{{ i.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-aside>
        <!--    中间    -->
        <el-main>
          <div class="wrapper-con">
            <div class="menu">
              <el-button
                class="set"
                :class="{ active_menu: activeMenu === '1' }"
                @click="clickMenu('1')"
                >页面设置</el-button
              >
              <span></span>
              <el-button
                class="decorate"
                :class="{ active_menu: activeMenu === '2' }"
                @click="clickMenu('2')"
                >页面装修</el-button
              >
            </div>
            <div class="content">
              <div
                class="con_txt"
                style="display: flex; flex-direction: column; overflow: hidden; height: 100%"
              >
                <div class="over_flowy">
                  <div class="picture">
                    <img src="../../../assets/electric.png" alt="" />
                  </div>
                  <div class="page-title">{{ diyConfig.title }}</div>
                </div>
                <div class="scrollCon">
                  <div style="width: 460px; margin: 0 auto">
                    <div
                      v-if="diyConfig.components"
                      @dragover="demo"
                      class="scroll-box"
                      :style="'background-color:' + diyConfig.style.backgroundColor"
                    >
                      <div
                        v-for="(item, index) in diyConfig.components"
                        :key="index"
                        class="group Js_component_item"
                        :data-index="index"
                        :class="{ on: activeGroup === index }"
                        @click="bindConfig(index)"
                      >
                        <div
                          v-if="mvIndex === index && startDrop"
                          style="height: 10px; background-color: #00e030"
                        ></div>
                        <component :is="item.name" v-bind="item.bind"></component>
                        <div class="delete-box"></div>
                        <div class="handleType">
                          <div
                            class="iconfont icon-shanchu"
                            @click="handleDeleteGroup(index)"
                          ></div>
                          <div
                            class="iconfont icon-fuzhi"
                            @click="handleCloneGroup(item, index)"
                          ></div>
                          <div
                            class="iconfont icon-shangyi"
                            @click="handleMoveGroup(index, 'up')"
                          ></div>
                          <div
                            class="iconfont icon-xiala"
                            @click="handleMoveGroup(index, 'down')"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <div class="page-foot">
                    <div class="group" :class="{ on: activeGroup === -101 }" @click="showFoot">
                      <page-foot v-bind:tabBar="pageFootStyle.bind"></page-foot>
                      <div class="delete-box"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <!--    右侧    -->
        <el-aside class="el_aside_right" width="400px">
          <!--          :key="new Date().getTime()"-->
          <div v-if="activeMenu === '1' && pageSetStyle">
            <PageSet v-bind:style="pageSetStyle" @change="updatePageSet" />
          </div>
          <FootStyle
            v-if="activeGroup === -101 && activeMenu === '2'"
            v-bind:tabBar="pageFootStyle"
            @change="updatePageFoot"
          ></FootStyle>
          <div v-if="currentComponentIndex >= 0 && activeMenu === '2'">
            <component
              :is="rConfig"
              v-bind="diyConfig.components[currentComponentIndex]"
              @change="updateDiy"
            ></component>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.diy_page {
  background-color: #f0f2f5;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: var(--el-color-primary);
  .left {
    font-size: 18px;
    color: #fff;
  }
  .right {
    .close_btn {
      border: 1px solid #fff;
      color: #fff;
      background-color: var(--el-color-primary);
    }
    .save_btn {
      color: var(--el-color-primary);
    }
  }
}

.el_aside_left {
  height: 100%;
  background-color: #fff;
  .components {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    font-size: 16px;
    color: var(--el-color-primary);
  }
  .base_component,
  .marketing_component,
  .tool_component {
    padding: 0 10px;
    .name {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      font-weight: bold;
    }
    .component {
      display: flex;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap;

      .box_icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 80px;
        height: 80px;

        .iconfont {
          width: 40px;
          height: 40px;
          font-size: 40px;
          color: var(--el-color-primary);
        }
      }
    }
  }

  .box_icon:hover {
    border-radius: 5px;
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0 0 15px #79aada;
  }
}

.el_aside_right {
  padding: 0 10px;
  height: 100%;
  background-color: #fff !important;
}

.bottom_container {
  height: calc(100vh - 62px);
}

:deep(.el-main) {
  height: 100%;
  .wrapper-con {
    flex: 1;
    display: flex;
    justify-content: center;
    position: relative;
    height: 100%;
    .menu {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 30px;
      top: 10px;
      z-index: 900;
      .set {
        margin-bottom: 10px;
      }
    }
    .content {
      position: relative;
      height: 100%;
      width: 100%;
      .con_txt {
        .over_flowy {
          overflow-y: scroll;
          .picture {
            width: 379px;
            height: 20px;
            margin: 0 auto;
            background-color: #fff;
            img {
              display: block;
              max-width: 100%;
              object-fit: contain;
            }
          }
          .page-title {
            position: relative;
            height: 35px;
            line-height: 35px;
            background: #fff;
            font-size: 15px;
            color: #333;
            text-align: center;
            width: 379px;
            margin: 0 auto;
          }
        }
        .scrollCon {
          overflow-y: scroll;
          overflow-x: hidden;
          height: calc(100vh - 160px);
          .scroll-box {
            flex: 1;
            width: 379px;
            height: calc(100vh - 220px);
            margin: 0 auto;
            padding-top: 1px;
            .group {
              position: relative;
              cursor: move;

              .delete-box {
                display: none;
                position: absolute;
                left: -2px;
                top: 0;
                width: 383px;
                height: 100%;
                border: 2px dashed #1890ff;
                z-index: 999;
              }

              &.on {
                cursor: move;
                .delete-box {
                  display: block;
                  border: 2px solid #1890ff;
                  box-shadow: 0 0 10px 0 rgba(24, 144, 255, 0.3);
                }
                .handleType {
                  display: block;
                }
              }
              &:hover {
                box-shadow: 0 0 3px 0 rgba(24, 144, 255, 0.3);
                transform: scale(1.009);
                z-index: 998;
              }
            }
          }
        }
        .footer {
          overflow-y: scroll;
          .page-foot {
            position: relative;
            width: 379px;
            margin: 0 auto 20px auto;
            cursor: move;
          }
        }
      }
    }
    .handleType {
      display: none;
      position: absolute;
      right: -43px;
      top: 0;
      width: 36px;
      height: 143px;
      border-radius: 4px;
      background-color: #1890ff;
      cursor: pointer;
      color: #fff;
      font-weight: bold;
      text-align: center;
      padding: 4px 0;

      .iconfont {
        padding: 7px 0;
        font-size: 22px;
        &.on {
          display: block;
          opacity: 0.4;
        }
      }
    }

    .active_menu {
      color: var(--el-color-primary);
      background-color: #ccddff;
    }
  }
}

// 底部点击
.group {
  position: relative;
  cursor: move;

  .delete-box {
    display: none;
    position: absolute;
    left: -2px;
    top: 0;
    width: 383px;
    height: 100%;
    border: 2px dashed #1890ff;
    z-index: 999;
  }

  &.on {
    cursor: move;

    .delete-box {
      display: block;
      border: 2px solid #1890ff;
      box-shadow: 0 0 10px 0 rgba(24, 144, 255, 0.3);
    }

    .handleType {
      display: block;
    }
  }
}
</style>
