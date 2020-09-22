<template>
  <div class="checkbox-group">
    <label
      class="checkbox-item"
      :style="{ width }"
      v-for="({ label, value }) in options"
      :key="value"
    >
      <input
        type="checkbox"
        :name="name"
        :value="value"
        :checked="selected.includes(value)"
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
  name: "CheckboxGroup",
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
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
      required: true,
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
      selected: this.value,
      valid: this.validation.valid || true,
      message: this.validation.message || "",
    };
  },
  methods: {
    handleClick(e) {
      const idx = this.selected.indexOf(e.target.value);
      if (idx === -1) {
        this.selected.push(e.target.value);
      } else {
        this.selected.splice(idx, 1);
      }
      // console.log(this.selected);
      const { valid, message } = validate({ value: this.selected, validation: this.validation, required: this.required })
      this.valid = valid;
      this.message = message;
      this.$emit(this.validation.trigger || 'change', {
        field: this.field,
        value: this.selected,
        valid,
        message,
      });
    },
  },
};
</script>


<style lang="less" scoped>
.checkbox-group {
  position: relative;
  display: flex;
  .checkbox-item {
    margin-left: 24px;
  }
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