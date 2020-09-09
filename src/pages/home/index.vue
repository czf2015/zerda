<template>
  <Layout>
    <component
      v-for="([componentName, { id, props, listeners, classNames, style }]) in Object.entries(mock)"
      :key="id || componentName"
      :is="componentName"
      v-bind="props"
      v-on="listeners"
      :class="classNames"
      :style="style"
    />
  </Layout>
</template>


<script>
import Layout from "@/layouts/default";
import mock from "@/mock";

export default {
  name: "HomePage",
  components: {
    Layout,
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
  },
  data() {
    return {
      mock,
    };
  },
};
</script>