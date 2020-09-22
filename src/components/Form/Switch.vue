<template>
  <div class="switch">
    <el-switch
      v-model="checked"
      :active-text="activeText"
      :inactive-text="inactiveText"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
    />
    <p :class="valid ? 'none' : 'warning'">{{message}}</p>
  </div>
</template>

<script>
import { validate } from "@/utils/validate.js";

export default {
  name: "CustomSwitch",
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: Object,
      required: true,
    },
    activeText: {
      type: String,
    },
    inactiveText: {
      type: String,
    },
    activeColor: {
      type: String,
    },
    inactiveColor: {
      type: String,
    },
  },
  data() {
    return {
      checked: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  watch: {
    checked() {
      const { valid, message } = validate({
        value: this.checked,
        validation: this.validation,
        required: this.required,
      });
      this.valid = valid;
      this.message = message;
      this.$emit(this.validation.trigger, {
        field: this.field,
        value: this.checked,
        valid,
        message,
      });
    },
  },
};
</script>


<style lang="less" scoped>
.switch {
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