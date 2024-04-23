<template>
  <div>
    <el-dialog v-model="dialogVisible" width="900" :append-to-body="true" title="上传商品图">
      <div class="bottom_image">
        <div class="left_tree" v-if="state.dataList" v-loading="state.listLoading">
          <el-tree
            class="tree"
            :data="state.dataList"
            :props="defaultProps"
            node-key="id"
            :current-node-key="1"
            :highlight-current="true"
            @node-click="getCurrentFile"
          >
            <template #default="{ data }">
              <img src="../../assets/tree.png" alt="" />
              <span class="label">{{ data.title }} </span>
              <el-dropdown class="dot">
                <span>...</span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="showForm">新增分类</el-dropdown-item>
                    <el-dropdown-item @click="showForm(data)">编辑分类</el-dropdown-item>
                    <el-dropdown-item @click="deleteHandle(data.id)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-tree>
        </div>
        <div class="right_image">
          <el-space>
            <el-button type="primary" @click="confirmUseFile" :disabled="selectList.length === 0">
              使用选中图片
              <div class="num_icon" v-if="selectList.length > 0">
                ({{ selectList.length }} / {{ fileMax }})
              </div>
            </el-button>
            <el-button type="primary" @click="showUpdateImage">上传图片</el-button>
            <el-cascader
              v-model="data.category_id"
              :options="state.dataList"
              placeholder="图片移动至"
              clearable
              :props="caderProp"
              style="width: 140px"
              @change="moveImage"
            ></el-cascader>
          </el-space>
          <div class="right_image_main">
            <div class="area_list" v-for="item in fileList" :key="item.id">
              <div
                class="image"
                :class="{ on: selectList.find((it: any) => it.id === item.id) }"
                @click="selectTag(item)"
              >
                <oss-image
                  :paths="[item.path]"
                  :width="100"
                  :height="100"
                  v-model:showPreView="showPreView"
                ></oss-image>
              </div>
              <el-input v-if="showInput === item.id" v-model="FileName"></el-input>
              <div v-else class="image_name">{{ item.name }}</div>

              <div class="img_function" v-if="showInput === item.id">
                <el-button type="primary" link @click="cancelEdit">取消</el-button>
                <el-button type="primary" link @click="editName(item.id)">确定</el-button>
              </div>
              <div class="img_function" v-else>
                <el-button type="primary" link @click="deleteImage(item.id)">删除</el-button>
                <el-button type="primary" link @click="resetName(item)">改名</el-button>
                <el-button type="primary" link @click="preViewImage()">查看</el-button>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            :current-page="page"
            :page-size="pageSize"
            :default-page-size="pageSize"
            :total="total"
            layout="total, prev, pager, next"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
          />
        </div>
      </div>
    </el-dialog>
    <!--  上传图片弹窗  -->
    <div v-loading="uploadLoading.status">
      <el-dialog v-model="updateDialogVisible" width="900" :append-to-body="true" title="上传图片">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="上传至分组：">
            <el-cascader
              v-model="id"
              :options="state.dataList"
              placeholder="图片移动至"
              clearable
              :props="caderProp"
              style="width: 200px"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="上传图片：">
            <div>
              <el-upload
                ref="uploadRef"
                :class="{ disabled }"
                :action="`/api/admin/materials?category_id=${id}`"
                :limit="1"
                :auto-upload="false"
                list-type="picture-card"
                :headers="uploadHeader"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUpload"
              >
                <!--              :before-upload="beforeUpload"-->
                <el-icon><Picture /></el-icon>
              </el-upload>
              <!--            <span>-->
              <!--              建议上传图片最大宽度750px,不超过3MB，仅支持jpeg、png格式，可拖拽调整上传顺序-->
              <!--            </span>-->
            </div>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="updateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitImage">确定</el-button>
        </template>
      </el-dialog>
    </div>

    <el-dialog v-model="previewVisible">
      <img class="preview" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <!-- 文件夹弹窗 增删改 -->
    <form-modal
      v-if="state.formVisible === true"
      v-model:visible="state.formVisible"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="submitForm"
      type="dialog"
      width="400"
      title="添加标签"
      cancelBtnName="取消"
      okBtnName="确定"
    >
      <update-or-create></update-or-create>
    </form-modal>
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { ApiFileDelete, ApiFileList, ApiFileUpdate, ApiMoveImage } from '@/api/file'
import type { IFileList } from '@/models/file'
import useLoading from '@/hooks/loading'
import type { UploadFile, UploadRawFile } from 'element-plus'
import usePropData from '@/hooks/propData'
import OssImage from '@/components/OssImage.vue'
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import UpdateOrCreate from './component/update-or-create.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userStore } from '@/stores'
import { Picture } from '@element-plus/icons-vue'

