<template>
  <el-card shadow="hover" @click="showDialog">
    <div slot="header">
      <h3>
        {{ componentData.title }}
        <el-button type="danger" icon="el-icon-close" circle style="float: right; padding: 3px" @click="handleRemove" />
      </h3>
    </div>
    <div class="detail-container">
      <p>
        <span>页面标题：</span>
        <span>{{componentData.pateTitle || "未设置"}}</span>
      </p>
      <p>
        <span>SEO关键字：</span>
        <span>{{componentData.pateTitle || "未设置"}}</span>
      </p>
      <p>
        <span>SEO描述：</span>
        <span>{{componentData.pateTitle || "未设置"}}</span>
      </p>
      <p>
        <span>自定义css：</span>
        <span>{{componentData.pateTitle || "未设置"}}</span>
      </p>
      <p>
        <span>自定义js：</span>
        <span>{{componentData.pateTitle || "未设置"}}</span>
      </p>
    </div>
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
      'BcsicInfo'
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
    handeleConfirm(newData) {
      this.show = false
      this.upDateContentData('edit', this.index, newData)
    },
    handleRemove() {
      this.upDateContentData('remove', this.index)
    }
  }
}
</script>

<style lang="less" scoped>
.detail-container{
  p{
    display: flex;
    span:first-child{
      width: 150px;
    }
    span:last-child{
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
  }
}
</style>
