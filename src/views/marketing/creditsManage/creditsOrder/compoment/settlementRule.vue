<script setup lang="ts">
import { ref } from 'vue'

// 发货规则
const shippingList = ref([
  {
    id: 1,
    content:
      '1、用户支付成功后，商家需要按约定发货时效进行发货，如无特殊约定普通商品需要在48小时内发货，预售商品需要在预售承诺的周期内发货。'
  },
  {
    id: 2,
    content:
      '2、实际发货时间：以商家在后台订单管理页面成功上传真实有效物流单号及商品信息时平台记录的时间为准。'
  },
  {
    id: 3,
    content:
      '3、约定发货时效：以商家设置、展示的最短时效为准，如商品标题、商品详情页的展示信息。对于预售商品，约定的最长发货周期不得超过150天。'
  }
])
// 违规处理规则
const violationList = ref([
  {
    id: 1,
    content: '发货超时：指商家未在约定的发货时效内发货并未在平台内上传真实有效物流单号。'
  },
  {
    id: 2,
    content:
      '处理规则：一经发现，平台将下发警告通知，若连续三天未整改，将触发支付风险提示，直至暂停小程序交易。'
  },
  {
    id: 3,
    content:
      '揽件超时：在发货后（上传物流单号）的24小时内，该物流单号未在相应物流公司官网有第一条物流揽件信息。'
  },
  {
    id: 4,
    content:
      '处理规则：一经发现，平台将下发警告通知，若连续三天未整改，将触发支付风险提示，直至暂停小程序交易。'
  },
  {
    id: 5,
    content:
      '虚假发货：商家在发货过程中，上传的物流单号异常、对应物流信息存在明显异常或未真实发出应交付商品等行为。'
  },
  {
    id: 6,
    content:
      '处理规则：一经发现，平台将根据违规行为的严重程度，对该小程序采取包括但不限于下发警告通知、延迟自动收货结算周期、延迟确认收货后结算周期、暂停小程序交易等措施'
  }
])
// 结算规则
const settlementList = ref([
  {
    id: 1,
    content:
      '1、商家发货后，订单资金进入结算周期。在用户主动/系统自动确认收货后（在用户点击“确认收货”、或商家录入发货信息后达到系统自动确认收货的时间周期），进行资金结算。不同发货方式对应不同的结算周期，详见下表。'
  }
])
// table规则
const tableList = ref([
  {
    type: '快递物流',
    content: {
      one: '1、如用户主动确认收货，则资金将于收货后结算；',
      two: '2、如用户未主动确认收货，则资金将于订单发货后的第10天，系统自动确认收货后结算'
    }
  },
  {
    type: '自提/同城配送/虚拟发货',
    content: {
      one: '1、如用户主动确认收货，则资金将于收货后结算；',
      two: '2、如用户未主动确认收货，则资金将于订单发货后的第10天，系统自动确认收货后结算'
    }
  }
])
</script>

<template>
  <div class="main">
    <div class="shipping" style="margin-bottom: 8px">
      <div class="title">发货规则:</div>
      <ul v-for="item in shippingList" :key="item.id">
        <li>
          {{ item.content }}
        </li>
      </ul>
    </div>
    <div class="shipping" style="margin-bottom: 8px">
      <div class="title">违规处理情形:</div>
      <ul v-for="item in violationList" :key="item.id">
        <li>
          {{ item.content }}
        </li>
      </ul>
    </div>
    <div class="settlement">
      <div class="title">结算规则:</div>
      <ul v-for="item in settlementList" :key="item.id">
        <li>
          {{ item.content }}
        </li>
      </ul>
      <el-table
        :data="tableList"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="type" label="发货方式" width="200"></el-table-column>
        <el-table-column prop="content" label="结算周期">
          <template #default="{ row }">
            <div>{{ row.content.one }}</div>
            <div>{{ row.content.two }}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="update_time">更新时间：2023年12月1日</div>
    </div>
    <div class="tip">
      <div>提示：发货规则以微信官方发布为准，官方规则链接如下：</div>
      <div class="tip_link">
        https://developers.weixin.qq.com/miniprogram/product/jiaoyilei/yunyingguifan.html#_1-3-%E5%8F%91%E8%B4%A7%E8%A7%84%E8%8C%83
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding: 0 5px;
  .shipping,
  .settlement {
    .title {
      margin-bottom: 4px;
      font-size: 16px;
      font-weight: bold;
    }
    .update_time {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      font-size: 15px;
    }
  }
  .tip {
    width: 850px;
    .tip_link {
      word-break: break-all;
    }
  }
}
ul {
  list-style: none;
  li {
    font-size: 15px;
    line-height: 25px;
  }
}
</style>
