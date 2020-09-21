<template>
  <div>
    <new-dialog :show-dialog="show" width="40%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" size="mini">
          <el-form-item prop="title">
            <span slot="label">标题</span>
            <el-input v-model="formData.title" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="mark">
            <span slot="label">标识</span>
            <el-input v-model="formData.mark" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="type">
            <span slot="label">类型</span>
              <el-select v-model="formData.type" placeholder="请选择类型">
                <el-option label="菜单组" value="1" />
                <el-option label="菜单链接" value="2" />
              </el-select>
          </el-form-item>
          <el-form-item prop="link">
            <span slot="label">链接</span>
            <el-input v-model="formData.link" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="openMode">
            <span slot="label">链接打开方式</span>
              <el-select v-model="formData.openMode" placeholder="请选择链接打开方式">
                <el-option label="当前页跳转" value="1" />
                <el-option label="新窗口打开" value="2" />
              </el-select>
          </el-form-item>
          <el-form-item prop="tag">
            <span slot="label">标签</span>
              <el-select v-model="formData.tag" placeholder="请选择标签">
                <el-option label="无" value="1" />
                <el-option label="新品" value="2" />
              </el-select>
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
        title: '',
        mark: '',
        type: '',
        link: '',
        openMode: '',
        tag: '',
        weight: ''
      },
      rules: {
        title: [
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
      options: [
        {
          value: '选项1',
          label: '菜单链接'
        }, {
          value: '选项2',
          label: '菜单链接'
        }
      ],
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
    showDialog(actionType, rawData) {
      console.log(rawData)
      this.actionType = actionType
      this.show = true
    },
    handleCancel() {
      this.show = false
    },
    handeleConfirm() {
      this.show = false
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
