<template>
  <div>
    <div class="card-container" @click="showDialog">
      <el-card shadow="hover">
        <div slot="header">
          <h3>
            {{ componentData.title }}
            <!-- <el-button type="danger" icon="el-icon-close" circle style="float: right; padding: 3px" @click="handleRemove" /> -->
          </h3>
        </div>
        <div class="detail-container">
          <p>
            <span>页面标题：</span>
            <span>{{componentData.pageTitle || "未设置"}}</span>
          </p>
          <p>
            <span>SEO关键字：</span>
            <span>{{componentData.SEOKeyWords || "未设置"}}</span>
          </p>
          <p>
            <span>SEO描述：</span>
            <span>{{componentData.SEOKeyDescription || "未设置"}}</span>
          </p>
          <p>
            <span>自定义css：</span>
            <span>{{componentData.definitionCSS || "未设置"}}</span>
          </p>
          <p>
            <span>自定义js：</span>
            <span>{{componentData.definitionJS || "未设置"}}</span>
          </p>
        </div>
      </el-card>
    </div>
    <BcsicInfoDialog ref="BcsicInfoDialog" :upDateContentData="upDateContentData"/>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import BcsicInfoDialog from './BcsicInfoDialog'

export default {
  name: 'BcsicInfo',
  components: { BcsicInfoDialog },
  props: {
    componentData: {
      type: Object,
      default: () => {
        return {
          pageTitle: '',
          SEOKeyWords: '',
          SEOKeyDescription: '',
          definitionCSS: '',
          definitionJS: '',
        }
      }
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
    showDialog() {
      this.$refs['BcsicInfoDialog'].showDialog({ ...this.componentData })
    },
    // handleRemove() {
    //   this.upDateContentData('remove', this.index)
    // }
  }
}
</script>

<style lang="less" scoped>
.card-container{
  cursor: pointer;
  .detail-container{
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
