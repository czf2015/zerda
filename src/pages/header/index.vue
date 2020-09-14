<template>
  <Cascader v-bind="props" v-on="listeners" :class="classNames" :style="style" />
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