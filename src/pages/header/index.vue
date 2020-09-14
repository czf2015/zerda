<template>
  <main id="header">
    <Cascader v-bind="props" v-on="listeners" :class="classNames" :style="style" />
  </main>
</template>

<script>
import mock from "@/mock";

export default {
  components: {
    Cascader: () => import("@/components/Cascader/Panel"),
  },
  data() {
    const { props, listeners, classNames, style } = mock.Cascader;
    return {
      props,
      listeners,
      classNames,
      style,
    };
  },
};
</script>


<style lang="less" scoped>
#header {
  min-height: 85vh;
}
</style>