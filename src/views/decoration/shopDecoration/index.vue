<script setup lang="ts">
import useCurd from '@/hooks/curd'
import router from '@/router'
import PageFoot from '@/views/decoration/homeDesign/components/pageFoot.vue'
import { ElMessage } from 'element-plus'
import { ref, watch, nextTick } from 'vue'

const { state, useMode, getDetail } = useCurd({
  url: '/admin/diy',
  openPage: false
})

// 获取已启用的数据模板
const enableList = ref()
const diyConfig = ref({
  name: '默认主题',
  title: '首页',
  style: {
    backgroundColor: '#f4f4f4'
  },
  components: [] as any[]
})

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
  () => state.dataList,
  async (val: any) => {
    if (val) {
      const id = await val.find((item: any) => item.enabled).id
      // 获取启用的模板详情
      enableList.value = await getDetail(id)
      nextTick(() => {
        diyConfig.value = {
          name: enableList.value.name,
          title: enableList.value.title,
          style: enableList.value.style,
          components: enableList.value.components
        }
      })
    }
  }
)

// 跳转设计页面
// router.resolve 可以新开页面  router.push 单页面跳转
const url: any = router.resolve('/decoration/homeDesign')
const toDesign = () => {
  if (state.dataList) {
    if (state.dataList.length >= 10) return ElMessage.error('模板数量不能超过10个')
    window.open(url.href)
  }
}

// 编辑
const Edit = (id: any) => {
  getDetail(id).then(() => {
    const urls: any = router.resolve(`/decoration/homeDesign/?id=${id}`)
    // {
    //   path: '/decoration/homeDesign',
    //     query: {
    //   data: JSON.stringify(state.detailData)
    // }
    // }
    window.open(urls.href)
  })
}

// onMounted(() => {
//   nextTick(() => {
//     getEnabled()
//   })
// })
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
    PictureCubeStyle: PictureCubeStyle
  }
}
</script>

<template>
  <el-card class="header">
    <div class="header-right">
      <el-button type="primary" @click="toDesign">添加模板</el-button>
    </div>
    <div class="main">
      <!--  启用模板  -->
      <div class="wrapper-con" v-if="diyConfig.components.length">
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
              <div style="margin: 0 auto">
                <div
                  v-if="diyConfig.components"
                  class="scroll-box"
                  :style="'background-color:' + diyConfig.style.backgroundColor"
                >
                  <div v-for="(item, index) in diyConfig.components" :key="index" class="group">
                    <component :is="item.name" v-bind="item.bind"></component>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">
              <div class="page-foot">
                <div class="group">
                  <page-foot v-bind:tabBar="pageFootStyle.bind"></page-foot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <el-table
        :data="state.dataList"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#F1F1F1',
          height: '50px',
          color: '#333'
        }"
        :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
        v-loading="state.listLoading"
        :row-key="state.primaryKey"
      >
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="name" label="模板名称"> </el-table-column>
        <el-table-column prop="title" label="页面标题"> </el-table-column>
        <el-table-column prop="updated_at" label="最近更新时间"> </el-table-column>
        <el-table-column prop="enabled" label="状态">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.enabled">已启用</el-tag>
            <el-tag type="warning" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="Edit(row.id)">编辑</el-button>
            <el-button type="primary" :disabled="row.enabled" link @click="useMode(row.id)"
              >启用模板</el-button
            >
          </template>
        </el-table-column>
        <template #empty>
          <el-empty></el-empty>
        </template>
      </el-table>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.header {
  height: 760px;
}
.header-right {
  margin-bottom: 20px;
}
//.header {
//  display: flex;
//  justify-content: space-between;
//  .header-left {
//    flex: 1;
//  }
//}
:deep(.el-form) {
  margin-bottom: 15px;
}
.main {
  display: flex;
  justify-content: space-between;
}

// 模板
.wrapper-con {
  margin-right: 30px;
  flex: 1;
  display: flex;
  justify-content: center;
  width: 400px;
  height: 650px;
  .content {
    height: 100%;
    width: 100%;
    .con_txt {
      height: 100%;
      .over_flowy {
        height: 75px;
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
          margin: 0 auto;
          width: 379px;
          height: 35px;
          background: #fff;
          font-size: 15px;
          color: #333;
          text-align: center;
          line-height: 35px;
        }
      }
      .scrollCon {
        overflow-y: scroll;
        overflow-x: hidden;
        height: calc(100vh - 160px);
        .scroll-box {
          flex: 1;
          width: 379px;
          margin: 0 auto;
          padding-top: 1px;
          .group {
            position: relative;
            cursor: move;
          }
        }
      }
      .footer {
        overflow-y: scroll;
        .page-foot {
          position: relative;
          width: 379px;
          height: 50px;
          margin: 0 auto 20px auto;
          cursor: move;
        }
      }
    }
  }

  .active_menu {
    color: var(--el-color-primary);
    background-color: #ccddff;
  }
}
</style>
