<template>
  <select :multiple="multiple" v-model="selected">
    <option disabled>请选择</option>
    <option v-for="({ label, value }) in options" :key="value" :value="value">{{label}}</option>
  </select>
</template>

<script>
import { validate } from '@/utils/validate.js'

export default {
  name: "CustomSelect",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    field: {
        type: String,
        required: true
    },
    value: {
      // type: Array | String,
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
        type: Boolean,
        default: false,
    },
    validation: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      selected: this.value || (this.multiple ? ["请选择"] : "请选择"),
      valid: this.validation.valid || true,
    };
  },
  watch: {
    selected() {
      //   console.log(this.selected);
      const { valid, message } = validate({ value: this.selected, validation: this.validation, required: this.required })
      this.valid = valid;
      this.message = message;
      this.$emit("change", {
          field: this.field,
          value: this.selected,
          valid,
          message,
      });
    },
  },
};
</script>