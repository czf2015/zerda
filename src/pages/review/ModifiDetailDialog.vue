<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" title="详情列表" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <p>此次修改涉及的模块：</p>
        <ul>
          <li>
            <span class="green-dot"/>
            banner运营
          </li>
          <li>
            <span class="green-dot"/>
            推荐产品
          </li>
          <li>
            <span class="green-dot"/>
            我们的解决方案
          </li>
        </ul>
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
    ul{
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      li{
        border-bottom: 1px solid #dcdfe6;
        padding: 15px;
        &:last-child{
          border-bottom: none;
        }
      }
    }
  }
}
.green-dot{
    display: inline-table;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 8px;
    background-color: #67c23a;
}
ul,li{
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
