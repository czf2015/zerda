<template>
  <div class="affix" :style="pos">
    <slot>affix</slot>
  </div>
</template>


<script>
export default {
  props: {
    pos: {
      type: Object,
      default: () => {
        return {
          bottom: "0px",
          right: "0px",
        };
      },
    },
  },
};
</script>


<style lang="less" scoped>
.affix {
  position: fixed;
  z-index: 10000;
}
</style>