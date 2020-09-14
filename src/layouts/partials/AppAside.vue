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
    <!-- <el-submenu index="1" @click="goTo">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>首页</span>
      </template>

      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>

      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
      <i class="el-icon-location"></i>
      <span slot="title">首页管理</span>
    </el-submenu>-->
    <el-menu-item index="/header" @click="goTo('/header')">
      <i class="el-icon-location"></i>
      <span slot="title">首部管理</span>
    </el-menu-item>

    <el-menu-item index="/footer" @click="goTo('/footer')">
      <i class="el-icon-location"></i>
      <span slot="title">尾部管理</span>
    </el-menu-item>

    <el-menu-item index="/" @click="goTo()">
      <i class="el-icon-location"></i>
      <span slot="title">首页管理</span>
    </el-menu-item>

    <el-menu-item index="/categories" @click="goTo('/categories')">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>

    <el-menu-item index="/document" @click="goTo('/document')" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">文档管理</span>
    </el-menu-item>

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