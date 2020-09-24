<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="showDialog"
      :width="width"
      center
      :before-close="handleCancel"
    >
      <div slot="title" class="title">
        <span>{{ title }}</span>
      </div>
      <slot name="body" />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel">Cancel</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="handleConfirm">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '50%'
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleCancel() {
      // if (this.loading) return
      this.loading = false
      this.$emit('cancel')
    },
    handleConfirm() {
      if (this.loading) return
      this.loading = true
      this.$emit('confirm', () => this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  &-container {
    margin: 30px;
    .title{
      text-align: left;
    }
  }
  &-footer {
    text-align: right;
  }
}
::v-deep .el-dialog__wrapper{
  .el-dialog__header{
    border-bottom: 1px solid #EBEEF5;
  }
  .el-dialog__body{
    padding: 20px;
    input{
      min-width: 0;
    }
    .el-select{
      width: 100%;
    }
  }
  .el-dialog__footer{
    padding: 10px 20px;
    border-top: 1px solid #EBEEF5;
  }
}
</style>
