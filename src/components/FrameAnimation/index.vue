<template>
  <canvas
    class="frames"
    :style="{ transform: `scale(${scale})` }"
    :id="canvasTargetId"
    :height="height"
    :width="width"
  />
</template>


<script>
import { play_animation } from "./helpers.js";

export default {
  props: {
    canvasTargetId: {
      type: String,
      required: true,
    },
    framesUrl: {
      type: Array,
      required: true,
    },
    frequency: {
      type: Number,
      default: 20,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    play_animation(this);
  },
};
</script>


<style lang="less" scope>
.frames {
  transform-origin: left top;
  // transform: scale(3);
}
</style>