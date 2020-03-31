import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
import { currency } from '@/currency.js'

Vue.config.productionTip = false
Vue.filter('asCurrency', currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
