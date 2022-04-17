import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import contextMenu from './plugins/Context'

Vue.config.productionTip = false
Vue.use(contextMenu)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
