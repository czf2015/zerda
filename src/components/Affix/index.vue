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
    },
  },
};
</script>


<style lang="less" scoped>
.affix {
  position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: 10000;
}
</style>