<template>
  <el-badge :type="type" :value="value">
    <pre v-html="html" @click="handleClick" />
  </el-badge>
</template>


<script>
export default {
  props: {
    type: {
      type: String,
    },
    value: {
      type: String | Number,
      required: true,
    },
    html: {
      type: String,
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>