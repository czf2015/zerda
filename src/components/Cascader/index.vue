<template>
  <el-cascader
    placeholder="试试搜索"
    :options="options"
    :filterable="filterable"
    :clearable="clearable"
    @change="handleChange"
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
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>