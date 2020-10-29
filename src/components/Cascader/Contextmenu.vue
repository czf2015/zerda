<template>
  <ul is="el-card" class="contextmenu" :style="pos" v-show="show">
    <li
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
      this.$emit('context', value);
    },
  },
  mounted() {
    document.oncontextmenu = (e) => {
      e.preventDefault();
    };
  },
};
</script>


<style lang="less" scoped>
.contextmenu {
  position: fixed;
  top: 227px;
  left: 768px;
  background-color: blanchedalmond;
  width: 200px;
}
</style>