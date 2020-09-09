<template>
  <div class="wrapper">
    <header>
      <slot name="header"></slot>
    </header>
    <ul class="steppers">
      <li v-for="(stepper, idx) in steppers" :key="idx"></li>
    </ul>
    <slot>content</slot>
    <footer>
      <button @click="prev" :disabled="currentStep == 0">prev</button>
      <button @click="next" :disabled="currentStep == steppers.length - 1">next</button>
    </footer>
  </div>
</template>


<script>
export default {
  props: {
    steppers: {
      type: Array,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      currentStep: this.current,
    };
  },

  methods: {
    prev() {
      const current = this.currentStep - 1;
      if (current >= 0) {
        this.currentStep = current;
        this.$emit("change", current);
      }
    },
    next() {
      const current = this.currentStep + 1;
      if (current < this.steppers.length) {
        this.currentStep = current;
        this.$emit("change", current);
      }
    },
  },
};
</script>

<style lang="less" scope>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>