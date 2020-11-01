<template>
  <div>
    <new-dialog :show-dialog="show" width="40%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-alert
          title="【产品标识】与最终生成的url有关，磐石存量的页面，请延用相同的标识"
          type="info"
          show-icon
          :closable="false"
          style="marginBottom: 18px"
          v-if="this.actionType === 'add'"
        />
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" size="mini">
          <el-form-item prop="catgory">
            <span slot="label">所属分类</span>
            <el-select v-model="formData.catgory" placeholder="请选择">
              <el-option
                v-for="item in catgoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="productName">
            <span slot="label">产品名称</span>
            <el-input v-model="formData.productName" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="productMark" v-if="this.actionType === 'add'">
            <span slot="label">产品标识</span>
            <el-input v-model="formData.productMark" type="text" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
    </new-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newDialog from '@/components/newDialog'

export default {
  name: 'ServiceDialog',
  components: { newDialog },
  props: {
    handelTableData: {
      type: Function,
      default: () => {}
    },
    catgoryList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      formData: {
        catgory: '',
        productName: '',
        productMark: '',
      },
      rules: {
        catgory: [
          { required: true, message: '请选择所属分类', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        productMark: [
          { required: true, message: '请输入产品标识', trigger: 'blur' }
        ],
      },
      actionType: 'add'
    }
  },
  // mounted() {
  //   if(this.actionType === 'edit') {
  //     this.formData = { ...this.selectRow }
  //   }
  // },
  computed: {
    ...mapGetters([
      'ServiceDialog'
    ]),
    title() {
      switch (this.actionType) {
        case 'add':
          return '新增产品'
        case 'edit':
          return '编辑产品'
        default:
          return '编辑产品'
      }
    }
  },
  methods: {
    showDialog(actionType, selectRow) {
      this.actionType = actionType
      if(actionType === 'edit') {
        this.formData = { ...selectRow }
      }
      this.show = true
    },
    handleCancel() {
      this.show = false
      this.formData = {
        title: '',
        imgLink: '',
        link: '',
      }
    },
    handeleConfirm(cb) {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.handelTableData(this.actionType, this.formData)
            .then((res) => {
              cb && cb()
              this.show = false
            })
            .catch(err => {
              cb && cb()
            })
            
          } else {
            cb && cb()
            console.log('error submit!!');
            return false;
          }
        });
      // this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.dialog {
  &-container {
    padding: 0 20px 0 0;
    .el-form-item__label{
      span {
        font-weight: 400;
      }
    }
    .el-alert--info.is-light{
      background-color: #ecf5ff;
      border: 1px solid #d9ecff;
      color: #606266;
    }
  }
}
/deep/ .el-alert__icon{
  color: #409eff;
}
</style>
