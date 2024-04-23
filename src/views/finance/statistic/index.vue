<script setup lang="ts">
import Echarts from '@/views/home/echart.vue'
import { ref } from 'vue'
import { CaretTop, CaretBottom, Warning } from '@element-plus/icons-vue'

// 创建今日订单金额
const orderPrice = ref<any>({
  title: '',
  grid: {
    left: 20,
    right: 30,
    top: 20,
    bottom: 10
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross' // 鼠标放置图标会有y轴线显示
    },
    formatter: function (params: any) {
      let iconOne = `<span style="display: inline-block;margin-right: 5px;width: 10px;height: 10px;border-radius: 50%;background-color: #0256ff;"></span>`
      let iconTwo = `<span style="display: inline-block;margin-right: 5px;width: 10px;height: 10px;border-radius: 50%;background-color: #14c9c9;"></span>`
      return `
      ${params[0].data.time}<br>
      ${iconOne}今天：${params[0].data.value}<br>
      ${iconTwo}昨天：${params[0].data.count}
      `
    }
  },
  // 图例
  legend: {
    left: 'left',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    data: ['今天', '昨天']
  },
  xAxis: {
    show: false,
    type: 'category',
    boundaryGap: false // x轴数据不在中间显示
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [
    {
      name: '今天',
      type: 'line', // 折线样式
      data: [4, 3, 5, 1, 2],
      smooth: true, // 平滑折线
      color: '#0256ff', // 线的颜色
      symbol: 'none', // 取消线上的指示点
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
      }
    },
    {
      name: '昨天',
      type: 'line',
      data: [3, 5, 1, 1, 2],
      smooth: true,
      color: '#14c9c9',
      symbol: 'none', // 取消线上的指示点
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
              color: '#e2f9f9' // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#fff' //   0% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      }
    }
  ]
})

// 创建今日订单数
const orderCount = ref<any>({
  title: '',
  grid: {
    left: 20,
    right: 30,
    top: 20,
    bottom: 10
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross' // 鼠标放置图标会有y轴线显示
    },
    formatter: function (params: any) {
      let iconOne = `<span style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background-color: #0256ff;"></span>`
      return `
      ${params[0].data.time}<br>
      ${iconOne}今天：${params[0].data.value}<br>
      `
    }
  },
  // 图例
  legend: {
    left: 'left',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    data: ['今天']
  },
  xAxis: {
    show: false,
    type: 'category',
    boundaryGap: false // x轴数据不在中间显示
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [
    {
      name: '今天',
      type: 'line', // 折线样式
      data: [1, 2, 4, 5, 3, 2],
      smooth: true, // 平滑折线
      color: '#0256ff', // 线的颜色
      symbol: 'none', // 取消线上的指示点
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
      }
    }
  ]
})

// 创建今日支付人数
const orderPay = ref<any>({
  title: '',
  grid: {
    left: 20,
    right: 30,
    top: 20,
    bottom: 10
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross' // 鼠标放置图标会有y轴线显示
    },
    formatter: function (params: any) {
      let iconOne = `<span style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background-color: #0256ff;"></span>`
      return `
      ${params[0].data.time}<br>
      ${iconOne}今天：${params[0].data.value}<br>
      `
    }
  },
  // 图例
  legend: {
    left: 'left',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    data: ['今天']
  },
  xAxis: {
    show: false,
    type: 'category',
    boundaryGap: false // x轴数据不在中间显示
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [
    {
      name: '今天',
      type: 'line', // 折线样式
      data: [1, 2, 4, 5, 3, 2],
      smooth: true, // 平滑折线
      color: '#0256ff', // 线的颜色
      symbol: 'none', // 取消线上的指示点
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
      }
    }
  ]
})

