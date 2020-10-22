<template>
  <ul>
    <li v-for="(item, idx) in currMenu" :key="item.id || idx">
      <div :class="{ group: item.children }" class="flex">
        <div class="left-indent">
          <i class="icon" :style="{ backgroundImage: `url(${item.icon})` }"></i>
          <span>{{ item.label }}</span>
        </div>
        <div class="right-end">
          <button class="icon more"></button>
        </div>
      </div>
      <Menu
        v-if="item.children && item.children.length > 0"
        :initMenu="item.children"
      />
    </li>
  </ul>
</template>


<script>
import mock from "./mock";

export default {
  name: "Menu",
  props: {
    initMenu: {
      type: Array,
      //   required: true,
      default: () => mock,
    },
  },
  data() {
    return {
      currMenu: this.initMenu,
    };
  },
};
</script>


<style lang="less" scoped>
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: cover;
  //   background-image: url(/svg/close-active.svg);
  &.more {
    background-image: url(/svg/close-active.svg);
  }
}

ul {
  width: 400px;
  & > li {
      margin-left: 2em;
    & > .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 2em;
      & > .left-indent {
      }
      & > .right-end {
      }
    }
  }
}
</style>