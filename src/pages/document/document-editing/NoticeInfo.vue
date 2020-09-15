<template>
  <el-card shadow="hover">
    <div class="notice-info">
      <div>
        <p style="lineHeight: 30px; fontSize: 16px;">
          <i class="el-icon-info" />
          <span>新增:</span>
        </p>
        <p style="fontSize: 12px; textIndent: 40px;">
          空白处打开右键菜单————————产品目录下新增
        </p>
        <p style="fontSize: 12px; textIndent: 40px;">
          选中菜单/文章，打开右键菜单————————菜单下新增菜单或文章
        </p>
        <p style="lineHeight: 30px; fontSize: 16px; textIndent: 40px;">
          <span>编辑:</span>
        </p>
        <p style="fontSize: 12px; textIndent: 40px;">
          点击选中菜单/文章，提交审核后发布
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NoticeInfo',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'NoticeInfo'
    ])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.notice-info{
  padding: 18px 20px;
  min-height: 465px;
  >div{
    padding: 18px 20px;
    background-color: #ecf5ff;
    border: 1px solid #d9ecff;
    >p{
      margin: 5px;
    }
    .el-icon-info{
      font-size: 30px;
      color: #409eff;
      vertical-align: top;
      margin-right: 10px;
    }
  }
}
</style>