// 创建交易数据概览
const orderData = ref([
  { id: 1, name: '营业额', des: '商品支付金额，充值余额', price: '2151543.12', rate: '12%' },
  { id: 2, name: '营业额', des: '商品支付金额，充值余额', price: '2151543.12', rate: '12%' },
  { id: 3, name: '营业额', des: '商品支付金额，充值余额', price: '2151543.12', rate: '12%' },
  { id: 4, name: '营业额', des: '商品支付金额，充值余额', price: '2151543.12', rate: '12%' },
  { id: 5, name: '营业额', des: '商品支付金额，充值余额', price: '2151543.12', rate: '12%' },
  { id: 6, name: '营业额', des: '商品支付金额，充值余额', price: '2151543.12', rate: '12%' },
  { id: 7, name: '营业额', des: '商品支付金额，充值余额', price: '2151543.12', rate: '12%' },
  { id: 8, name: '营业额', des: '商品支付金额，充值余额', price: '2151543.12', rate: '12%' }
])
// 创建交易数据图表
const orderDataEcharts = ref<any>({
  title: '',
  grid: {
    show: false,
    top: 40, // 一下数值可为百分比也可为具体像素值
    right: 30,
    bottom: 50,
    left: 50
  },
  toolbox: {
    feature: {
      saveAsImage: {
        show: true
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross' // 鼠标放置图标会有y轴线显示
    },
    formatter: function (params: any) {
      let iconOne = `<span style="display: inline-block;margin-right: 5px;width: 10px;height: 10px;border-radius: 50%;background-color: #0256ff;"></span>`
      let iconTwo = `<span style="display: inline-block;margin-right: 5px;width: 10px;height: 10px;border-radius: 50%;background-color: #14c9c9;"></span>`
      let iconThree = `<span style="display: inline-block;margin-right: 5px;width: 10px;height: 10px;border-radius: 50%;background-color: #F53F3F;"></span>`
      let iconFour = `<span style="display: inline-block;margin-right: 5px;width: 10px;height: 10px;border-radius: 50%;background-color: #F7BA1E;"></span>`
      let iconFive = `<span style="display: inline-block;margin-right: 5px;width: 10px;height: 10px;border-radius: 50%;background-color: #8A1EF7;"></span>`
      return `
      ${params[0].data.time}<br>
      ${iconOne}营业额：${params[0].data.value}<br>
      ${iconTwo}交易毛利金额：${params[0].data.count}<br>
      ${iconThree}商品支付金额：${params[0].data.count}<br>
      ${iconFour}充值金额：${params[0].data.count}<br>
      ${iconFive}支付金额：${params[0].data.count}
      `
    }
  },
  legend: {
    left: 'center',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    data: ['营业额', '交易毛利金额', '商品支付金额', '充值金额', '支付金额']
  },
  xAxis: {
    data: ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05']
  },
  yAxis: {
    name: '单位: 元',
    nameTextStyle: {
      align: 'right'
    },
    // 刻度
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed' // 设置轴线为虚线
      }
    },
    type: 'value',
    boundaryGap: false,
    data: [0, 20, 40, 60, 80]
  },
  series: [
    {
      name: '营业额',
      type: 'line',
      smooth: true,
      symbol: 'none', // 取消线上的指示点
      color: '#0256ff',
      data: [10, 20, 30, 50, 80]
    },
    {
      name: '交易毛利金额',
      type: 'line',
      smooth: true,
      symbol: 'none', // 取消线上的指示点
      color: '#14c9c9',
      data: [10, 30, 20, 80, 50]
    },
    {
      name: '商品支付金额',
      type: 'line',
      smooth: true,
      symbol: 'none', // 取消线上的指示点
      color: '#F53F3F',
      data: [10, 10, 50, 50, 80]
    },
    {
      name: '充值金额',
      type: 'line',
      smooth: true,
      symbol: 'none', // 取消线上的指示点
      color: '#F7BA1E',
      data: [10, 50, 20, 50, 80]
    },
    {
      name: '支付金额',
      type: 'line',
      smooth: true,
      symbol: 'none', // 取消线上的指示点
      color: '#8A1EF7',
      data: [30, 20, 30, 30, 80]
    }
  ]
})
</script>

