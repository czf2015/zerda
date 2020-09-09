<template>
  <div class="menu">
    <button @click="() => show = true">
      <Icon src="/icons/menu.png" />
    </button>
    <MenuMask :show="show">
      <menu>
        <h3>
          <a href="/">首页</a>
          <span @click="() => show = false">X</span>
        </h3>
        <MenuItems :list="list" />
      </menu>
    </MenuMask>
  </div>
</template>

<script>
import MenuMask from "@/components/Mask";
import Icon from "@/components/Icon";
import MenuItems from "./MenuItems";

export default {
  components: {
    MenuMask,
    Icon,
    MenuItems
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: true
    };
  }
};
</script>



<style lang="less">
.menu {
  display: inline-block;
  button {
    margin-left: .1rem;
  }
  menu {
    margin: 0;
    padding: 0;
    font-size: 0.24rem;
    line-height: 3;
    color: #fff;
    background-color: #16171a;
    a {
      color: #fff;
    }
    h3 {
      display: flex;
      justify-content: space-between;
      padding: 0 0.75rem 0 0.32rem;
    }
  }
}
</style>