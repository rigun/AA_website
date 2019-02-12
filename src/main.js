// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Buefy from 'buefy'
import './../node_modules/bulma/css/bulma.css'
import './../node_modules/material-design-icons-iconfont/dist/material-design-icons.css'
import './style/main.styl'
Vue.use(Buefy)
Vue.use(Vuetify)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
