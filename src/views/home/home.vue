<script setup lang="ts">
import Echarts from '@/views/home/echart.vue'
import { ApiAllData } from '@/api/home'
import { onMounted, ref } from 'vue'
import type { dataType, pieType, turnOverType } from '@/models/home'
import { ApiCategoryGood } from '@/api/product'
import InitDialog from '@/views/home/initDialog.vue'

// 获取商品分类
const categoryList = ref<any>([])
const getCategory = async () => {
  categoryList.value = await ApiCategoryGood()
}
// 创建数据概览数据
const data = ref<dataType>()
// 创建标签页
const dateNum = ref(1)
// 创建消费次数分析
const orderCustomCount = ref<turnOverType>({
  title: '',
  grid: {
    show: false,
    top: '16%', // 一下数值可为百分比也可为具体像素值
    right: '2%',
    bottom: '10%',
    left: '10%'
  },
  tooltip: {
    trigger: 'item',
    formatter: '人数 : {c}'
  },
  legend: [],
  xAxis: {
    type: 'category',
    data: ['未消费', '消费1次', '消费2次', '消费2-5次', '消费5次以上'],
    axisLabel: {
      interval: 0 // 显示所有轴标签
    }
  },
  yAxis: {
    name: '单位: 人',
    nameTextStyle: {
      align: 'right'
    }
  },
  series: [
    {
      type: 'bar',
      barWidth: '40%',
      data: []
    }
  ]
})

// 创建商品分类销售占比
const orderCategoryInfo = ref<pieType>({
  title: '',
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    bottom: '5%',
    data: []
  },
  series: [
    {
      type: 'pie',
      radius: [30, 80],
      center: ['50%', '40%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },

      data: []
    }
  ]
})
// 创建新增用户趋势
const orderAddUser = ref<turnOverType>({
  title: '',
  grid: {
    show: false,
    top: '16%', // 一下数值可为百分比也可为具体像素值
    right: '5%',
    bottom: '10%',
    left: '8%'
  },
  tooltip: {
    trigger: 'axis',
    formatter: '新增用户 : {c}'
  },
  legend: [],
  xAxis: {
    boundaryGap: false, // 坐标轴两端空白策略
    data: []
  },
  yAxis: {
    name: '单位: 人',
    nameTextStyle: {
      align: 'right'
    }
  },
  series: [
    {
      type: 'line',
      smooth: true,
      color: '#f18045',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#f3c9b3' // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#fff' //   0% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      data: []
    }
  ]
})
// 创销售数据趋势
const orderSalesData = ref<turnOverType>({
  title: '',
  grid: {
    show: false,
    top: '16%', // 一下数值可为百分比也可为具体像素值
    right: '2%',
    bottom: '10%',
    left: '8%'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params: any) {
      return `
      ${params[0].data.time}<br>
      订单金额：${params[0].data.value}<br>
      订单数量：${params[0].data.count}
      `
    }
  },
  legend: [],
  xAxis: {
    boundaryGap: false, // 坐标轴两端空白策略
    data: []
  },
  yAxis: {
    name: '单位: 元',
    nameTextStyle: {
      align: 'right'
    }
  },
  series: [
    {
      type: 'line',
      smooth: true,
      color: '#0256ff',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#89a6dc' // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#fff' //   0% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      data: []
    }
  ]
})
// 创建商品排行榜信息
const goodsRank = ref<any[]>([])

