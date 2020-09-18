<template>
  <div class="footer-management">
        <el-card shadow="hover" class="header-management-header">
      <div slot="header" class="clearfix">
        <span>底部导航配置</span>
      </div>

      <div id="cascaderContainer">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="服务配置" name="first">
            <ServiceConfig/>
          </el-tab-pane>
          <el-tab-pane label="导航配置" name="second">
            <NavARecConfig/>
          </el-tab-pane>
          <el-tab-pane label="推荐配置" name="third">
            <NavARecConfig/>
          </el-tab-pane>
        </el-tabs>
      </div>
      
      
    </el-card>
    <!-- <ProductDialog ref="CategoryDialog" /> -->
    <!-- <ProductRemove ref="CategoryRemove" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ServiceConfig from './ServiceConfig'
import NavARecConfig from './NavARecConfig'

export default {
  name: 'CategoryManagement',
  components: { ServiceConfig, NavARecConfig },
  data() {
    return {
      currentPage: 1,
      activeName: "first",
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
      // this.$refs['CategoryDialog'].showDialog(actionType, rowData)
    },
    handleRemove(rowData) {
      this.$refs['CategoryRemove'].showDialog(rowData)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-management {
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
