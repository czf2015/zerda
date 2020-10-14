<template>
  <div>
    <new-dialog :show-dialog="show" width="60%" :title="'编辑Banner信息'" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="130px" class="demo-ruleForm" size="mini">
          <el-form-item prop="bannerTitle">
            <span slot="label">Banner标题</span>
            <el-input v-model="formData.bannerTitle" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="bannerDescription">
            <span slot="label">描述</span>
            <el-input v-model="formData.bannerDescription" type="textarea" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="SEOKeyDescription">
            <span slot="label">背景图片</span>
            <el-input v-model="formData.bannerBackgroundImg" type="text" autocomplete="off">
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
          <el-form-item prop="SEOKeyDescription">
            <span slot="label">PC端Banner logo</span>
            <el-input v-model="formData.bannerBackgroundImg" type="text" autocomplete="off">
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
          <el-form-item prop="bannerDescription">
            <span slot="label">按钮</span>
            <el-table
              :data="formData.buttonList"
              style="width: 100%"
              >
              <el-table-column
                prop="buttonName"
                label="按钮名称"
                width="120"
              />
              <el-table-column
                prop="buttonType"
                label="按钮类型"
                width="120"
              />
              <el-table-column
                prop="buttonLink"
                label="按钮链接"
                width="120"
              />
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <p>
                    <el-link type="primary" :underline="false" @click="handleButtonEdit(scope.$index)">编辑</el-link>
                    <span style="margin: 0 5px; color: #cccccc;">|</span>
                    <el-link type="primary" :underline="false" @click="handleButtonRemove(scope.$index)">删除</el-link>
                  </p>
                </template>
              </el-table-column>
            </el-table>
            <div class="add-button" @click="handleButtonAdd" v-if="formData.buttonList.length < 2"><i class="el-icon-plus" />新增行</div>
            <div class="dialog-footer" v-if="showButtonForm">
              <el-form ref="buttonForm" :model="buttonForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" size="mini">
                <el-form-item prop="buttonName">
                  <span slot="label">按钮名称</span>
                  <el-input v-model="buttonForm.buttonName" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="buttonType">
                  <span slot="label">按钮类型</span>
                  <el-input v-model="buttonForm.buttonType" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="buttonLink">
                  <span slot="label">按钮链接</span>
                  <el-input v-model="buttonForm.buttonLink" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item style="textAlign: right">
                  <el-button @click="handleButtonForm('cancle')">取消</el-button>
                  <el-button type="primary" @click="handleButtonForm('confirm')">新增</el-button>
                </el-form-item>
              </el-form>
            </div>
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
  name: 'BannerDialog',
  components: { newDialog },
  props: {
    upDateContentData: {
      type: Function,
      default: () => {}
    }
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
      showButtonForm: false,
      actionType: 'add',
      formData: {
        bannerTitle: '',
        bannerDescription: '',
        definitionCSS: '',
        definitionJS: '',
        buttonList: []
      },
      buttonForm: {
        buttonName: '',
        buttonLink: '',
        buttonType: ''
      },
      rules: {
        pageTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        mark: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        openMode: [
          { required: true, message: '请选择打开方式', trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      editIndex: -1
    }
  },
  computed: {
    ...mapGetters([
      'CategoryManagement'
    ]),
    title() {
      switch (this.actionType) {
        case 'add':
          return '添加导航项'
        case 'edit':
          return '修改导航项'
        default:
          return '添加导航项'
      }
    }
  },
  methods: {
    showDialog(formData) {
      this.formData = formData
      this.show = true
    },
    handleCancel() {
      this.show = false
    },
    handeleConfirm(cb) {
      this.show = false
      this.upDateContentData('Banner', this.formData)
      cb && cb()
    },
    handleButtonAdd() {
      this.showButtonForm = true
      this.editIndex = -1
      this.buttonForm = {
        buttonName: '',
        buttonLink: '',
        buttonType: ''
      }
    },
    handleButtonEdit(index) {
      this.showButtonForm = true
      this.editIndex = index
      this.buttonForm = { ...this.formData.buttonList[index] }
    },
    handleButtonRemove(index) {
      this.formData.buttonList.splice(index, 1)
    },
    handleButtonForm(type) {
      if(type === 'confirm') {
        this.$refs['buttonForm'].validate((valid) => {
          if (valid) {
            if(this.editIndex > -1) {
              this.formData.buttonList.splice(this.editIndex, 1, {...this.buttonForm})
              this.editIndex = -1
            } else {
              this.formData.buttonList.push({...this.buttonForm})
            }
            
            this.buttonForm = {
              buttonName: '',
              buttonLink: '',
              buttonType: ''
            }
            this.showButtonForm = false
          } 
        })
      } else {
        this.showButtonForm = false
      }
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
    .add-button{
      text-align: center;
      padding: 0px;
      margin: 5px 0;
      border: 1px dashed #16A9A9;
      cursor: pointer;
      >i{
        margin-right: 12px;
      }
    }
  }
}
</style>
