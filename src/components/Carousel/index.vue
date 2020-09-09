<template>
  <el-carousel
    :type="type"
    :direction="direction"
    :interval="interval"
    :indicator-position="indicatorPosition"
    :trigger="trigger"
  >
    <el-carousel-item v-for="item in list" :key="item">
      <slot>
        <pre
          style="display: flex;justify-content: center; align-items: center;width: 100%;height: 100%;"
        >{{item}}</pre>
      </slot>
    </el-carousel-item>
  </el-carousel>
</template>


<script>
export default {
  props: {
    type: {
      type: String,
    },
    direction: {
      type: String,
    },
    interval: {
      type: Number,
    },
    indicatorPosition: {
      type: String,
    },
    trigger: {
      type: String,
    },
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>