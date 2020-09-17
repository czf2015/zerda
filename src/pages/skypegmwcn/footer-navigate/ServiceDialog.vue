<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" size="mini">
          <el-form-item prop="title">
            <span slot="label">标题</span>
            <el-input v-model="formData.title" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="imgLink">
            <span slot="label">图片链接</span>
            <el-input v-model="formData.imgLink" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="link">
            <span slot="label">链接</span>
            <el-input v-model="formData.link" type="text" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
    </new-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newDialog from '@/pages/skypegmwcn/components/newDialog'

export default {
  name: 'ServiceDialog',
  components: { newDialog },
  props: {
    handelTableData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      formData: {
        title: '',
        imgLink: '',
        link: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        imgLink: [
          { required: true, message: '请输入图片链接', trigger: 'blur' }
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
      'ServiceDialog'
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
