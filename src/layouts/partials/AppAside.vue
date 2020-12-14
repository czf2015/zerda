<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="/official">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>官网内容运营</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="/official/header-navigate"
          @click="goTo('/official/header-navigate')"
          >头部导航配置</el-menu-item
        >
        <el-menu-item
          index="/official/footer-navigate"
          @click="goTo('/official/footer-navigate')"
          >底部导航配置</el-menu-item
        >
        <el-menu-item index="/official" @click="goTo('/official')"
          >首页内容配置
        </el-menu-item>
        <el-menu-item
          index="/official/dynamic"
          @click="goTo('/official/dynamic')"
          >动态页面管理</el-menu-item
        >
        <el-menu-item
          index="/official/static/category"
          @click="goTo('/official/static/category')"
          >静态页面管理</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="/document">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>文档管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="/document/category"
          @click="goTo('/document/category')"
          >类别管理</el-menu-item
        >
        <el-menu-item
          index="/document/product"
          @click="goTo('/document/product')"
          >产品管理</el-menu-item
        >
        <el-menu-item
          index="/document/document-editing"
          @click="goTo('/document/document-editing')"
          >文档编辑</el-menu-item
        >
        <el-menu-item
          index="/document/document-review"
          @click="goTo('/document/document-review')"
          >文档审核</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item index="/review" @click="goTo('/review')">
      <i class="el-icon-setting"></i>
      <span slot="title">审核管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    // navList: {
    //   type: Array,
    //   required: true,
    // },
  },
  methods: {
    handleOpen(msg) {},
    handleClose(msg) {},
    goTo(link = "/") {
      this.$router.push(link);
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-menu-item-group {
  > ul {
    > li {
      text-indent: 20px;
    }
  }
}
</style>