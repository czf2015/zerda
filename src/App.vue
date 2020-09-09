<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
  name: "App",
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
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
