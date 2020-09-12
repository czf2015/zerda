<template>
  <ul class="sidebar">
    <li v-for="(item, idx) in list" :key="idx" @click="handleClick(item)">
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
  display: inline-block;
  padding: 10px;
  color: #fff;
  background-color: #409eff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: 0.3s;
  font-size: 16px;
  line-height: 1.5;
  cursor: pointer;
  > li {
    display: flex;
    align-items: center;
    &:not(:first-of-type) {
      margin-top: 10px;
    }
    > .desc {
      border-bottom: 1px solid;
      &:not(:first-child) {
        margin-left: 8px;
      }
    }
  }
}
</style>
