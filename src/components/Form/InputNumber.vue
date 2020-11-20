<template>
  <div class="input-number">
    <input type="number" placeholder="未设置" v-model.number="inputNumber" :min="validation.min" :max="validation.max" />
    <p :class="valid ? 'none' : 'warning'">{{message}}</p>
  </div>
</template>

<script>
import { validate } from "@/utils/validate.js";

export default {
  name: "InputNumber",
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
    },
    required: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      inputNumber: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  watch: {
    inputNumber() {
      const { valid, message } = validate({
        value: this.inputNumber,
        validation: this.validation,
        required: this.required,
      });
      this.valid = valid;
      this.message = message;
      this.$emit(this.validation.trigger, {
        field: this.field,
        value: this.inputNumber,
        valid,
        message,
      });
    },
  },
};
</script>


<style lang="less" scoped>
.input-number {
  position: relative;
  .none {
    display: none;
  }

  .warning {
    position: absolute;
    bottom: -16px;
    font-size: 12px;
    color: red;
  }
}
</style>