<template>
  <div class="home_container">
    <!-- one_row -->
    <div class="two_row">
      <!--   今日订单金额   -->
      <div class="cost_times" v-if="orderPrice">
        <div class="header">
          <div style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"></div>
          <h4 class="cost_times_name">今日订单金额</h4>
        </div>
        <div class="cost_times_echarts">
          <div class="price">￥3151543.12</div>
          <echarts :height="260" v-if="orderPrice" :order="orderPrice" />
        </div>
      </div>
      <!--   今日订单数   -->
      <div class="sale_rate" v-if="orderCount">
        <div class="header">
          <div style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"></div>
          <h4 class="sale_rate_name">今日订单数</h4>
        </div>
        <div class="sale_rate_echarts">
          <div class="top_static">
            <div class="order_box">
              <div class="order_des">今日订单数</div>
              <div class="order_num">26</div>
            </div>
            <div class="rate_box">
              <div class="rate_des">昨日：<span>32</span></div>
              <div class="rate_num">
                日环比：<span
                  >14%<el-icon><CaretTop /></el-icon
                ></span>
              </div>
            </div>
          </div>
          <echarts :height="120" v-if="orderCount" :order="orderCount" />
          <div class="bottom_static">
            <div class="order_box">
              <div class="order_des">本月订单数</div>
              <div class="order_num">126</div>
            </div>
            <div class="rate_box">
              <div class="rate_des">上月：<span>106</span></div>
              <div class="rate_num">
                月环比：<span
                  >-25%<el-icon><CaretBottom /></el-icon
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--   今日支付人数   -->
      <div class="sale_rate" v-if="orderPay">
        <div class="header">
          <div style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"></div>
          <h4 class="sale_rate_name">今日支付人数</h4>
        </div>
        <div class="sale_rate_echarts">
          <div class="top_static">
            <div class="order_box">
              <div class="order_des">今日支付人数</div>
              <div class="order_num">26</div>
            </div>
            <div class="rate_box">
              <div class="rate_des">昨日：<span>32</span></div>
              <div class="rate_num">
                日环比：<span
                  >14%<el-icon><CaretTop /></el-icon
                ></span>
              </div>
            </div>
          </div>
          <echarts :height="120" v-if="orderPay" :order="orderPay" />
          <div class="bottom_static">
            <div class="order_box">
              <div class="order_des">本月支付人数</div>
              <div class="order_num">126</div>
            </div>
            <div class="rate_box">
              <div class="rate_des">上月：<span>106</span></div>
              <div class="rate_num">
                月环比：<span
                  >-25%<el-icon><CaretBottom /></el-icon
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  two_row  -->
    <div class="four_row">
      <!-- 交易概况 -->
      <div class="sale_trend">
        <div class="sale_trend_header">
          <div class="header">
            <div
              style="margin-left: 10px; width: 5px; height: 14px; background-color: #2682f8"
            ></div>
            <h4 class="sale_trend_name">交易概况</h4>
          </div>
          <div class="sale_trend_date">
            <span>时间筛选：</span>
            <el-date-picker
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin-right: 10px"
            ></el-date-picker>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">导出</el-button>
          </div>
        </div>
        <div class="sale_trend_echarts">
          <div class="data_des">
            <div class="item_des" v-for="(item, index) in orderData" :key="index">
              <div class="item_info">
                <div class="info_name">
                  <span>{{ item.name }}</span>
                  <el-tooltip :content="item.des" placement="top-start" effect="light">
                    <el-icon><Warning /></el-icon>
                  </el-tooltip>
                </div>
                <div class="info_value">
                  <span>{{ item.price }}</span
                  >元
                </div>
                <div class="info_rate">
                  环比增长：<span
                    >{{ item.rate }}<el-icon><CaretTop /></el-icon
                  ></span>
                </div>
              </div>
              <div class="item_icon"></div>
            </div>
          </div>
          <echarts :height="500" v-if="orderDataEcharts" :order="orderDataEcharts" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.home_container {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
}

// 第二行
.two_row {
  margin-bottom: 15px;
  display: flex;
  //justify-content: space-between;
  .cost_times {
    margin-right: 25px;
    width: 691px;
    height: 360px;
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
      padding: 0 20px;
      width: 691px;
      height: 320px;
      border-radius: 5px;
      background-color: #fff;
      .price {
        padding: 20px 0;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
      }
    }
  }
  .sale_rate {
    margin-right: 25px;
    width: 476px;
    height: 360px;
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 20px;
      width: 476px;
      height: 320px;
      border-radius: 5px;
      background-color: #fff;
      .top_static,
      .bottom_static {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .order_box {
          .order_des {
            margin-bottom: 10px;
            font-size: 16px;
            color: #666666;
          }
          .order_num {
            font-size: 20px;
            color: #333333;
          }
        }
        .rate_box {
          .rate_des {
            margin-bottom: 10px;
            font-size: 14px;
            color: #999;
          }
          .rate_num {
            font-size: 14px;
            color: #999;
            span {
              color: red;
            }
          }
        }
      }
    }
  }
}

// 第san行
.four_row {
  width: 1690px;
  // 销售数据趋势
  .sale_trend {
    width: 1690px;
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
      .sale_trend_date {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .sale_trend_echarts {
      padding: 20px 20px;
      width: 100%;
      height: 800px;
      border-radius: 5px;
      background-color: #fff;
      .data_des {
        //margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        .item_des {
          margin: 0 12px 20px 0;
          display: flex;
          align-items: center;
          padding: 20px;
          width: 320px;
          height: 120px;
          .item_info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 169px;
            height: 78px;
            .info_name {
              display: flex;
              align-items: center;
              height: 25px;
              font-size: 14px;
              color: #666666;
              span {
                margin-right: 5px;
              }
            }
            .info_value {
              font-size: 12px;
              color: #999;
              span {
                margin-right: 5px;
                font-size: 20px;
                font-weight: bold;
                color: #333333;
              }
            }
            .info_rate {
              font-size: 14px;
              color: #999;
              span {
                color: red;
              }
            }
          }
          .item_icon {
            margin-left: 56px;
            width: 48px;
            height: 48px;
            background-color: #507bff;
          }
        }
        .item_des:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
:deep(.el-tabs) {
  display: flex;
  align-items: center;
}
</style>
