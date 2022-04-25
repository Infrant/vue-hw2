import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import contextMenu from './plugins/Context'
import vuetify from './plugins/vuetify'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.use(contextMenu)
Vue.use(VueApexCharts)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
