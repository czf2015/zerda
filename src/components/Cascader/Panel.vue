<template>
  <el-cascader-panel :options="options" v-model="value" />
</template>
    
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      value: null,
    };
  },
  watch: {
    value() {
      this.$emit("change", this.value);
    },
  },
};
</script>