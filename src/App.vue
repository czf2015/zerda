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

  mounted() {
    // 解决火狐浏览器拖拽默认打开新的tab页问题
    document.body.ondrop = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
    };
  },
};
</script>


<style>
@import "/css/form.css";
@import "/css/element.css";
@import "/css/reset.css";

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

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  /* width: 0;
  height: 8px; */
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px; */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  /* border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); */
}

::-webkit-scrollbar-thumb {
  /* background: #0492f0de; */
}
</style>
