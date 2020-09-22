<template>
  <el-card shadow="hover">
    <div slot="header">
      <h3>
        {{ componentData.title }}
        <el-button type="danger" icon="el-icon-close" circle style="float: right; padding: 3px" @click="handleRemove" />
      </h3>
    </div>
    <div></div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
// import newDialog from '@/pages/document/components/newDialog'

export default {
  name: 'BcsicInfo',
  // components: { newDialog },
  props: {
    componentData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number,
      default: -1
    },
    upDateContentData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'Banner'
    ]),
  },
  methods: {
    showDialog(actionType, rawData) {
      console.log(rawData)
      this.actionType = actionType
      this.show = true
    },
    handleCancel() {
      this.show = false
    },
    handeleConfirm() {
      this.show = false
    },
    handleRemove() {
      this.upDateContentData('remove', this.index)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
