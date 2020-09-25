import Vue from 'vue'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/css/initCss.css'
import locale from 'element-ui/lib/locale/lang/en'
import Router from 'vue-router';
import routes from './config/routes'
import App from './App.vue'
import store from './store'


Vue.use(Router);
Vue.use(ElementUI)
// Vue.use(ElementUI, { locale })
Vue.use(mavonEditor)

Vue.config.productionTip = false



new Vue({
  store,
  router: new Router(routes),
  render: h => h(App),
}).$mount('#app')
