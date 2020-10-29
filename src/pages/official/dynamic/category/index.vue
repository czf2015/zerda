<template>
  <div class="header-management">
    <el-card shadow="hover" class="header-management-header">
      <div slot="header" class="clearfix">
        <span>头部导航配置</span>
      </div>

      <div id="cascaderContainer">
        <div class="cascader-header">
          <el-button size="mini" @click="handleAdd('CategoryDialog')">新增分类</el-button>
          <el-button size="mini" @click="handleAdd('PageDialog')">新增页面</el-button>
        </div>

        <el-cascader-panel :options="options" width="250px" size="small" @expand-change="handleExpandChange">
          <el-popover
            slot-scope="{ node, data }"
            :value="visible === node.label"
            placement="bottom"
            trigger="manual"
            :visible-arrow="false"
            width="100px"
          >
            <ul class="menu-container">
              <li @click="handleEdit(data)">
                <!-- <i class="el-icon-document-add" /> -->
                <a href="javascript:;">编辑</a>
              </li>
              <li @click="handleStatus('off', data)" v-if="data.type === 'leaf' && data.status === 'on'">
                <!-- <i class="el-icon-delete" /> -->
                <a href="javascript:;">下线</a>
              </li>
              <li @click="handleStatus(data)" v-if="data.type === 'leaf' && data.status === 'on'">
                <!-- <i class="el-icon-delete" /> -->
                <a href="javascript:;">重定向</a>
              </li>
              <li @click="handleStatus('on', data)"  v-if="data.type === 'leaf' && data.status === 'off'">
                <!-- <i class="el-icon-delete" /> -->
                <a href="javascript:;">上线</a>
              </li>
              <li @click="handleStatus('remove', data)">
                <!-- <i class="el-icon-delete" /> -->
                <a href="javascript:;">删除</a>
              </li>
            </ul>

            <p slot="reference" @mousedown="showMenu($event, node, data)" style="display: block">
              {{node.label}}
              <span :class="data.status === 'on' ? 'online-status' : 'offline-status'" v-if="data.type === 'leaf'"/>
            </p>
          </el-popover>
        </el-cascader-panel>
      </div>
      
      
    </el-card>

    <CategoryDialog ref="CategoryDialog" :handleTableData="handleCategory" :actionType="actionType" />    
    <PageDialog ref="PageDialog" :categoryList="options" :handleTableData="handlePage" :actionType="actionType" />

    <RemoveDialog ref="RemoveDialog" :propData="propData"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryDialog from './CategoryDialog'
import PageDialog from './PageDialog'
import RemoveDialog from './RemoveDialog'
import { DynamicCategory, DynamicPage } from '@/services'

export default {
  name: 'StaticPageContentCategory',
  components: { CategoryDialog, PageDialog, RemoveDialog },
  data() {
    return {
      visible: '',
      actionType: 'add',
      expandArr: [],
      options: [{
          value: 'zhinan',
          label: '指南',
          type: 'node',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'daohang',
            label: '导航',
            type: 'leaf',
            status: 'off'
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'form',
            label: 'Form',
            type: 'leaf',
            status: 'off'
          }, {
            value: 'data',
            label: 'Data',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'notice',
            label: 'Notice',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'navigation',
            label: 'Navigation',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'others',
            label: 'Others',
            type: 'leaf',
            status: 'on'
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components',
            type: 'leaf',
            status: 'on'
          }, {
            value: 'sketch',
            label: 'Sketch Templates',
            type: 'leaf',
            status: 'off'
          }, {
            value: 'jiaohu',
            label: '组件交互文档',
            type: 'leaf',
            status: 'on'
          }]
        }],    
      propData: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
  },
  mounted() {
    document.getElementById('cascaderContainer').oncontextmenu = function(e) {
      return false
    }
    document.onclick = () => {
      this.visible = ''
    }
    this.fetchData()
  },
  beforeDestroy() {
    document.onclick = null
  },
  methods: {
    handleExpandChange(expandArr) {
      this.expandArr = expandArr
      console.log(expandArr)
    },
    handleAdd(dialog) {
      this.actionType = 'add'
      this.$refs[dialog].showDialog(this.actionType)
    },
    handleEdit(data) {
      this.actionType = 'edit'
      const activeDialog = data.type === 'leaf' ? 'PageDialog' : 'CategoryDialog'
      this.$refs[activeDialog].showDialog(this.actionType, data)
      this.visible = ''
    },
    handleStatus(actionType, data) {
      switch(actionType) {
        case 'on':
          this.propData = {
            title: '是否确认上线',
            content: '上线前请确认产品概览页及子页均已发布，确认上线？'
          }
          break;
        case 'off':
          this.propData = {
            title: '是否确认变更状态',
            content: '下线后外网访问为404或访问老版介绍页，若外网已经入口，建议【重定向】处理，是否确认【下线】？'
          }
          break;
        case 'remove':
          this.propData = {
            title: '删除',
            content: data.type === 'leaf' ? '是否删除此页面？' : '是否删除此分类？'
          }
          break;
        default:
          break
      }
      this.$refs['RemoveDialog'].showDialog(data)
      this.visible = ''
    },
    showMenu(e, node, data) {
      console.log(e, node, data)
      if (e.which === 1) {
        this.visible = ''
        if(data.type === 'leaf') {
          this.goTo(data)
        }
        return
      }
      this.visible = node.label
    },
    goTo(data) {
      this.$router.push({ name: 'dynamic', params: { pageId:  data.id || 0}});
    },
    fetchData() {
      DynamicCategory.query().then(res => {
        // 
      })
    },
    handleCategory(/* actionType,  */formData) {
      console.log("pages/official/dynamic/category/index.vue::handleCategory:")
      console.log(formData)
      // return new Promise((resolve, reject) => resolve())
      switch (this.actionType) {
        case 'add':
          return DynamicCategory.add({
              "title": formData.categoryName,
              "keywords": formData.categoryMark,
              categoryType: 4
          })
          default:
            break
      }
    },
    handlePage(/* actionType,  */formData) {
      console.log("pages/official/dynamic/page/index.vue::handlePage:")
      console.log(formData)
      // return new Promise((resolve, reject) => resolve())
      switch (this.actionType) {
        case 'add':
          return DynamicPage.add({
              "title": formData.productName,
              "keywords": formData.productMark,
              pid: formData.category,
              categoryType: 4
          })
          default:
            break
      }
    },
  }
}
</script>

<style lang="less" scoped>
.header-management {
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
  }
  .pagination-container{
    text-align: right;
    margin: 20px 0;
  }
  .cascader-header{
    margin-bottom: 20px;
  }
}

/deep/ .el-cascader-panel {
  min-height: 400px;
  border: none;
  .el-scrollbar__wrap{
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  }
  .el-cascader-node__prefix{
    display: none;
  }
}

.menu-container{
  padding: 0;
  margin: 0;
  list-style: none;
  >li{
    padding: 0;
    margin: 10px 0;
    list-style: none;
    cursor: pointer;
    i{
      margin-right: 10px;
    }
  }
}
.el-popover{
  min-width: 100px;
}
.offline-status, .online-status {
  position: absolute;
    width: 8px;
    height: 8px;
    top: 0;
    bottom: 0;
    left: 10px;
    margin: auto;
    
    border-radius: 8px;
}
.offline-status{
  background-color: #909399;
}
.online-status{
  background-color: #67c23a;
}
</style>
