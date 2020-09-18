<template>
  <div class="product-management">
    <div>
      <el-card shadow="hover" class="product-management-header">
        <span>请选择：</span>
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" @click="handleClick('add')">新增产品</el-button>
      </el-card>
      <el-card shadow="hover" class="product-management-body">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="ID"
            label="ID"
            width="180"
          />
          <el-table-column
            prop="weight"
            label="权重"
            width="180"
          />
          <el-table-column
            prop="productName"
            label="产品名称"
            width="180"
          />
          <el-table-column
            prop="productNameEn"
            label="产品名称（英文）"
            width="180"
          />
          <el-table-column
            prop="categoryName"
            label="类别名称"
            width="180"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <a href="javascript:;" style="marginRight: 15px;" @click="handleClick('edit', scope.row)">编辑</a>
              <a href="javascript:;" @click="handleRemove(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            layout="prev, pager, next, sizes, jumper"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
    <!-- <ProductDialog ref="CategoryDialog" />
    <ProductRemove ref="CategoryRemove" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import ProductDialog from './ProductDialog'
// import ProductRemove from './ProductRemove'

export default {
  name: 'CategoryManagement',
  // components: { ProductDialog, ProductRemove },
  data() {
    return {
      value1: '',
      value2: '',
      currentPage: 1,
      tableData: [
        {
          ID: '123',
          weight: '100',
          productName: '王小虎',
          productNameEn: 'wangxiaohu',
          categoryName: '计算'
        }, {
          ID: '123',
          weight: '100',
          productName: '王小虎',
          productNameEn: 'wangxiaohu',
          categoryName: '计算'
        }, {
          ID: '123',
          weight: '100',
          productName: '王小虎',
          productNameEn: 'wangxiaohu',
          categoryName: '计算'
        }, {
          ID: '123',
          weight: '100',
          productName: '王小虎',
          productNameEn: 'wangxiaohu',
          categoryName: '计算'
        }
      ],
      options1: [
        {
          value: '1',
          label: '租户端'
        }, {
          value: '2',
          label: '运营端'
        }
      ],
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
    handleClick(actionType, rowData) {
      this.$refs['CategoryDialog'].showDialog(actionType, rowData)
    },
    handleRemove(rowData) {
      this.$refs['CategoryRemove'].showDialog(rowData)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-management {
  padding: 15px;
  &-header {
    margin-bottom: 30px;
    .el-select{
      margin-right: 20px;
    }
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
</style>
