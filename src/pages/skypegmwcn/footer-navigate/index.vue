<template>
  <div class="product-management">
    <div>
      <div class="product-management-header">
        <span>请选择：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" @click="handleClick('add')">新增产品</el-button>
      </div>
      <div class="product-management-body">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="图标"
            width="180"
          >
            <template>
              <el-image
                style="width: 50px; height: 50px"
                :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="weight"
            label="权重"
            width="180"
          />
          <el-table-column
            prop="categoryName"
            label="类别名称"
            width="180"
          />
          <el-table-column
            prop="categoryNameEn"
            label="类别名称（英文）"
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
      </div>
    </div>
    <ProductDialog ref="CategoryDialog" />
    <ProductRemove ref="CategoryRemove" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductDialog from './ProductDialog'
import ProductRemove from './ProductRemove'

export default {
  name: 'CategoryManagement',
  components: { ProductDialog, ProductRemove },
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          date: '2016-05-02',
          categoryName: '王小虎',
          categoryNameEn: 'wangxiaohu',
          weight: '100'
        }, {
          date: '2016-05-04',
          categoryName: '王小虎',
          categoryNameEn: 'wangxiaohu',
          weight: '100'
        }, {
          date: '2016-05-01',
          categoryName: '王小虎',
          categoryNameEn: 'wangxiaohu',
          weight: '100'
        }, {
          date: '2016-05-03',
          categoryName: '王小虎',
          categoryNameEn: 'wangxiaohu',
          weight: '100'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
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