const fileList = ref<IFileList[]>([]) // 获取图片列表
const page = ref(1)
const pageSize = ref(18)
const total = ref(0)
const dialogVisible = ref(false) // 最初始弹窗
const tableLoading = useLoading()
const uploadLoading = useLoading()
const uploadHeader = {
  Authorization: 'Bearer ' + userStore.getToken()
}

const { state, showForm, submitForm, deleteHandle, query } = useCurd({
  url: '/admin/material-categories',
  openPage: false,
  autoInit: false
})

watch(
  () => dialogVisible.value,
  (val: any) => {
    if (val) {
      nextTick(query)
    }
  },
  {
    immediate: true
  }
)

const emits = defineEmits(['confirm'])
const props = withDefaults(
  defineProps<{
    max?: number
    type?: string
    kind?: string
  }>(),
  {
    max: 1,
    type: 'image',
    kind: 'avatar'
  }
)

const fileMax = usePropData(() => props.max, 0)

// 树状图对应的属性值
const defaultProps = {
  children: 'children',
  label: 'title'
}

// 级联面板选择任意一级选项
const caderProp = {
  checkStrictly: true,
  value: 'id',
  label: 'title',
  emitPath: false
}

// 图片预览
const showPreView = ref(false)
const preViewImage = () => {
  showPreView.value = true
}

// 上传图片弹窗
const updateDialogVisible = ref(false)

const showUpdateImage = () => {
  updateDialogVisible.value = true
}
// 点击对应文件夹获取图片信息
const currentPath = ref(1) // 创建当前路径
const getCurrentFile = (data: any) => {
  currentPath.value = data.id
  getFileList(data.id)
}

const getFileList = (id?: any) => {
  tableLoading.start()
  if (id) {
    ApiFileList(page.value, pageSize.value, `type=${props.type}&category_id=${id}`)
      .then((res) => {
        fileList.value = res.data
        total.value = res.meta.total
      })
      .finally(() => {
        tableLoading.end()
      })
  }
}

const sizeChangeHandle = (val: number) => {
  page.value = 1
  pageSize.value = val
  getFileList(currentPath.value)
}

const currentChangeHandle = (val: number) => {
  page.value = val
  getFileList(currentPath.value)
}

// 图片上传
const id = ref()
const uploadRef = ref()
const disabled = ref(false)
// 上传之前的限制
const beforeUpload = (rawFile: UploadRawFile) => {
  uploadLoading.start()
  if (props.kind === 'list') {
    const isLt2M = rawFile.size < 1024 * 1024 * 5
    const isValidFormat = ['image/jpg', 'image/jpeg', 'image/png'].indexOf(rawFile.type) > -1
    if (!isLt2M) {
      ElMessage.warning('图片大小不超过5M')
      uploadLoading.end()
      return false
    }
    //图片类型
    if (!isValidFormat) {
      ElMessage.warning('图片只能是 JPG、PNG 格式!')
      uploadLoading.end()
      return false
    }
  }
}

const submitImage = async () => {
  uploadLoading.start()
  await uploadRef.value.submit()
  ElMessage.success('上传成功')
  id.value = null
  uploadRef.value.clearFiles()
  updateDialogVisible.value = false
  getFileList(currentPath.value)
  uploadLoading.end()
}

// 预览
const dialogImageUrl = ref()
const previewVisible = ref(false)
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  previewVisible.value = true
}

// 展示input框
const FileName = ref()
const showInput = ref()
const resetName = (row: IFileList) => {
  showInput.value = row.id
  FileName.value = row.name
}
// 重命名
const editName = async (id: number) => {
  if (!FileName.value) {
    ElMessage.error('请输入文件名')
    return
  }
  await ApiFileUpdate(id, { name: FileName.value })
  ElMessage.success('修改成功')
  showInput.value = null
  getFileList(currentPath.value)
}

