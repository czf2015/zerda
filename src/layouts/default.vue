<template>
  <div class="page" v-show="!loading">
    <AppHeader />
    <main :style="{margin}">
      <draggable
        v-bind="dragOptions"
        tag="div"
        class="item-container"
        :list="list"
        :value="value"
        @input="emitter"
      >
        <component v-for="(data) in currentValue" :key="data.id" :is="data.type" :initial="data" />
      </draggable>
    </main>
    <AppAside />
    <AppFooter />
  </div>
</template>


<script>
import AppHeader from "./partials/AppHeader";
import AppFooter from "./partials/AppFooter";
import AppAside from "./partials/AppAside";
import Container from "@/components/Container";
import TableFormPanel from "@/components/Panel/TableForm";
import draggable from "vuedraggable";

export default {
  components: {
    AppHeader,
    AppFooter,
    AppAside,
    draggable,
    Container,
    TableFormPanel,
  },

  props: {
    margin: {
      type: String,
    },
  },
  data() {
    return {
      loading: true,
      dragOptions: {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      },
      list: [],
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
      this.$emit("input", value);
    },
    fetchData(page) {
      this.loading = true;
      fetch(`/data/${page}/index.json`)
        .then((res) => res.json())
        .then((data) => {
          this.list = data;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchData(this.$route.name);
  },
};
</script>
