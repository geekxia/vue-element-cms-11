import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'

// element-ui 的安装
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import store from './store'

import api from './api'
Vue.prototype.$api = api

import img from './utils/img'
Vue.prototype.$img = img

new Vue({
  router,
  store,
  render: h => h(App),
  el: '#app'
})
