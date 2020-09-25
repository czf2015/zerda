<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" title="通过并发布" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <p>以下条目将通过审核，通过审核后条目自动发布：</p>
        <p v-for="tableItem in tableSelection" :key="tableItem.id">{{tableItem.title}}-{{tableItem.submitAuditUser}}({{tableItem.submitAuditTime}})</p>
      </div>
    </new-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newDialog from '@/components/newDialog'

export default {
  name: 'ApproveDialog',
  components: { newDialog },
  props: {
  },
  data() {
    return {
      show: false,
      tableSelection: []
    }
  },
  computed: {
    ...mapGetters([
      'ApproveDialog'
    ])
  },
  methods: {
    showDialog(tableSelection) {
      // console.log(tableSelection)
      this.tableSelection = tableSelection
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

<style lang="less" scoped>
.dialog {
  &-container {
    padding: 0 20px 0 0;
    p{
      margin-bottom: 20px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
</style>
