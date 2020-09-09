<template>
  <el-timeline>
    <el-timeline-item
      v-for="({ type, icon, color, size, content, timestamp }, idx) in sequences"
      :key="idx"
      :icon="icon"
      :type="type"
      :color="color"
      :size="size"
      :timestamp="timestamp"
    >{{content}}</el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  props: {
    sequences: {
      type: Array,
      required: true,
    },
  },
};
</script>