<template>
  <div class="page" v-show="!loading">
    <AppHeader />
    <main :style="{margin}">
      <slot />
    </main>
    <AppAside />
    <AppFooter />
  </div>
</template>


<script>
import AppHeader from "./partials/AppHeader";
import AppFooter from "./partials/AppFooter";
import AppAside from "./partials/AppAside";

export default {
  components: {
    AppHeader,
    AppFooter,
    AppAside,
  },

  props: {
    margin: {
      type: String,
      default: "0 0.32rem",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
