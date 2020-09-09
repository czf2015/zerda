<template>
  <img v-if="src" class="icon" :class="shape" :style="{ width, height }" :src="src" />
</template>


<script>
export default {
  props: {
    src: {
      type: String,
      // required: true,
    },
    width: {
      type: String,
      default: "36px",
    },
    height: {
      type: String,
      default: "36px",
    },
    shape: {
      type: String,
    },
  },
};
</script>


<style lang="less" scoped>
.icon {
}

.circle {
  border-radius: 50%;
}
</style>