<template>
  <el-card shadow="hover">
    <div slot="header" class="card-header">
      <span>{{ title }}</span>
      <div class="button-container">
        <el-button size="small" plain @click="exitEdit">退出编辑</el-button>
        <el-button size="small" type="primary">提交审核</el-button>
        <!-- <el-button size="small" plain><i class="el-icon-full-screen" /></el-button> -->
      </div>
    </div>
    <div class="document-info">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <div class="collapse-header">
              基本信息
            </div>
          </template>
          <div class="info-form">
            <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" size="mini">
              <el-form-item label="所属产品：">
                <span>文章</span>
              </el-form-item>
              <el-form-item label="所属菜单：">
                <span>文章</span>
              </el-form-item>
              <el-form-item label="类型：">
                <span>菜单</span>
              </el-form-item>
              <el-form-item label="文章链接：">
                <span></span>
              </el-form-item>
              <el-form-item label="标题：" prop="title">
                <el-input v-model="ruleForm.title" type="text" />
              </el-form-item>
              <el-form-item label="英文别名：" prop="titleEn">
                <el-input v-model="ruleForm.titleEn" type="text" />
              </el-form-item>
              <el-form-item label="展示权重：" prop="weight">
                <el-input v-model.number="ruleForm.weight" type="text" />
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HandleFolder',
  components: {},
  props: {
    actionType: {
      type: String,
      default: 'add'
    },
    exitEdit: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      activeName: '1',
      ruleForm: {
        title: '',
        titleEn: '',
        weight: '',
        article: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        titleEn: [
          { required: true, message: '请输入英文别名', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入展示权重', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'HandleFolder'
    ]),
    title() {
      switch (this.actionType) {
        case 'add':
          return '新增菜单'
        case 'edit':
          return '编辑菜单'
        default:
          return '新增菜单'
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
.card-header{
    height: 28px;
    line-height: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button-container{
      // float: right;
    }
}
.document-info{
  padding: 18px 20px;
  min-height: 400px;
  .collapse-header{
    padding: 0 20px;
  }
  .info-form{
    padding: 20px;
  }
}
::v-deep .el-collapse{
  border: 1px solid #EBEEF5;
  .is-active{
    border-bottom: 1px solid #EBEEF5;
  }
}
</style>
