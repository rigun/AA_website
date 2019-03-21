// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'bulma/css/bulma.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './style/main.styl'
import VueCroppie from 'vue-croppie'
Vue.prototype.$apiUrl = 'https://api1.thekingcorp.org/'
Vue.use(VueCroppie)
Vue.use(Buefy)
Vue.use(Vuetify)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
