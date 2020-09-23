<template>
  <div class="header-management">
    <el-card shadow="hover" class="header-management-header">
      <div slot="header" class="clearfix">
        <span>头部导航配置</span>
      </div>

      <div id="cascaderContainer">
        <ul class="cascader-header">
          <li><i class="el-icon-folder-add" @click="handleadd(1)"/></li>
          <li v-for="(value, index) in expandArr" :key="value" @click="handleadd(2+index)"><i class="el-icon-folder-add"/></li>
        </ul>

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
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
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
    debugger
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
      padding-left: 30px;
      list-style: none;
      box-sizing: border-box;
      border-right: solid 1px #E4E7ED;
      cursor: pointer;
      &:last-child{
        border-right: none;
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
