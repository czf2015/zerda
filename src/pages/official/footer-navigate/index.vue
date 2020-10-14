<template>
  <div class="footer-management">
    <el-card shadow="hover" class="header-management-header">
      <div slot="header" class="clearfix">
        <span>底部导航配置</span>
      </div>

      <div id="cascaderContainer">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="服务配置" name="first">
            <ServiceConfig :list="content.service" />
          </el-tab-pane>
          <el-tab-pane label="导航配置" name="second">
            <NavARecConfig :list="content.navigator" />
          </el-tab-pane>
          <el-tab-pane label="推荐配置" name="third">
            <NavARecConfig :list="content.recommend" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ServiceConfig from "./ServiceConfig";
import NavARecConfig from "./NavARecConfig";
import { FooterInfo } from "@/services";

export default {
  name: "CategoryManagement",
  components: { ServiceConfig, NavARecConfig },
  data() {
    return {
      // currentPage: 1,
      activeName: "first",
      result: null,
      content: null,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    handleClick(actionType, rowData) {
      // this.$refs['CategoryDialog'].showDialog(actionType, rowData)
    },
    handleRemove(rowData) {
      // this.$refs["CategoryRemove"].showDialog(rowData);
    },
  },
  mounted() {
    FooterInfo.query().then((res) => {
      this.result = res.result;
      this.content = JSON.parse(res.result.content);
    });
  },
};
</script>

<style lang="scss" scoped>
.footer-management {
  padding: 15px;
  &-header {
    margin-bottom: 30px;
    .el-select {
      margin-right: 20px;
    }
  }
  &-body {
    a {
      color: #66b1ff;
    }
    .pagination-container {
      text-align: right;
      margin: 20px 0;
    }
  }
}
</style>
