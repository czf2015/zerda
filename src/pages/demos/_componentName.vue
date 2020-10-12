<template>
  <component
    :is="componentName"
    v-bind="props"
    v-on="listeners"
    :class="classNames"
    :style="style"
  >{{componentName}}</component>
</template>

<script>
import mock from "@/mock";

export default {
  components: {
    Timer: () => import("@/components/Timer"),
    CustomMask: () => import("@/components/Mask"),
    CustomForm: () => import("@/components/Form"),
    CustomTable: () => import("@/components/Table"),
    TableForm: () => import("@/components/TableForm"),
    Menu: () => import("@/components/Menu"),
    Upload: () => import("@/components/Upload"),
    Rate: () => import("@/components/Rate"),
    Card: () => import("@/components/Card"),
    Tag: () => import("@/components/Tag"),
    Icon: () => import("@/components/Icon"),
    Badge: () => import("@/components/Badge"),
    Tree: () => import("@/components/Tree"),
    Pagination: () => import("@/components/Pagination"),
    Collapse: () => import("@/components/Collapse"),
    Counter: () => import("@/components/Counter"),
    FrameAnimation: () => import("@/components/FrameAnimation"),
    Breadcrumb: () => import("@/components/Breadcrumb"),
    Columns: () => import("@/components/Columns"),
    Link: () => import("@/components/Link"),
    Timeline: () => import("@/components/Timeline"),
    Cascader: () => import("@/components/Cascader/Panel"),
    Tooltip: () => import("@/components/Tooltip"),
    Alert: () => import("@/components/Alert"),
    SideBar: () => import("@/components/SideBar"),
    Affix: () => import("@/components/Affix"),
    Modal: () => import("@/components/Modal"),
    Steps: () => import("@/components/Steps"),
    Drawer: () => import("@/components/Drawer"),
    Tabs: () => import("@/components/Tabs"),
    Carousel: () => import("@/components/Carousel"),
    Dnd: () => import("@/components/Dnd"),
    Parser: () => import("@/components/Parser"),
    Loading: () => import("@/components/Loading/Ripple"),
    Search: () => import('@/components/Form/Search')
    // toTest
    // 方法
    // Message: () => import("@/components/Message"),
    // Loading: () => import("@/components/Loading"),
    // 指令
  },
  data() {
    const { componentName } = this.$route.params;
    const { props, listeners, classNames, style } = mock[componentName];
    return {
      componentName,
      props,
      listeners,
      classNames,
      style,
    };
  },
};
</script>