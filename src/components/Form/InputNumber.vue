<template>
  <input type="number" v-model.number="inputNumber" @blur="handleInput" />
</template>

<script>
import { validate } from '@/utils/validate.js'

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
        default: false
    },
    validation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inputNumber: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  methods: {
    handleInput() {
      //   console.log(this.inputNumber);
      const { valid, message } = validate({ value: this.inputNumber, validation: this.validation, required: this.required })
      this.valid = valid;
      this.message = message;
      this.$emit("blur", {
        field: this.field,
        value: this.inputNumber,
        valid,
        message,
      });
    },
  },
};
</script>