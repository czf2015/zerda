<template>
  <div>
    <div class="card-container" @click="showDialog">
      <el-card shadow="hover">
        <div slot="header">
          <h3>
            {{ componentData.title }}
          </h3>
        </div>
        <div class="html-container">
          <p>
            <span>内容：</span>
            <span>{{componentData.pateTitle || "未设置"}}</span>
          </p>
        </div>
      </el-card>
    </div>
    <HTMLDialog ref="HTMLDialog" :updateContentData="updateContentData"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HTMLDialog from './HTMLDialog'

export default {
  name: 'HTML',
  components: { HTMLDialog },
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
    updateContentData: {
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
      'HTML'
    ]),
  },
  methods: {
    showDialog(actionType, rawData) {
      this.$refs['HTMLDialog'].showDialog({ ...this.componentData })
    },
  }
}
</script>

<style lang="less" scoped>
.card-container{
  cursor: pointer;
  .html-container{
  p{
    display: flex;
    margin-bottom: 20px;
    span:first-child{
      width: 150px;
    }
    span:last-child{
      word-break: break-all;
      flex: 1;
    }
  }
}
}
</style>
