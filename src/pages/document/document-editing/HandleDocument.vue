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
              <el-form-item label="类型：">
                <span>文章</span>
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
        <el-collapse-item name="2">
          <template slot="title">
            <div class="collapse-header">
              文章编辑
            </div>
          </template>
          <div class="info-form">
            <mavon-editor v-model="ruleForm.article" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

const content = `
**This is test**

* vue
* element
* webpack
`

export default {
  name: 'HandleDocument',
  // components: { MarkdownEditor },
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
        article: content
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
          return '新增文章'
        case 'edit':
          return '编辑文章'
        default:
          return '新增文章'
      }
    }
  },
  methods: {
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
