<template>
  <div>
    <div  class="card-container" @click="showDialog">
      <el-card shadow="hover">
        <div slot="header">
          <h3>
            {{ componentData.title }}
            <!-- <el-button type="danger" icon="el-icon-close" circle style="float: right; padding: 3px" @click="handleRemove" /> -->
          </h3>
        </div>
        <div class="banner-container">
          <p>
            <span>标题：</span>
            <span>{{componentData.bannerTitle || "未设置"}}</span>
          </p>
          <p>
            <span>描述：</span>
            <span>{{componentData.bannerDescription || "未设置"}}</span>
          </p>
          <p>
            <span>背景图：</span>
            <span>{{componentData.bannerBackgroundImg || "未设置"}}</span>
          </p>
          <p>
            <span>按钮：</span>
            <span v-if="!componentData.buttonList.length">未设置</span>
            <el-table
              :data="componentData.buttonList"
              style="width: 100%"
              v-else
            >
              <el-table-column
                prop="buttonName"
                label="按钮名称"
                width="180"
              />
              <el-table-column
                prop="buttonType"
                label="按钮类型"
                width="180"
              />
              <el-table-column
                prop="buttonLink"
                label="按钮链接"
                width="180"
              />
            </el-table>
          </p>
        </div>
      </el-card>
    </div>
    <BannerDialog ref="BannerDialog" :updateContentData="updateContentData"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BannerDialog from './BannerDialog'

export default {
  name: 'BasicInfo',
  components: { BannerDialog },
  props: {
    componentData: {
      type: Object,
      default: () => {
        return {
          description: '111',
          backgroundImg: '11',
          buttonList: []
        }
      }
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
      'Banner'
    ]),
  },
  methods: {
    showDialog() {
      this.$refs['BannerDialog'].showDialog({ ...this.componentData, buttonList: [ ...this.componentData.buttonList ] })
    },
  }
}
</script>

<style lang="less" scoped>
.card-container{
  cursor: pointer;
  .banner-container{
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
