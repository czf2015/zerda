<template>
  <input type="submit" @click.prevent="handleClick" :value="label" :disabled="disabled" />
</template>


<script>
export default {
  name: "Submit",
  props: {
    label: {
      type: String,
      default: "submit",
    },
    disabled: {
        type: Boolean,
        default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>