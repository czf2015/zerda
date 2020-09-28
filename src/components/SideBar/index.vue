<template>
  <ul class="sidebar">
    <li class="sidebar-item" v-for="(item, idx) in list" :key="idx" @click="handleClick(item)">
      <Icon v-if="item.icon" :src="item.icon" width="24px" height="24px" />
      <span class="desc">{{ item.text }}</span>
    </li>
  </ul>
</template>


<script>
import Icon from "@/components/Icon";

export default {
  components: {
    Icon,
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleClick(item) {
      this.$emit("click", item);
    },
  },
};
</script>


<style lang="less" scoped>
.sidebar {
  margin: 0;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  background: #fff;
  cursor: pointer;
  > .sidebar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 4px 2px;
    width: 36px;
    min-height: 36px;
    font-weight: bold;
    // color: #444950;
    color: #409eff;
    border-bottom: solid 1px #ccc;
    // &:first-child {
    //   color: #409eff;
    // }
    // &:nth-child(2) {
    //   color: green;
    // }
    // &:nth-child(3) {
    //   color: red;
    // }
    &:hover {
      background: #dedede;
    }
  }
}
</style>
