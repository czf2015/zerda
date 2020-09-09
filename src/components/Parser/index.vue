<template>
  <div class="parser">
    <h3>{{title}}</h3>
    <component :is="componentName" :type="type" :value="value" />
  </div>
</template>


<script>
export default {
  name: "parser",
  components: {
    JsonParser: () => import("./Json"),
  },
  props: {
    title: {
      type: String,
    },
    type: {
      type: String,
      default: "Json",
    },
    value: {
      required: true,
    },
  },
  computed: {
    componentName() {
      return `${this.type}Parser`;
    },
  },
};
</script>