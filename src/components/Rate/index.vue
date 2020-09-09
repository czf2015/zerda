<!--
 * @Author: czf
 * @Date: 2020-09-07 08:29:54
 * @LastEditors: czf
 * @LastEditTime: 2020-09-07 08:30:42
 * @Description: 
-->
<template>
  <el-rate
    v-model="rate"
    :disabled="disabled"
    :colors="colors"
    :show-text="showText"
    :show-score="showScore"
    :textColor="textColor"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 3,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showScore: {
      type: Boolean,
      default: false,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    textColor: {
      type: String,
      default: "#ff9900",
    },
    colors: {
      type: Array,
      default: () => ["#99A9BF", "#F7BA2A", "#FF9900"],
    },
  },
  data() {
    return {
      rate: this.value,
    };
  },
  watch: {
    rate() {
      this.$emit("change", this.rate);
    },
  },
};
</script>