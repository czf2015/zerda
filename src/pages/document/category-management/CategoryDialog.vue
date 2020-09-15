<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" size="mini">
          <el-form-item prop="categoryName">
            <span slot="label">中文名称</span>
            <el-input v-model="formData.categoryName" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="categoryNameEn">
            <span slot="label">英文名称</span>
            <el-input v-model="formData.categoryNameEn" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="iconUrl">
            <span slot="label">图标URL</span>
            <el-input v-model="formData.iconUrl" type="text" autocomplete="off">
              <el-upload
                slot="append"
                class="upload-icon"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <i class="el-icon-upload" />
                <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-input>
          </el-form-item>
          <el-form-item prop="weight">
            <span slot="label">权重</span>
            <el-input v-model="formData.weight" type="text" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
    </new-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newDialog from '@/pages/document/components/newDialog'

export default {
  name: 'CategoryDialog',
  components: { newDialog },
  props: {
    // actionType: {
    //   type: String,
    //   default: 'add'
    // }
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (this.ruleForm.checkPass !== '') {
    //       this.$refs.ruleForm.validateField('checkPass');
    //     }
    //     callback();
    //   }
    // }
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error('两次输入密码不一致!'));
    //   } else {
    //     callback()
    //   }
    // }
    return {
      show: false,
      actionType: 'add',
      formData: {
        categoryName: '',
        categoryNameEn: '',
        iconUrl: '',
        weight: ''
      },
      rules: {
        categoryName: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        categoryNameEn: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ],
        iconUrl: [
          { required: true, message: '请输入图标URL', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入权重', trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'CategoryManagement'
    ]),
    title() {
      switch (this.actionType) {
        case 'add':
          return '新增类别'
        case 'edit':
          return '编辑类别'
        default:
          return '新增类别'
      }
    }
  },
  methods: {
    showDialog(actionType, rawData) {
      console.log(rawData)
      this.actionType = actionType
      this.show = true
    },
    handleCancel() {
      this.show = false
    },
    handeleConfirm() {
      // this.show = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
    .upload-icon{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      display: flex;
      line-height: 2;
    }
  }
}
::v-deep .el-upload{
  width: 100%;
}
</style>
