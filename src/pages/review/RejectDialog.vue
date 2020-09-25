<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" title="驳回" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <p>以下条目将被驳回审核：</p>
        <P>{{rowData.title}}-{{rowData.submitAuditUser}}({{rowData.submitAuditTime}})</P>
        <el-form ref="ruleForm" :model="formData" status-icon :rules="rules" label-width="0" class="demo-ruleForm" size="mini">
          <el-form-item prop="rejectOpinion">
            <!-- <span slot="label">驳回意见：</span> -->
            <el-input v-model="formData.rejectOpinion" type="textarea" autocomplete="off" />
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
  name: 'RejectDialog',
  components: { newDialog },
  props: {
  },
  data() {
    return {
      show: false,
      formData: {
        rejectOpinion: '',
      },
      rowData: {},
      rules: {
        rejectOpinion: [
          { required: true, message: '请填写驳回意见', trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    ...mapGetters([
      'RejectDialog'
    ]),
  },
  methods: {
    showDialog(rowData) {
      this.rowData = rowData
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
    P{
      margin-bottom: 20PX;
    }
  }
}
::v-deep .el-select{
  width: 100%;
}
</style>
