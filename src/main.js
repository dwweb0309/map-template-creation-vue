import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import 'leaflet/dist/leaflet.css';
import './styles/global.scss';

import './plugins/rules'
import './plugins/cookies'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
