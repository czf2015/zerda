<template>
  <div class="input-text">
    <input type="text" placeholder="未设置" :value="inputText" @[validation.trigger]="handleTrigger" />
    <p :class="valid ? 'none' : 'warning'">{{message}}</p>
  </div>
</template>

<script>
import { validate } from "@/utils/validate.js";

export default {
  name: "InputText",
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
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
      inputText: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  methods: {
    handleTrigger(e) {
      this.inputText = e.target.value
      const { valid, message } = validate({
        value: this.inputText,
        validation: this.validation,
        required: this.required,
      });
      this.valid = valid;
      this.message = message;
      this.$emit(this.validation.trigger, {
        field: this.field,
        value: this.inputText,
        valid,
        message,
      });
    },
  },
};
</script>


<style lang="less" scoped>
.input-text {
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