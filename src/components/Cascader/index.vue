<template>
  <el-cascader
    placeholder="试试搜索：指南"
    :options="options"
    :filterable="filterable"
    :clearable="clearable"
  />
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    filterable: {
      type: Boolean,
    },
    clearable: {
      type: Boolean,
    },
  },
};
</script>