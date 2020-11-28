// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import { Message } from 'element-ui';

import './assets/sass/style.scss'
import './assets/sass/iconStyle.css'
import './assets/sass/header.scss'
import './assets/sass/home.scss'
import './assets/sass/humanHouse.scss'
import './assets/sass/judgement.scss'
import './assets/sass/table.scss'
import './assets/sass/video.scss'
import promise from 'es6-promise'
promise.polyfill();
import Axios from 'axios'
Vue.prototype.$ajax = Axios
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import Vuex from 'vuex';
import store from './vuex/store'

Vue.use(Vuex);
import config from './assets/js/config'
Vue.use(config)
// import loadImg from './assets/js/loadimg'
// Vue.use(loadImg);
Vue.config.productionTip = false

Axios.defaults.headers.common['token'] = store.state.token;
// 添加请求拦截器
Axios.interceptors.request.use(config => {
// 在发送请求之前做些什么
// 判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['token'] = store.state.token
  }else{
    config.headers.common['token']="";
  }
  return config;
}, error => {
// 对请求错误做些什么
  return Promise.reject(error);
});
// http response 拦截器

Axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 401:
        router.replace({
          path: '/login',
          // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        });
        break;
      case '401':
        router.replace({
          path: '/login',
          // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        });
        break;
      case -1:
        Message({
          message: response.data.obj,
          type: 'error',
          duration: 1500
        });
        break;
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit('del_token');
          router.replace({
            path: '/login',
            // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }

    return Promise.reject(error.response.msg)
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



// WEBPACK FOOTER //
// ./src/main.js