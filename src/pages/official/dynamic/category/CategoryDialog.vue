<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" size="mini">
          <el-form-item prop="categoryName">
            <span slot="label">类别名称</span>
            <el-input v-model="formData.categoryName" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="categoryMark">
            <span slot="label">类别标识</span>
            <el-input v-model="formData.categoryMark" type="text" autocomplete="off" />
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
    handleTableData: {
      type: Function,
      default: () => {}
    },
    actionType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false,
      formData: {
        categoryName: '',
        categoryMark: '',
      },
      rules: {
        categoryName: [
          { required: true, message: '请输入类别名称', trigger: 'blur' }
        ],
        categoryMark: [
          { required: true, message: '请输入类别标识', trigger: 'blur' }
        ],
      },
      // actionType: 'add'
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
          return '新增分类'
        case 'edit':
          return '编辑分类'
        default:
          return '编辑分类'
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
            this.handleTableData(/* this.actionType,  */this.formData)
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

<style lang="scss" scoped>
.dialog {
  &-container {
    padding: 0 20px 0 0;
    .el-form-item__label{
      span {
        font-weight: 400;
      }
    }
  }
}
</style>
