<template>
  <textarea v-model="inputText" @blur="handleInput" />
</template>

<script>
import { validate } from "@/utils/validate.js";

export default {
  name: "TextArea",
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: String,
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
    handleInput() {
      const { valid, message } = validate({
        value: this.inputText,
        validation: this.validation,
        required: this.required,
      });
      this.valid = valid;
      this.message = message;
      this.$emit("blur", {
        field: this.field,
        value: this.inputText,
        valid,
        message,
      });
    },
  },
};
</script>