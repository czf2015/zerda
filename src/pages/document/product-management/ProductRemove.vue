<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <i class="el-icon-question" />您确认删除此产品吗？
      </div>
    </new-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newDialog from '@/components/newDialog'

export default {
  name: 'ProductRemove',
  components: { newDialog },
  props: {
  },
  data() {
    return {
      show: false,
      title: '删除产品'
    }
  },
  computed: {
    ...mapGetters([
      'ProductRemove'
    ])
  },
  methods: {
    showDialog(rawData) {
      console.log(rawData)
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
::v-deep .el-icon-question{
  color: orange;
}
</style>
