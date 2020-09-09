<template>
  <div class="card" :style="{ width, height }">
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  </div>
</template>


<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "auto",
    },
  },
};
</script>


<style scoped>
.card {
  color: #303133;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: 0.3s;
}
</style>