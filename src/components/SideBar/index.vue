<template>
  <ul class="sidebar">
    <li v-for="(item, idx) in list" :key="idx" @click="handleClick(item)">
      <Icon :src="item.icon" width="24px" height="24px" />
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
  display: inline-block;
  padding: 5px;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 0 5px / 5px 5px / 5px 0;
  z-index: 9999;
  > li {
    display: flex;
    align-items: center;
    &:not(:first-of-type) {
      margin-top: 10px;
    }
    > .desc {
      font-size: 12px;
      color: #409eff;
      border-bottom: 1px solid;
      &:not(:first-child) {
        margin-left: 8px;
      }
    }
  }
}
</style>