// 取消修改图片名称
const cancelEdit = () => {
  showInput.value = null
}
// 删除图片
const deleteImage = (id: number) => {
  ElMessageBox.confirm('确定删除? 不可恢复！', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ApiFileDelete(id).then(() => {
      ElMessage.success('删除成功')
      getFileList()
      // 删除选中项
      selectList.value = selectList.value.filter((item: any) => item.id !== id)
    })
  })
}

// 图片多选
const selectList = ref<any[]>([])

const selectTag = (curItem: any) => {
  const current = selectList.value.find((item: any) => item.id === curItem.id)
  if (current) {
    selectList.value = selectList.value.filter((item: any) => item.id !== curItem.id)
  } else {
    if (selectList.value.length >= fileMax.value) {
      ElMessage.warning('最多只能选择' + fileMax.value + '张图片')
    } else {
      selectList.value.push(curItem)
    }
  }
}

// 批量移动
const data = ref<any>({
  ids: [],
  category_id: null
})
const moveImage = async () => {
  data.value.ids = selectList.value.map((item: any) => item.id)
  await ApiMoveImage(data.value)
  ElMessage.success('移动完成')
  selectList.value = []
  getFileList(currentPath.value)
}

/// 确定使用选中的素材
const confirmUseFile = () => {
  // 获取所有的路径
  emits(
    'confirm',
    selectList.value.map((item: any) => item.path)
  )
  dialogVisible.value = false
  nextTick(() => {
    selectList.value = []
  })
}

// 打开弹窗
const openDialog = () => {
  selectList.value = []
  dialogVisible.value = true
  getFileList(currentPath.value)
}

defineExpose({
  openDialog
})
</script>

<style lang="scss" scoped>
.bottom_image {
  display: flex;
  height: 550px;
}
.left_tree {
  padding-right: 15px;
  border-right: 1px solid #eee;
  width: 165px;
  height: 100%;

  .tree {
    position: relative;
    width: 100%;
    img {
      margin-right: 8px;
      width: 10px;
      height: 10px;
    }
    .label {
      margin-right: 20px;
    }
    .dot {
      position: absolute;
      right: 15px;
      font-weight: bold;
    }
  }
}
:deep(.el-tree-node__content) {
  padding: 5px 0;
}
:deep(.el-space__item) {
  margin-right: 20px !important;
}
.right_image {
  padding: 0 0 0 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .right_image_main {
    margin-bottom: 10px;
    padding-top: 20px;
    flex: 1;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    height: 450px;
    .area_list {
      margin: 10px 5px;
      position: relative;
      width: 100px;
      overflow: hidden;
      //height: 130px;
      text-align: center;
      .image {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-color: #f8f8f8;
      }
      :deep(.el-input) {
        margin-top: 5px;
      }
      .image_name {
        margin-top: 5px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .img_function {
        margin-top: 5px;
        display: flex;
        justify-content: space-around;
        opacity: 0;
        :deep(.el-button) {
          margin: 0;
          padding: 0;
          border: 0;
          display: inline;
          font-size: 12px;
        }
      }
      .img_function:hover {
        opacity: 1;
      }
    }
  }
  .area_list :nth-child(6n) {
    margin-right: 0;
  }
}
// 高亮
:deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
  background-color: rgba(135, 206, 235, 0.2);
  color: #409eff;
}
.category_padding {
  padding: 5px 0;
}

.on {
  border: 2px solid var(--el-color-primary);
}

// 上传样式
// 框架尺寸
:deep(.el-upload) {
  width: 60px;
  height: 60px;
  border-radius: 0;
  background-color: #ffffff;
}
// 框架的icon大小
:deep(.el-upload--picture-card .el-icon) {
  width: 20px;
  height: 20px;
  color: #cccccc;
}
// 添加图片后框架大小
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 60px;
  height: 60px;
  border-radius: 0;
}

// 限制一张隐藏框架
.disabled :deep(.el-upload--picture-card) {
  display: none;
}
// 预览/删除的大小
:deep(.el-upload-list__item-actions) {
  font-size: 14px;
}
.preview {
  width: 100%;
  height: 100%;
}
</style>
