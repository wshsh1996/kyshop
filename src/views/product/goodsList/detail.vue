<script setup lang="ts">
import useDetail from '@/hooks/detail'
import OssImage from '@/components/OssImage.vue'
import UploadVideo from '@/components/uploadVideo.vue'

const { detail, loading } = useDetail()
</script>

<template>
  <div v-loading="loading" v-if="detail">
    <!--  实物商品  -->
    <div v-if="detail.type === 1">
      <el-descriptions>
        <el-descriptions-item label="商品类型：">{{
          detail.type === 1 ? '实物商品' : detail.type === 2 ? '虚拟商品' : '次卡商品'
        }}</el-descriptions-item>
      </el-descriptions>
      <div class="header">
        <el-button class="fontSize" type="primary" link>基本信息</el-button>
      </div>
      <el-descriptions :column="2">
        <el-descriptions-item label-align="right" label="商品分类：">{{
          detail?.category.title
        }}</el-descriptions-item>
        <el-descriptions-item label="商品简拼：">{{ detail?.pinyin }}</el-descriptions-item>
        <el-descriptions-item label="商品名称：">{{ detail?.title }}</el-descriptions-item>
        <el-descriptions-item label="商品编码：">{{ detail?.no }}</el-descriptions-item>
        <el-descriptions-item label="警戒库存：">{{ detail?.warning_stock }}</el-descriptions-item>
        <el-descriptions-item label="配送方式：">
          <template #default>
            <span v-if="detail?.delivery_type">
              <span v-if="detail?.delivery_type?.express === 1">快递&nbsp;&nbsp;</span>
              <span v-if="detail?.delivery_type?.self_pickup === 1">自提&nbsp;&nbsp;</span>
              <span v-if="detail?.delivery_type?.store_delivery === 1">门店配送</span>
            </span>
            <span v-else>暂无</span>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label-align="right" label="状态：">
          <template #default>
            <span v-if="detail?.status === 1">上架</span>
            <span v-else>下架</span>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="是否参与分销：">
          <template #default>
            <span v-if="detail?.is_distribution">是</span>
            <span v-else>否</span>
          </template>
        </el-descriptions-item>
      </el-descriptions>
      <div class="header">
        <el-button class="fontSize" type="primary" link>商品图片/视频</el-button>
      </div>
      <div style="display: flex; align-items: center">
        <div style="display: flex; align-items: center; margin-right: 200px">
          <span>商品视频：</span>
          <upload-video
            action="#"
            v-model:model-value="detail.video"
            name="file"
            kind="detail"
          ></upload-video>
        </div>
        <div style="display: flex; align-items: center">
          <span>商品图：</span>
          <oss-image :paths="[detail?.images]"></oss-image>
        </div>
      </div>
      <el-table :data="detail?.skus" border>
        <el-table-column label="规格" prop="attrs">
          <template #default="{ row }">
            <div v-for="(value, key) in row.attrs" :key="key">
              <span> {{ key }} </span>:
              <span> {{ value }} </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品编码" prop="no" align="center"> </el-table-column>
        <el-table-column label="图片" prop="image" align="center">
          <template #default="{ row }">
            <oss-image :paths="[row.image]"></oss-image>
          </template>
        </el-table-column>
        <el-table-column label="成本价（元）" prop="cost_price" align="center"> </el-table-column>
        <el-table-column label="划线价（元）" prop="original_price" align="center">
        </el-table-column>
        <el-table-column label="零售价（元）" prop="price" align="center"> </el-table-column>
        <el-table-column label="实物库存" prop="stock" align="center"> </el-table-column>
        <el-table-column label="占用库存" prop="freeze_stock" align="center"> </el-table-column>
        <el-table-column label="可用库存" align="center">
          <template #default="{ row }">
            <span>{{ row.stock + row.freeze_stock }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty></el-empty>
        </template>
      </el-table>

      <div>
        <span style="width: 100px; height: 20px">商品详情：</span>
        <div style="margin: 10px 0 0 0" v-html="detail.content"></div>
      </div>
    </div>
    <!--  虚拟商品  -->
    <div v-if="detail.type === 2">
      <el-descriptions>
        <el-descriptions-item label="商品类型：">{{
          detail.type === 1 ? '实物商品' : detail.type === 2 ? '虚拟商品' : '次卡商品'
        }}</el-descriptions-item>
      </el-descriptions>
      <div class="header">
        <el-button class="fontSize" type="primary" link>基本信息</el-button>
      </div>
      <el-descriptions :column="2">
        <el-descriptions-item label-align="right" label="商品分类：">{{
          detail?.category.title
        }}</el-descriptions-item>
        <el-descriptions-item label="商品简拼：">{{ detail?.pinyin }}</el-descriptions-item>
        <el-descriptions-item label="商品名称：">{{ detail?.title }}</el-descriptions-item>
        <el-descriptions-item label="商品编码：">{{ detail?.no }}</el-descriptions-item>
        <el-descriptions-item label="警戒库存：">{{ detail?.warning_stock }}</el-descriptions-item>
        <el-descriptions-item label="配送方式：">
          <template #default>
            <span v-if="detail?.delivery_type">
              <span v-if="detail?.delivery_type?.express === 1">快递&nbsp;&nbsp;</span>
              <span v-if="detail?.delivery_type?.self_pickup === 1">自提&nbsp;&nbsp;</span>
              <span v-if="detail?.delivery_type?.store_delivery === 1">门店配送</span>
            </span>
            <span v-else>暂无</span>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label-align="right" label="状态：">
          <template #default>
            <span v-if="detail?.status === 1">上架</span>
            <span v-else>下架</span>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="是否参与分销：">
          <template #default>
            <span v-if="detail?.is_distribution">是</span>
            <span v-else>否</span>
          </template>
        </el-descriptions-item>
      </el-descriptions>
      <div class="header">
        <el-button class="fontSize" type="primary" link>商品图片/视频</el-button>
      </div>
      <div style="display: flex; align-items: center">
        <div style="display: flex; align-items: center; margin-right: 200px">
          <span>商品视频：</span>
          <upload-video
            action="#"
            v-model:model-value="detail.video"
            name="file"
            kind="detail"
          ></upload-video>
        </div>
        <div style="display: flex; align-items: center">
          <span>商品图：</span>
          <oss-image :paths="[detail?.images]"></oss-image>
        </div>
      </div>
      <el-table :data="detail?.skus" border>
        <el-table-column label="规格" prop="attrs">
          <template #default="{ row }">
            <div v-for="(value, key) in row.attrs" :key="key">
              <span> {{ key }} </span>:
              <span> {{ value }} </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品编码" prop="no" align="center"> </el-table-column>
        <el-table-column label="图片" prop="image" align="center">
          <template #default="{ row }">
            <oss-image :paths="[row.image]"></oss-image>
          </template>
        </el-table-column>
        <el-table-column label="成本价（元）" prop="cost_price" align="center"> </el-table-column>
        <el-table-column label="划线价（元）" prop="original_price" align="center">
        </el-table-column>
        <el-table-column label="零售价（元）" prop="price" align="center"> </el-table-column>
        <el-table-column label="实物库存" prop="stock" align="center"> </el-table-column>
        <el-table-column label="占用库存" prop="freeze_stock" align="center"> </el-table-column>
        <el-table-column label="可用库存" align="center">
          <template #default="{ row }">
            <span>{{ row.stock + row.freeze_stock }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty></el-empty>
        </template>
      </el-table>
      <div>
        <span style="width: 100px; height: 20px">商品详情：</span>
        <div style="margin: 10px 0 0 0" v-html="detail.content"></div>
      </div>
    </div>
    <!--  次卡商品  -->
    <div v-if="detail.type === 3">
      <el-descriptions>
        <el-descriptions-item label="商品类型：" width="100px">{{
          detail.type === 1 ? '实物商品' : detail.type === 2 ? '虚拟商品' : '次卡商品'
        }}</el-descriptions-item>
      </el-descriptions>
      <div class="header">
        <el-button class="fontSize" type="primary" link>基本信息</el-button>
      </div>
      <el-descriptions :column="2">
        <el-descriptions-item label="商品分类：">{{ detail?.category.title }}</el-descriptions-item>
        <el-descriptions-item label="商品简拼：">{{ detail?.pinyin }}</el-descriptions-item>
        <el-descriptions-item label="商品名称：">{{ detail?.title }}</el-descriptions-item>
        <el-descriptions-item label="商品编码：">{{ detail?.no }}</el-descriptions-item>
        <el-descriptions-item label="有效期：">{{
          detail?.skus[0]?.payload?.days
        }}</el-descriptions-item>
        <el-descriptions-item label-align="right" label="状态：">
          <template #default>
            <span v-if="detail?.status === 1">上架</span>
            <span v-else>下架</span>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="配送方式：">
          <template #default>
            <span v-if="detail?.delivery_type">
              <span v-if="detail?.delivery_type?.express === 1">快递&nbsp;&nbsp;</span>
              <span v-if="detail?.delivery_type?.self_pickup === 1">自提&nbsp;&nbsp;</span>
              <span v-if="detail?.delivery_type?.store_delivery === 1">门店配送</span>
            </span>
            <span v-else>暂无</span>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="警戒库存：">{{ detail?.warning_stock }}</el-descriptions-item>
        <el-descriptions-item label="服务内容：">
          <template #default>
            <div style="width: 900px">{{ detail?.description }}</div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="是否参与分销：">
          <template #default>
            <span v-if="detail?.is_distribution">是</span>
            <span v-else>否</span>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="次数：">{{
          detail?.skus[0]?.payload?.times === 0 ? '不限' : detail?.skus[0]?.payload?.times
        }}</el-descriptions-item>
      </el-descriptions>
      <div class="header">
        <el-button class="fontSize" type="primary" link>商品图片</el-button>
      </div>
      <div style="display: flex; align-items: center">
        <div style="display: flex; align-items: center">
          <span>商品图：</span>
          <oss-image :paths="[detail?.images]"></oss-image>
        </div>
      </div>
      <el-table :data="detail?.skus" border>
        <el-table-column label="规格" prop="attrs">
          <template #default="{ row }">
            <div v-for="(value, key) in row.attrs" :key="key">
              <span> {{ key }} </span>:
              <span> {{ value }} </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品编码" prop="no" align="center"> </el-table-column>
        <el-table-column label="图片" prop="image" align="center">
          <template #default>
            <oss-image :paths="[detail?.images]"></oss-image>
          </template>
        </el-table-column>
        <el-table-column label="成本价（元）" prop="cost_price" align="center"> </el-table-column>
        <el-table-column label="划线价（元）" prop="original_price" align="center">
        </el-table-column>
        <el-table-column label="零售价（元）" prop="price" align="center"> </el-table-column>
        <el-table-column label="实物库存" prop="stock" align="center"></el-table-column>
        <el-table-column label="占用库存" prop="freeze_stock" align="center"></el-table-column>
        <el-table-column label="可用库存" align="center">
          <template #default="{ row }">
            <span>{{ row.stock + row.freeze_stock }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty></el-empty>
        </template>
      </el-table>
      <div>
        <span style="width: 100px; height: 20px">商品详情：</span>
        <div style="margin: 10px 0 0 0" v-html="detail.content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fontSize {
  font-size: 16px;
}

.header {
  margin-bottom: 30px;
}
.el-descriptions {
  margin-bottom: 20px;
}
:deep(.el-table) {
  margin: 30px 0;
}
</style>
