<template>
  <ul is="el-card" class="contextmenu" :style="pos" v-show="show">
    <li
      class="contextmenu-item"
      v-for="{ title, value } in menus"
      :key="value"
      @click="handleClick(value)"
    >
      {{ title }}
    </li>
  </ul>
</template>


<script>
export default {
  props: {
    pos: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    menus: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(value) {
      this.$emit("operate", value);
    },
  },
};
</script>


<style lang="less" scoped>
.contextmenu {
  position: fixed;
  top: 227px;
  left: 768px;
  width: 200px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .contextmenu-item {
    list-style: none;
    line-height: 1.5;
    &:hover {
      color: #409eff;
      background-color: #f9fafc;
      cursor: pointer;
    }
  }
}
</style>