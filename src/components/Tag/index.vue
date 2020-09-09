<template>
  <el-tag :type="type" :closable="closable" @close="handleClose">{{name}}</el-tag>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    closable: {
      type: Boolean,
    },
  },
  methods: {
    handleClose() {
      this.$emit("close", this.name);
    },
  },
};
</script>