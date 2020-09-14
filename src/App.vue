<template>
  <div id="app">
    <AppAside class="app-left" />
    <div class="app-right">
      <AppHeader />
      <router-view />
      <AppFooter />
    </div>
  </div>
</template>


<script>
import AppHeader from "@/layouts/partials/AppHeader";
import AppFooter from "@/layouts/partials/AppFooter";
import AppAside from "@/layouts/partials/AppAside";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    AppAside,
  },
};
</script>


<style>
@import "/css/form.css";
@import "/css/element.css";

html {
  font-size: 100px;
}

body {
  font-size: 0.14rem;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
}

.app-left {
  width: 16%;
  height: 100vh;
}

.app-right {
  width: 84%;
  height: 100vh;
  overflow-y: auto;
}
</style>
