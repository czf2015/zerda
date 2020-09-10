<template>
  <Layout :show="show">
    <draggable
      v-bind="dragOptions"
      tag="div"
      class="item-container"
      :list="list"
      :value="value"
      @input="emitter"
    >
      <Container name="div" v-for="(data) in currentValue" :key="data.id" :initial="data" />
    </draggable>
  </Layout>
</template>


<script>
import Layout from "@/layouts/default";
import Container from "@/components/Container";
import draggable from "vuedraggable";

export default {
  name: "HomePage",
  components: {
    Layout,
    Container,
    draggable,
  },
  data() {
    return {
      show: false,
      list: [],
      dragOptions: {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      },
      value: null,
    };
  },
  computed: {
    currentValue() {
      return this.value ? this.value : this.list;
    },
  },
  methods: {
    emitter(value) {
      // console.log(value);
      this.$emit("input", value);
    },
  },
  mounted() {
    fetch("/data/home/index.json")
      .then((res) => res.json())
      .then((data) => {
        this.list = data;
        this.show = true;
      });
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