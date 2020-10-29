<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" :title="propData.title" @cancel="handleCancel" @confirm="handleConfirm">
      <div slot="body" class="dialog-container">
        <i class="el-icon-question" />{{propData.content}}
      </div>
    </new-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newDialog from '@/components/newDialog'

export default {
  name: 'RemoveDialog',
  components: { newDialog },
  props: {
    propData: {
      type: Object,
      default() {
        return {
          title: '确认删除',
          content: '此项'
        }
      }
    },
    removeConfirm: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'RemoveDialog'
    ])
  },
  methods: {
    showDialog(rawData) {
      this.show = true
    },
    handleCancel() {
      this.show = false
    },
    handleConfirm(cb) {
      this.removeConfirm('remove')
        .then((res) => {
          cb && cb()
          this.show = false
        })
        .catch(err => {
          cb && cb()
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
::v-deep .el-icon-question{
  color: orange;
}
</style>
