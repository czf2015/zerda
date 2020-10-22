<template>
  <div>
    <new-dialog :show-dialog="show" width="40%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="topNavForm" :model="formData" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" size="mini">
          <el-form-item prop="title">
            <span slot="label">标题</span>
            <el-input v-model="formData.title" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="keywords">
            <span slot="label">标识</span>
            <el-input v-model="formData.keywords" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="menuType">
            <span slot="label">类型</span>
              <el-select v-model="formData.menuType" placeholder="请选择类型" :disabled="menuItemLevel === 3">
                <el-option label="菜单组" value="directory" />
                <el-option label="菜单链接" value="item" />
              </el-select>
          </el-form-item>
          <el-form-item prop="link">
            <span slot="label">链接</span>
            <el-input v-model="formData.link" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="openMode">
            <span slot="label">链接打开方式</span>
              <el-select v-model="formData.openMode" placeholder="请选择链接打开方式">
                <el-option label="当前页跳转" value="C" />
                <el-option label="新窗口打开" value="T" />
              </el-select>
          </el-form-item>
          <el-form-item prop="tag">
            <span slot="label">标签</span>
              <el-select v-model="formData.tag" placeholder="请选择标签">
                <el-option label="无" value="none" />
                <el-option label="新品" value="new" />
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
import newDialog from '@/components/newDialog'
import { TopNav } from '@/services'
import { urlValidate, numberValidate } from '@/utils/validate'

export default {
  name: 'CategoryDialog',
  components: { newDialog },
  props: {
    queryTopNavMenus: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      actionType: 'addMenuItem',
      menuItemLevel: 1,
      formData: {
        pid: 0,
        title: '',
        keywords: '',
        menuType: '',
        link: '',
        openMode: '',
        tag: '',
        weight: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
          { max: 16, message: '标题长度不能超过20个字符', trigger: 'change' }
        ],
        keywords: [
          { required: true, message: '请输入标识', trigger: 'change' },
          { max: 16, message: '标题长度不能超过20个字符', trigger: 'change' }
        ],
        menuType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        openMode: [
          { required: true, message: '请选择链接打开方式', trigger: 'change' }
        ],
        link: [
          { pattern: urlValidate, message: '链接格式不正确', trigger: 'blur'}
        ],
        weight: [
          { pattern: numberValidate, message: '权重必须为数字值', trigger: 'change'}
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
        case 'addMenuItem':
          return '添加导航项'
        case 'modifyMenuItem':
          return '修改导航项'
        default:
          return '添加导航项'
      }
    }
  },
  methods: {
    showDialog(actionType, data) {
      console.log(data, actionType)
      this.actionType = actionType
      this.show = true
      if(actionType === 'addMenuItem') {
        const {menuItemLevel, expandArr} = data
        console.log(menuItemLevel, expandArr)
        this.menuItemLevel = menuItemLevel
        switch(menuItemLevel) {
          case 1:
            this.formData.pid = 0
            break
          case 2:
            this.formData.pid = expandArr[0]
            break
          case 3:
            this.formData.menuType = 'item'
            this.formData.pid = expandArr[1]
            break
        }
      } else if(actionType === 'modifyMenuItem') {
        this.menuItemLevel = data.level
        const { title, keywords, menuType, link, openMode, tag, weight, pid, menuId} = {...data.data}
        this.formData = { title, keywords, menuType, link, openMode, tag, weight, pid, menuId } 
      }
    },
    handleCancel() {
      this.show = false
      this.$refs['topNavForm'].resetFields()
      this.formData = {
        pid: 0,
        title: '',
        keywords: '',
        menuType: '',
        link: '',
        openMode: '',
        tag: '',
        weight: ''
      }
    },
    handeleConfirm(cb) {
       this.$refs['topNavForm'].validate((valid) => {
          if (valid) {
            this[this.actionType](this.formData, cb)
          } else {
            cb && cb()
            return false;
          }
        });
    },
    addMenuItem(data, cb) {
      TopNav.add(data)
        .then(res => {
          this.handleCancel()
          this.queryTopNavMenus()
          cb()
        })
        .catch(err => {
          cb()
        })
    },
    modifyMenuItem(data, cb) {
      TopNav.update(data)
        .then(res => {
        this.handleCancel()
        this.queryTopNavMenus()
        cb()
      })
      .catch(err => {
        cb()
      })
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
