import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import Router from 'vue-router';
import routes from './config/routes'
import App from './App.vue'
import store from './store'


Vue.use(Router);
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false



new Vue({
  store,
  router: new Router(routes),
  render: h => h(App),
}).$mount('#app')
