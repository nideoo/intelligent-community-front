// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/sass/style.scss'
import './assets/sass/iconStyle.css'
import './assets/sass/header.scss'
import './assets/sass/home.scss'
import './assets/sass/humanHouse.scss'
import './assets/sass/judgement.scss'
import './assets/sass/table.scss'
import './assets/sass/video.scss'

Vue.use(ElementUI)
import config from './assets/js/config'
Vue.use(config);
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
