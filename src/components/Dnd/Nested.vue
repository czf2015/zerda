<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :value="value"
    @input="emitter"
  >
    <div class="item-group" v-for="el in realValue" :key="el.id">
      <div class="item">{{ el.name }}</div>
      <Nested class="item-sub" :list="el.elements" />
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Nested",
  components: {
    draggable,
  },
  props: {
    list: {
      type: Array,
      required: false,
      default: null,
    },
    value: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      dragOptions: {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      },
    };
  },
  computed: {
    realValue() {
      return this.value ? this.value : this.list;
    },
  },
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
.item-container {
  max-width: 20rem;
  margin: 0;
}
.item {
  padding: 1rem;
  border: solid black 1px;
  background-color: #fefefe;
}
.item-sub {
  margin: 0 0 0 1rem;
}
</style>