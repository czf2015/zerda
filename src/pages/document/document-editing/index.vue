<template>
  <div class="document-editing">
    <div class="document-editing-header">
      <el-button size="small" @click="handleRefresh($event)">刷新 <i class="el-icon-refresh-right" /></el-button>
    </div>
    <el-card class="document-editing-body" shadow="hover">
      <el-container style="backgroundColor: #fafafa">
        <el-aside v-loading="treeLoading" width="400px" style="padding: 20px 10px 20px 20px">
          <el-card shadow="hover">
            <div slot="header" class="card-header">
              <el-select v-model="value2" size="mini" placeholder="请选择" style="width: 31%">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="value2" size="mini" placeholder="请选择" style="width: 31%">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="value2" size="mini" placeholder="请选择" style="width: 31%">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="card-body-left" id="cancledefultMenu">
              <el-tree :data="treeData">
                <el-popover
                  slot-scope="{ node, data }"
                  :value="visible === node.label"
                  placement="bottom"
                  trigger="manual"
                  :visible-arrow="false"
                  style="display: block; width: 100%"
                >
                  <ul class="menu-container">
                    <li v-if="node.data.type !== 'document'">
                      <i class="el-icon-folder" />
                      <span style="fontweight: bold;">{{ node.label }}</span>
                    </li>
                    <li @click="handleRightComponents('HandleFolder')">
                      <i class="el-icon-circle-plus-outline" />
                      <a href="javascript:;">新增菜单</a>
                    </li>
                    <li @click="handleRightComponents('HandleDocument')">
                      <i class="el-icon-document-add" />
                      <a href="javascript:;">新增文章</a>
                    </li>
                    <li>
                      <i class="el-icon-delete" />
                      <a href="javascript:;">删除节点</a>
                    </li>
                  </ul>
                  <div slot="reference" class="custom-tree-node" @mousedown="showMenu($event, node, data)">
                    <i :class="node.data.type === 'document' ? 'el-icon-document' : 'el-icon-folder-opened'" style="marginRight: 5px" />
                    <span>{{ node.label }}</span>
                  </div>
                </el-popover>
              </el-tree>
            </div>
          </el-card>
        </el-aside>
        <el-main style="padding: 20px 20px 20px 10px">
          <component :is="rightComponent" :action-type="actionType" :exit-edit="exitEdit" />
          <!-- <NoticeInfo v-if="actionType === 'defult'"/> -->
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NoticeInfo from './NoticeInfo'
import HandleDocument from './HandleDocument'
import HandleFolder from './HandleFolder'

let id = 1000
export default {
  name: 'DocumentEditing',
  components: { NoticeInfo, HandleFolder, HandleDocument },
  data() {
    return {
      visible: '',
      value2: '',
      treeLoading: true,
      actionType: 'add',
      rightComponent: 'NoticeInfo',
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
      treeData: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    document.getElementById('cancledefultMenu').oncontextmenu = function(e) {
      return false
    }
    document.onclick = () => {
      this.visible = ''
    }
    this.getTreeData()
  },
  beforeDestroy() {
    document.onclick = document.getElementById('cancledefultMenu').oncontextmenu = null
  },
  methods: {
    getTreeData() {
      setTimeout(() => {
        this.treeData = [
          {
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1',
                type: 'document'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }
        ]
        this.treeLoading = false
      }, 2000)
    },
    handleRefresh() {
      this.exitEdit()
    },
    exitEdit() {
      this.rightComponent = 'NoticeInfo'
    },
    handleRightComponents(rightComponent) {
      this.rightComponent = rightComponent
      this.actionType = 'add'
      this.visible = ''
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    showMenu(e, node, data) {
      if (e.which === 1) {
        this.actionType = 'edit'
        this.rightComponent = node.data.type === 'document' ? 'HandleDocument' : 'HandleFolder'
        this.activeNode = node
        return
      }
      this.visible = node.label
    }
  }
}
</script>

<style lang="scss" scoped>
.document-editing {
  padding: 15px;
  &-header {
    margin-bottom: 20px;
  }
  &-body {
    min-height: 500px;
    .card-header{
      display: flex;
      justify-content: space-between;
    }
    .card-body-left{
      padding: 18px 20px;
      min-height: 400px;
      height: 100%;
      .custom-tree-node{
        width: 100%;
      }
    }
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
::v-deep .el-card{
  height: 100%;
  .el-card__body{
    padding: 0
  }
  .el-select .el-input__inner{
    min-width: unset
  }
}
</style>
