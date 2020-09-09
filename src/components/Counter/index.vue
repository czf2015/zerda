<template>
  <div class="counter">
    <button @click="sub">-</button>
    <span>{{count}}</span>
    <button @click="add">+</button>
  </div>
</template>


<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      count: this.current || 0,
    };
  },
  methods: {
    add() {
      const count = this.count + this.step;
      if (typeof this.max !== "undefined" && count > this.max) {
        this.$emit("error", {
          name: "invalid",
          message: `最大值为${this.max}`,
        });
      } else {
        this.count = count;
        this.$emit("add", this.count);
      }
    },
    sub() {
      const count = this.count - this.step;
      if (typeof this.min !== "undefined" && count < this.min) {
        this.$emit("error", {
          name: "invalid",
          message: `最小值为${this.min}`,
        });
      } else {
        this.count = count;
        this.$emit("sub", this.count);
      }
    },
  },
};
</script>


<style lang="less" scoped>
.counter {
  button {
    padding: 5px 5px;
  }
  span {
    padding: 0 5px;
  }
}
</style>