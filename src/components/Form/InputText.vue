<template>
  <div class="input-text">
    <input type="text" v-model="inputText" />
    <p :class="valid ? 'none' : 'warning'">{{message}}</p>
  </div>
</template>

<script>
import { validate } from '@/utils/validate.js'

export default {
  name: "InputText",
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    validation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inputText: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  watch: {
    inputText() {
      debugger
      const { valid, message } = validate({ value: this.inputText, validation: this.validation, required: this.required })
      this.valid = valid;
      this.message = message;
      this.$emit(this.validation.trigger || 'change', {
        field: this.field,
        value: this.inputText,
        valid,
        message,
      });
    }
  }
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
    bottom: -28px;
    font-size: 12px;
    color: red;
  }
}
</style>