// 获取概况和营销数据
const getHomeData = async () => {
  const res: any = await ApiAllData()
  data.value = {
    order_amount: res.order_info.order_amount,
    order_count: res.order_info.order_count,
    after_sale_amount: res.order_info.after_sale_amount,
    after_sale_count: res.order_info.after_sale_count,
    today_user_count: res.user_info.today_user_count
  }
  // 消费次数分析
  for (let key in res.user_info.consume_count_line) {
    if (key === 'unpaid') {
      orderCustomCount.value.series[0].data.push({
        value: res.user_info.consume_count_line[key],
        itemStyle: { color: '#165eff' }
      })
    }
    if (key === 'paid_one') {
      orderCustomCount.value.series[0].data.push({
        value: res.user_info.consume_count_line[key],
        itemStyle: { color: '#ff7070' }
      })
    }
    if (key === 'paid_tow') {
      orderCustomCount.value.series[0].data.push({
        value: res.user_info.consume_count_line[key],
        itemStyle: { color: '#ff78ba' }
      })
    }
    if (key === 'paid_tow_five') {
      orderCustomCount.value.series[0].data.push({
        value: res.user_info.consume_count_line[key],
        itemStyle: { color: '#f7ba1d' }
      })
    }
    if (key === 'paid_more_five') {
      orderCustomCount.value.series[0].data.push({
        value: res.user_info.consume_count_line[key],
        itemStyle: { color: '#8cd16a' }
      })
    }
  }
  // 商品分类销售占比
  // 遍历分类id，获取分类名称
  for (let i = 0; i < res.consume_info.category_info.length; i++) {
    for (let j = 0; j < categoryList.value.length; j++) {
      if (
        res.consume_info.category_info[i].id === categoryList.value[j].id &&
        res.consume_info.category_info[i].sales_time !== '0'
      ) {
        orderCategoryInfo.value.series[0].data.push({
          value: res.consume_info.category_info[i].sales_time,
          name: categoryList.value[j].title
        })
        orderCategoryInfo.value.legend.data.push(categoryList.value[j].title)
      }
    }
  }

  // 新增用户趋势
  orderAddUser.value.xAxis.data = res.user_info.add_line.map((item: any) => {
    return item.date
  })
  orderAddUser.value.series[0].data = res.user_info.add_line.map((item: any) => {
    return item.count
  })

  // 销售数据趋势
  orderSalesData.value.xAxis.data = res.consume_info.order_day_line.map((item: any) => {
    return item.date
  })
  orderSalesData.value.series[0].data = res.consume_info.order_day_line.map((item: any) => {
    return { value: item.amount, count: item.count, time: item.date }
  })
  // 排行榜
  goodsRank.value = res.consume_info.goods_rank
}

// 切换标签页
const toggleDate = async (num: any, type: any) => {
  dateNum.value = num
  if (type === 'day') {
    const res: any = await ApiAllData()
    orderSalesData.value.xAxis.data = res.consume_info.order_day_line.map((item: any) => {
      return item.date
    })
    orderSalesData.value.series[0].data = res.consume_info.order_day_line.map((item: any) => {
      return { value: item.amount, count: item.count, time: item.date }
    })
  }
  if (type === 'year') {
    const res: any = await ApiAllData()
    orderSalesData.value.xAxis.data = res.consume_info.order_year_line.map((item: any) => {
      return item.date
    })
    orderSalesData.value.series[0].data = res.consume_info.order_year_line.map((item: any) => {
      return { value: item.amount, count: item.count, time: item.date }
    })
  }
}

onMounted(async () => {
  await getCategory()
  await getHomeData()
})
</script>

