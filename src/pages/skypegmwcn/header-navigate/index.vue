<template>
  <div class="header-management">
    <el-card shadow="hover" class="header-management-header">
      <div slot="header" class="clearfix">
        <span>头部导航配置</span>
      </div>

      <div id="cascaderContainer">
        <ul class="cascader-header">
          <li @click="handleadd(1)"><i class="el-icon-folder-add"/></li>
          <li v-for="(value, index) in expandArr" :key="value" @click="handleadd(2+index)"><i class="el-icon-folder-add"/></li>
        </ul>

        <el-cascader-panel :options="options" :props="cascaderProps" width="250px" size="small" @expand-change="handleExpandChange">
          <el-popover
            slot-scope="{ node, data }"
            :value="visible === node.label"
            placement="bottom"
            trigger="manual"
            :visible-arrow="false"
            width="100px"
          >
            <ul class="menu-container">
              <li @click="handleEdit(node)">
                <i class="el-icon-document-add" />
                <a href="javascript:;">更新</a>
              </li>
              <li @click="handleRemove(node)">
                <i class="el-icon-delete" />
                <a href="javascript:;">删除</a>
              </li>
            </ul>

            <span slot="reference" @mousedown="showMenu($event, node, data)" style="display: block">{{node.label}}</span>
          </el-popover>
        </el-cascader-panel>
      </div>
      
      
    </el-card>

    <NavigateDialog ref="NavigateDialog" />
    <NavigateRemove ref="NavigateRemove" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavigateDialog from './NavigateDialog'
import NavigateRemove from './NavigateRemove'

export default {
  name: 'CategoryManagement',
  components: { NavigateDialog, NavigateRemove },
  data() {
    return {
      visible: '',
      actionType: 'add',
      expandArr: [],
      cascaderProps: {
        value: 'menuId',
        label: 'title',
        children: 'topNavSubMenus'
      },
      options: [
    {
      "menuId": 10,
      "pid": 0,
      "title": "首页",
      "menuType": "item",
      "link": null,
      "openMode": null,
      "weight": 500,
      "tag": null,
      "topNavSubMenus": null
    },
    {
      "menuId": 11,
      "pid": 0,
      "title": "云产品",
      "menuType": "directory",
      "link": null,
      "openMode": null,
      "weight": 400,
      "tag": null,
      "topNavSubMenus": [
        {
          "menuId": 110,
          "pid": 11,
          "title": "计算",
          "menuType": "directory",
          "link": null,
          "openMode": null,
          "weight": 500,
          "tag": null,
          "topNavSubMenus": [
            {
              "menuId": 1101,
              "pid": 110,
              "title": "云服务器",
              "menuType": "item",
              "link": null,
              "openMode": null,
              "weight": 500,
              "tag": null,
              "topNavSubMenus": null
            },
            {
              "menuId": 1102,
              "pid": 110,
              "title": "容器服务",
              "menuType": "item",
              "link": null,
              "openMode": null,
              "weight": 400,
              "tag": null,
              "topNavSubMenus": null
            }
          ]
        },
        {
          "menuId": 111,
          "pid": 11,
          "title": "存储",
          "menuType": "directory",
          "link": null,
          "openMode": null,
          "weight": 400,
          "tag": null,
          "topNavSubMenus": [
            {
              "menuId": 1111,
              "pid": 111,
              "title": "云硬盘",
              "menuType": "item",
              "link": null,
              "openMode": null,
              "weight": 500,
              "tag": null,
              "topNavSubMenus": null
            },
            {
              "menuId": 1112,
              "pid": 111,
              "title": "对象存储",
              "menuType": "item",
              "link": null,
              "openMode": null,
              "weight": 400,
              "tag": null,
              "topNavSubMenus": null
            }
          ]
        },
        {
          "menuId": 112,
          "pid": 11,
          "title": "网络",
          "menuType": "directory",
          "link": null,
          "openMode": null,
          "weight": 300,
          "tag": null,
          "topNavSubMenus": null
        }
      ]
    },
    {
      "menuId": 12,
      "pid": 0,
      "title": "解决方案",
      "menuType": "directory",
      "link": null,
      "openMode": null,
      "weight": 300,
      "tag": null,
      "topNavSubMenus": null
    }
  ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    document.getElementById('cascaderContainer').oncontextmenu = function(e) {
      return false
    }
    document.onclick = () => {
      this.visible = ''
    }
  },
  beforeDestroy() {
    document.onclick = null
  },
  methods: {
    handleExpandChange(expandArr) {
      this.expandArr = expandArr
    },
    handleadd(index) {
      this.actionType = 'add'
      this.$refs['NavigateDialog'].showDialog(this.actionType, { expandArr: this.expandArr, index })
    },
    handleEdit(node) {
      this.actionType = 'edit'
      this.$refs['NavigateDialog'].showDialog(this.actionType, node)
      this.visible = ''
    },
    handleRemove(node) {
      this.$refs['NavigateRemove'].showDialog(node)
      this.visible = ''
    },
    showMenu(e, node, data) {
      if (e.which === 1) {
        this.visible = ''
        return
      }
      this.visible = node.label
    }
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
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    >li{
      width: 180px;
      height: 34px;
      line-height: 34px;
      padding-left: 30px;
      list-style: none;
      box-sizing: border-box;
      border-right: solid 1px #E4E7ED;
      cursor: pointer;
      &:last-child{
        border-right: none;
      }
      &:hover{
      background-color: #F5F7FA;
    }
    }
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

</style>
