<template>
  <div class="product-review">
    <div>
      <el-card shadow="hover" class="product-review-header">
        <el-row :gutter="10">
          <el-col :span="2"><span>审核状态：</span></el-col>
          <el-col :span="4">
            <el-select v-model="searchForm.auditStatus" placeholder="请选择" size="mini">
              <el-option
                v-for="(label, value) in auditStatusConfig"
                :key="value"
                :label="label"
                :value="value"
              />
            </el-select>
          </el-col>
          <el-col :span="2"><span>提审类型：</span></el-col>
          <el-col :span="4">
            <el-select v-model="searchForm.auditType" placeholder="请选择" size="mini">
              <el-option
                v-for="(label, value) in auditTypeConfig"
                :key="value"
                :label="label"
                :value="value"
              />
            </el-select>
          </el-col>
          <el-col :span="2"><span>模块标题：</span></el-col>
          <el-col :span="4">
            <el-select v-model="searchForm.module" placeholder="请选择" size="mini">
              <el-option
                v-for="(label, value) in modulesConfig"
                :key="value"
                :label="label"
                :value="value"
              />
            </el-select>
          </el-col>
          <el-col :span="5" style="textAlign: center">
            <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
            <el-button size="mini" @click="handleInitSearch">重置</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="2"><span>提审人：</span></el-col>
          <el-col :span="4">
            <el-input v-model="input" placeholder="请输入提审人" size="mini"></el-input>
          </el-col>
          <el-col :span="2"><span>日期：</span></el-col>
          <el-col :span="10">
            <el-date-picker
              v-model="searchForm.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              size="mini"
              :editable="false"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <!-- <el-col :span="2"><span>标题：</span></el-col> -->
          <!-- <el-col :span="5">
            <el-input v-model="input" placeholder="请输入标题" size="mini"></el-input>
          </el-col> -->
        </el-row>
      </el-card>
      <el-card shadow="hover" class="product-review-body">
        <el-button type="primary" size="mini" @click="handleApprove" style="marginBottom: 20px" :disabled="!tableSelection.length">通过</el-button>
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            fixed
            :selectable="checkStatus"
          />
          <el-table-column
            prop="ID"
            label="ID"
            width="180"
          />
          <el-table-column
            prop="pageTitle"
            label="页面标题"
            width="180"
          />
          <el-table-column
            prop="moduleTitle"
            label="模块标题"
            width="180"
          />
          <el-table-column
            label="查看修改详情"
          >
            <template slot-scope="scope">
              <a href="javascript:;" @click="checkoutModifyDetail(scope.row)">查看详情</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="auditStatus"
            label="提审类型"
            width="200"
          >
            <template slot-scope="scope">
              <span>{{ auditTypeConfig[scope.row.auditType] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="submitAuditUser"
            label="提审人"
            width="180"
          />
          <el-table-column
            prop="submitAuditTime"
            label="提交时间"
            width="180"
          />
          <el-table-column
            prop="auditStatus"
            label="审核状态"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ auditStatusConfig[scope.row.auditStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            fixed="right"
          >
            <template slot-scope="scope">
              <a href="javascript:;" style="marginRight: 10px">预览</a>
              <a href="javascript:;" @click="handleReject(scope.row)" v-if="scope.row.auditStatus === 'toAudit'">驳回</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            layout="prev, pager, next, sizes, jumper"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
            :page-size="10"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
    <RejectDialog ref="RejectDialog" />
    <ApproveDialog ref="ApproveDialog" />
    <ModifiDetailDialog ref="ModifiDetailDialog" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RejectDialog from './RejectDialog'
import ApproveDialog from './ApproveDialog'
import ModifiDetailDialog from './ModifiDetailDialog'

export default {
  name: 'DocumentReview',
  components: { RejectDialog, ApproveDialog, ModifiDetailDialog },
  data() {
    return {
      value1: '',
      value2: '',
      input: '',
      currentPage: 1,
      currentPageSize: 10,
      searchForm: {
        auditType: '',
        auditStatus: '',
        module: '',
        submitAuditTime: '',
        title: '',
        submitAuditUser: ''
      },
      tableData: [
        {
          ID: '123',
          title: '计算',
          submitAuditUser: '王小虎',
          submitAuditTime: '2020-01-04',
          auditStatus: 'toAudit'
        }, 
        {
          ID: '123',
          title: '计算',
          submitAuditUser: '王小虎',
          submitAuditTime: '2020-01-04',
          auditStatus: 'toAudit'
        }, 
        {
          ID: '123',
          title: '计算',
          submitAuditUser: '王小虎',
          submitAuditTime: '2020-01-04',
          auditStatus: 'toAudit'
        },
        {
          ID: '123',
          title: '计算',
          submitAuditUser: '王小虎',
          submitAuditTime: '2020-01-04',
          // auditStatus: 'toAudit'
        }
      ],
      tableSelection: [],
      auditStatusConfig: {
        all: '全部',
        toAudit: '待审核',
        approve: '已通过',
        reject: '已驳回'
      },
      auditTypeConfig: {
        all: '全部',
        toOffLine: '提交下线',
        toAudit: '提交审核',
      },
      modulesConfig: {
        all: '全部',
        homePageNav: '官网导航管理',
        homePageFooterNav: '官网底部导航管理',
        homePageContent: '官网首页内容管理',
        customization: '定制化页面管理',
        staticPage: '静态页面管理'
      },
      //  [
      //   {
      //     value: '1',
      //     label: '待审核'
      //   },
      //   {
      //     value: '2',
      //     label: '已通过'
      //   },
      //   {
      //     value: '3',
      //     label: '已驳回'
      //   }
      // ],
      options2: [
        {
          value: '1',
          label: '计算'
        }, {
          value: '2',
          label: '存储'
        }, {
          value: '3',
          label: '网络'
        }, {
          value: '4',
          label: '安全'
        }, {
          value: '5',
          label: '数据库'
        }
      ],
      value: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSearch() {
      console.log('search')
    },
    handleInitSearch() {
      this.searchForm = {
        auditStatus: '',
        time: '',
        title: '',
        submitAuditUser: ''
      }
      this.currentPage = 1
      this.currentPageSize = 10
      this.handleSearch()
    },
    handleReject(rowData) {
      this.$refs['RejectDialog'].showDialog(rowData)
    },
    handleApprove() {
      this.$refs['ApproveDialog'].showDialog(this.tableSelection)
    },
    checkoutModifyDetail(rowData) {
      this.$refs['ModifiDetailDialog'].showDialog(rowData)
    },
    handleSelectionChange(tableSelection) {
      this.tableSelection = tableSelection
    },
    handleSizeChange(currentPageSize) {
      this.currentPageSize = currentPageSize
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    checkStatus(row, index) {
      // console.log(row, index)
      return row.auditStatus === 'toAudit'
    },
  }
}
</script>

<style lang="less" scoped>
.product-review {
  padding: 15px;
  &-header {
    margin-bottom: 30px;
  }
  &-body {
    a{
      color: #66b1ff;
    }
    .pagination-container{
    text-align: right;
    margin: 20px 0;
  }
  }
}
/deep/ .el-card__body{
  .el-row{
    line-height: 28px;
    margin-bottom: 20px;
  }
  .el-input__inner,.el-select{
    width: 100%;
    min-width: unset;
  }
}
</style>
<style lang="css">
input{
  min-width: unset;
}
</style>