<template>
  <div class="home_container">
    <!-- 今日数据概览 -->
    <div class="today_overview" v-if="data">
      <div class="header">
        <div style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"></div>
        <h4 class="title">今日数据概览</h4>
      </div>
      <div class="overview_content">
        <div class="card_box">
          <div class="card_info">
            <p class="name">订单金额</p>
            <div class="info">{{ data.order_amount }}<span class="price">元</span></div>
          </div>
          <img src="@/assets/order_price.png" alt="" style="width: 48px; height: 48px" />
        </div>
        <div class="card_box">
          <div class="card_info">
            <p class="name">订单数</p>
            <div class="info">{{ data.order_count }}<span class="price">个</span></div>
          </div>
          <img src="@/assets/order_num.png" alt="" style="width: 48px; height: 48px" />
        </div>
        <div class="card_box">
          <div class="card_info">
            <p class="name">退款金额</p>
            <div class="info">{{ data.after_sale_amount }}<span class="price">元</span></div>
          </div>
          <img src="@/assets/refund_price.png" alt="" style="width: 48px; height: 48px" />
        </div>
        <div class="card_box">
          <div class="card_info">
            <p class="name">退款数</p>
            <div class="info">{{ data.after_sale_count }}<span class="price">个</span></div>
          </div>
          <img src="@/assets/refund_num.png" alt="" style="width: 48px; height: 48px" />
        </div>
        <div class="card_box">
          <div class="card_info">
            <p class="name">新增用户</p>
            <div class="info">{{ data.today_user_count }}<span class="price">个</span></div>
          </div>
          <img src="@/assets/add_user.png" alt="" style="width: 48px; height: 48px" />
        </div>
      </div>
    </div>
    <!-- two_row -->
    <div class="two_row">
      <div class="cost_times" v-if="orderCustomCount">
        <div class="header">
          <div style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"></div>
          <h4 class="cost_times_name">消费次数分析</h4>
        </div>
        <div class="cost_times_echarts">
          <echarts :height="280" v-if="orderCustomCount" :order="orderCustomCount" />
        </div>
      </div>
      <div class="sale_rate" v-if="orderCategoryInfo">
        <div class="header">
          <div style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"></div>
          <h4 class="sale_rate_name">商品分类销售占比</h4>
        </div>
        <div class="sale_rate_echarts">
          <echarts :height="280" v-if="orderCategoryInfo" :order="orderCategoryInfo" />
        </div>
      </div>
      <div class="add_user" v-if="orderAddUser">
        <div class="header">
          <div style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"></div>
          <h4 class="add_user_name">新增用户趋势</h4>
        </div>

        <div class="add_user_echarts">
          <echarts :height="280" v-if="orderAddUser" :order="orderAddUser" />
        </div>
      </div>
    </div>

    <!--  three_row  -->
    <div class="four_row">
      <!-- 销售数据趋势 -->
      <div class="sale_trend" v-if="orderSalesData">
        <div class="sale_trend_header">
          <div class="header">
            <div
              style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"
            ></div>
            <h4 class="sale_trend_name">销售数据趋势</h4>
          </div>
          <div class="sale_trend_date">
            <el-tabs>
              <el-button
                style="border-radius: 40px"
                @click="toggleDate(1, 'day')"
                :type="dateNum === 1 ? 'primary' : ''"
                >近30日</el-button
              >
              <el-button
                style="border-radius: 40px"
                @click="toggleDate(2, 'year')"
                :type="dateNum === 2 ? 'primary' : ''"
                >近1年</el-button
              >
            </el-tabs>
          </div>
        </div>
        <div class="sale_trend_echarts">
          <echarts :height="280" v-if="orderSalesData" :order="orderSalesData" />
        </div>
      </div>
      <div class="sale_rank" v-if="goodsRank">
        <div class="header">
          <div style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"></div>
          <h4 class="sale_rank_name">商品销售排行榜</h4>
        </div>
        <div class="sale_rank_echarts">
          <el-table
            :data="goodsRank"
            height="260"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ textAlign: 'center' }"
            show-overflow-tooltip
          >
            <el-table-column prop="title" label="商品名称">
              <template #default="{ row }">
                <el-text truncated>{{ row.title }}</el-text>
              </template>
            </el-table-column>
            <el-table-column prop="sales_amount" label="销售额（元）"></el-table-column>
            <el-table-column prop="sales" label="销量"></el-table-column>
            <template #empty>
              <el-empty></el-empty>
            </template>
          </el-table>
        </div>
      </div>
    </div>
  </div>
  <init-dialog></init-dialog>
</template>

<style lang="scss" scoped>
.home_container {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
}

// 今日概览
.today_overview {
  margin-bottom: 20px;
  .header {
    display: flex;
    align-items: center;
    .title {
      padding-left: 15px;
      font-size: 15px;
    }
  }

  .overview_content {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .card_box {
      padding: 28px 24px 28px 28px;
      display: flex;
      align-items: center;
      width: 317px;
      height: 123px;
      border-radius: 5px;
      background-color: #fff;
      .card_info {
        margin-right: 95px;
        width: 123px;
        height: 66px;
        .name {
          margin-bottom: 10px;
          width: 68px;
          height: 20px;
          font-size: 16px;
          color: #999999;
        }
        .info {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
          .price {
            font-size: 14px;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
  }
}

// 第二行
.two_row {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;

  .cost_times {
    width: 499px;

    .header {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      .cost_times_name {
        padding-left: 15px;
        font-size: 15px;
      }
    }

    .cost_times_echarts {
      width: 100%;
      height: 280px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
  .sale_rate {
    width: 476px;
    .header {
      margin-bottom: 15px;
      display: flex;
      align-items: center;

      .sale_rate_name {
        padding-left: 15px;
        font-size: 15px;
      }
    }
    .sale_rate_echarts {
      width: 100%;
      height: 280px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
  .add_user {
    width: 665px;
    .header {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      .add_user_name {
        padding-left: 15px;
        font-size: 15px;
      }
    }

    .add_user_echarts {
      width: 100%;
      height: 280px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
}

// 第san行
.four_row {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  // 销售数据趋势
  .sale_trend {
    width: 59.5%;
    .sale_trend_header {
      padding-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      .header {
        display: flex;
        align-items: center;
        .sale_trend_name {
          padding-left: 15px;
        }
      }
    }
    .sale_trend_echarts {
      width: 100%;
      height: 280px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
  .sale_rank {
    width: 39.3%;
    .header {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      height: 32px;
      .sale_rank_name {
        padding-left: 15px;
        font-size: 15px;
      }
    }

    .sale_rank_echarts {
      width: 100%;
      height: 280px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
}
:deep(.el-tabs) {
  display: flex;
  align-items: center;
}
</style>
