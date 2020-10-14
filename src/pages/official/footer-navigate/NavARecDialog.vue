<template>
  <div>
    <new-dialog :show-dialog="show" width="60%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <div class="dialog-header">
          <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="50px" class="demo-ruleForm" size="mini" :inline="true">
            <el-form-item prop="title">
              <span slot="label">标题</span>
              <el-input v-model="formData.title" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="mark">
              <span slot="label">标识</span>
              <el-input v-model="formData.mark" type="text" autocomplete="off" />
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog-body" :id="componentId">
          <el-table
            :data="formData.children"
            style="width: 100%"
          >
            <el-table-column
              prop="title"
              label="标题"
              width="180"
            />
            <el-table-column
              prop="mark"
              label="标识"
              width="180"
            />
            <el-table-column
              prop="link"
              label="链接"
              width="180"
            />
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <p>
                  <el-link type="primary" :underline="false" @click="handleEdit(scope.$index)">编辑</el-link>
                  <span style="margin: 0 5px; color: #cccccc;">|</span>
                  <el-link type="primary" :underline="false" @click="handleRemove(scope.$index)">删除</el-link>
                </p>
                <p>
                  <el-link 
                    :type="!scope.$index ? 'info' : 'primary'" 
                    :underline="false" 
                    @click="handleMove(-1, scope.$index)" 
                    :disabled="!scope.$index"
                  >
                    上移
                  </el-link>
                  <span style="margin: 0 5px; color: #cccccc;">|</span>
                  <el-link 
                    :type="scope.$index === (formData.children.length - 1) ? 'info' : 'primary'" 
                    :underline="false" 
                    @click="handleMove(1, scope.$index)" 
                    :disabled="scope.$index === (formData.children.length - 1)"
                  >
                    下移
                  </el-link>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="add-button" @click="handleAdd"><i class="el-icon-plus"/>新增行</div>
        <div class="dialog-footer" v-if="showChildernForm">
          <el-form ref="childrenForm" :model="childrenForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" size="mini">
            <el-form-item prop="title">
              <span slot="label">标题</span>
              <el-input v-model="childrenForm.title" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="mark">
              <span slot="label">标识</span>
              <el-input v-model="childrenForm.mark" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="link">
              <span slot="label">链接</span>
              <el-input v-model="childrenForm.link" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item style="textAlign: right">
              <el-button @click="handleChldrenForm('cancle')">取消</el-button>
              <el-button type="primary" @click="handleChldrenForm('confirm')">新增</el-button>
            </el-form-item>
          </el-form>
        </div> 
      </div>
    </new-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newDialog from '@/components/newDialog'

export default {
  name: 'NavARecDialog',
  components: { newDialog },
  props: {
    handelTableData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      componentId: Date.now(),
      show: false,
      showChildernForm: false,
      formData: {
        title: '',
        mark: '',
        children: []
      },
      childrenForm: {
        title: '',
        mark: '',
        link: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        mark: [
          { required: true, message: '请输入标识', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入链接', trigger: 'blur' }
        ],
      }
    }
  },
  // mounted() {
  //   if(this.actionType === 'edit') {
  //     this.formData = { ...this.selectRow }
  //   }
  // },
  computed: {
    ...mapGetters([
      'NavARecDialog'
    ]),
    title() {
      switch (this.actionType) {
        case 'add':
          return '添加服务'
        case 'edit':
          return '编辑服务'
        default:
          return '编辑服务'
      }
    }
  },
  methods: {
    showDialog(actionType, selectRow) {
      this.actionType = actionType
      if(actionType === 'edit') {
        this.formData = { ...selectRow, children: selectRow.children || [] }
      }
      this.show = true
    },
    handleAdd() {
      this.showChildernForm = true
      this.childrenForm = {
        title: '',
        mark: '',
        link: ''
      }
    },
    handleEdit(index) {
      this.showChildernForm = true
      this.childrenForm = { ...this.formData.children[index] }
    },
    handleRemove(index) {
      this.formData.children.splice(index, 1)
    },
    handleMove(type, index) {
      if(this.timer) return;
      const tableRows = document.getElementById(this.componentId).getElementsByClassName('el-table__row');
      if(type === 1) {
        tableRows[index].className += ' transform-down'
        tableRows[index + type].className += ' transform-up'
      } else {
        tableRows[index].className += ' transform-up'
        tableRows[index + type].className += ' transform-down'
      }
        this.timer = setTimeout(() => {
        tableRows[index + type].className = tableRows[index].className = 'el-table__row'
        const tableData = [ ...this.formData.children ]
        const targetItem = tableData[index]
        tableData[index] = tableData[index + type]
        tableData[index + type] = targetItem
        this.formData.children = tableData
        clearTimeout(this.timer)
        this.timer = null
      }, 1000)
    },
    handleCancel() {
      this.show = this.showChildernForm = false
      this.formData = {
        title: '',
        mark: '',
        children: []
      }
      this.childrenForm = {
        title: '',
        mark: '',
        link: ''
      }
      this.$refs['ruleForm'].resetFields()
    },
    handeleConfirm(cb) {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.handelTableData(this.actionType, this.formData)
            .then((res) => {
              cb && cb()
              this.handleCancel()
            })
            .catch(err => {
              cb && cb()
            })
          } else {
            cb && cb()
            return false;
          }
        });
      // this.show = false
    },
    handleChldrenForm(type) {
      if(type === 'confirm') {
        this.$refs['childrenForm'].validate((valid) => {
          if (valid) {
            this.formData.children.push({...this.childrenForm})
            this.childrenForm = {
              title: '',
              mark: '',
              link: ''
            }
            this.showChildernForm = false
          } 
        })
      } else {
        this.showChildernForm = false
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  &-container {
    padding: 0 20px 0 0;
    .el-form-item__label{
      span {
        font-weight: 400;
      }
    }
    .add-button{
      text-align: center;
      padding: 3px;
      margin: 5px 0;
      border: 1px dashed #16A9A9;
      cursor: pointer;
      >i{
        margin-right: 12px;
      }
    }
  }
}
p{
  margin: 0;
}
</style>
