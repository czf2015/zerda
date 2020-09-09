<template>
  <div class="justify-content-between row">
    <nested class="col-8" v-model="elements" />
    <RawDisplayer class="col-4" :title="'Vuex Store'" :value="elements" />
  </div>
</template>

<script>
import Nested from "./Nested.vue";
import RawDisplayer from "@/components/Parser/Json.vue";

export default {
  name: "nested-with-vmodel",
  display: "Nested (v-model & vuex)",
  order: 16,
  components: {
    Nested,
    RawDisplayer,
  },
  computed: {
    elements: {
      get() {
        return this.$store.state.nested.elements;
      },
      set(value) {
        this.$store.dispatch("nested/updateElements", value);
      },
    },
  },
  methods: {},
};
</script>