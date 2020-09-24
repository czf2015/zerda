<template>
  <div>
    <new-dialog :show-dialog="show" width="40%" :title="'编辑HTML'" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" size="mini">
          <el-form-item prop="HTMLTitle">
            <span slot="label">标题</span>
            <el-input v-model="formData.HTMLTitle" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="HTMLContent">
            <span slot="label">内容</span>
            <el-input v-model="formData.HTMLContent" type="textarea" autocomplete="off" />
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
  name: 'BcsicInfoDialog',
  components: { newDialog },
  props: {
    upDateContentData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      actionType: 'add',
      formData: {
        HTMLTitle: '',
        HTMLContent: '',
      },
      rules: {
        HTMLContent: [
          { required: true, message: '请输入HTML内容', trigger: 'blur' }
        ],
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
      this.upDateContentData('BcsicInfo', this.formData)
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
