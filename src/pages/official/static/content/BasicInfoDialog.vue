<template>
  <div>
    <new-dialog :show-dialog="show" width="40%" :title="'编辑页面元信息'" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" size="mini">
          <el-form-item prop="pageTitle">
            <span slot="label">页面标题</span>
            <el-input v-model="formData.pageTitle" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="SEOKeyWords">
            <span slot="label">SEO关键字</span>
            <el-input v-model="formData.SEOKeyWords" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="SEOKeyDescription">
            <span slot="label">SEO描述</span>
            <el-input v-model="formData.SEOKeyDescription" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="definitionCSS">
            <span slot="label">自定义css</span>
            <el-input v-model="formData.definitionCSS" type="textarea" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="definitionJS">
            <span slot="label">自定义js</span>
            <el-input v-model="formData.definitionJS" type="textarea" autocomplete="off" />
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
  name: 'BasicInfoDialog',
  components: { newDialog },
  props: {
    updateContentData: {
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
      actionType: 'add',
      formData: {
        pageTitle: '',
        SEOKeyWords: '',
        SEOKeyDescription: '',
        definitionCSS: '',
        definitionJS: '',
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
      this.updateContentData('BasicInfo', this.formData)
      cb && cb()
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
