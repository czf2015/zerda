<template>
  <pre>{{ valueString }}</pre>
</template>


<script>
export default {
  props: {
    // name: "JsonParser",
    value: {
      required: true,
    },
  },
  computed: {
    valueString() {
      return JSON.stringify(this.value, null, 2);
    },
  },
};
</script>


<style scoped>
pre {
  text-align: start;
}
</style>