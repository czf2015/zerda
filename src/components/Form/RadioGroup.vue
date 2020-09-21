<template>
  <div class="radio-group">
    <label class="radio-item" :style="{ width }" v-for="({ label, value }) in options" :key="value">
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="value == picked"
        @click="handleClick"
      />
      {{label}}
    </label>
    <p :class="valid ? 'none' : 'warning'">{{message}}</p>
  </div>
</template>


<script>
import { validate } from '@/utils/validate.js'

export default {
  name: "RadioGroup",
  props: {
    field: {
      type: String,
      required: true
    },
    value: {
      // type: String | Number,
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: false
    },
    validation: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: "group",
    },
    width: {
      type: String,
    },
  },
  data() {
    return {
      picked: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  methods: {
    handleClick(e) {
      // console.log(e.target.value);
      this.picked = e.target.value;
      const { valid, message } = validate({ value: this.picked, validation: this.validation, required: this.required })
      this.valid = valid;
      this.message = message;
      this.$emit("change", {
        field: this.field,
        value: e.target.value,
        valid,
        message,
      });
    },
  },
};
</script>


<style lang="less" scoped>
.radio-group {
  position: relative;
  display: flex;
  .radio-item {
    margin-left: 24px;
  }
  .none {
    display: none;
  }

  .warning {
    position: absolute;
    bottom: -28px;
    font-size: 12px;
    color: red;
  }
}
</style>