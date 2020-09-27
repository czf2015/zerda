<template>
  <div>
    <new-dialog :show-dialog="show" width="30%" :title="title" @cancel="handleCancel" @confirm="handeleConfirm">
      <div slot="body" class="dialog-container">
        <i class="el-icon-question" />您确认删除此导航项吗？
      </div>
    </new-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import newDialog from '@/pages/document/components/newDialog'
import { delMenuItem } from '@/api/skypegmwcn'

export default {
  name: 'CategoryRemove',
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
      title: '删除导航项',
      menuId: ''
    }
  },
  computed: {
    ...mapGetters([
      'CategoryRemove'
    ])
  },
  methods: {
    showDialog(menuData) {
      this.menuId = menuData.data.menuId
      this.show = true
    },
    handleCancel() {
      this.show = false
    },
    handeleConfirm(cb) {
      delMenuItem({menuId: this.menuId})
      .then(res => {
        this.queryTopNavMenus()
        this.show = false
        cb()
      })
      .catch(err => {
        this.show = false
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
::v-deep .el-icon-question{
  color: orange;
}
</style>
