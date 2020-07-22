import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue ,BootstrapVueIcons  } from 'bootstrap-vue'
export const eventBus = new Vue();
Vue.use( BootstrapVue);
Vue.use( BootstrapVueIcons);
export const EventBus = new Vue();

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
