<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" size="mini">
          <el-form-item prop="productName">
            <span slot="label">中文名称</span>
            <el-input v-model="formData.categoryName" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="productNameEn">
            <span slot="label">英文名称</span>
            <el-input v-model="formData.categoryNameEn" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="category">
            <span slot="label">图标URL</span>
            <el-select v-model="formData.category" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="weight">
            <span slot="label">权重</span>
            <el-input v-model="formData.weight" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="jumpUrl">
            <span slot="label">跳转链接</span>
            <el-input v-model="formData.jumpUrl" type="text" autocomplete="off" />
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
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('年龄不能为空'))
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'))
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('必须年满18岁'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   }, 1000)
    // }
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
        productName: '',
        productNameEn: '',
        category: '',
        weight: '',
        jumpUrl: ''
      },
      rules: {
        productName: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        productNameEn: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ],
        // category: [
        //   { required: true, message: '请输入图标URL', trigger: 'blur' }
        // ],
        weight: [
          { required: true, message: '请输入权重', trigger: 'blur' }
        ]
        // jumpUrl: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      },
      options: [
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
      ]
    }
  },
  computed: {
    ...mapGetters([
      'ProductDialog'
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
    showDialog(actionType, rawData) {
      this.actionType = actionType
      this.show = true
    },
    handleCancel() {
      this.show = false
    },
    handeleConfirm() {
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
::v-deep .el-select{
  width: 100%;
}
</style>
