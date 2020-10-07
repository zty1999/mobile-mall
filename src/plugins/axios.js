"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = "http://152.136.185.210:8000/api/n3";
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: "http://152.136.185.210:8000/api/w6",
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 5000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor 添加响应拦截器
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data 对响应数据做点什么
    return response;
  },
  function(error) {
    // Do something with response error 对响应错误做点什么
    if(error.response.status === 401) {
        // 如果返回401 即没有权限，跳到登录页重新登录
        let res = JSON.parse(localStorage.getItem('token'));
       
        store.commit('CHANGE_TOKEN',res);
 
        if(res === 0) {
          alert('请重新登录');

        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
        }
    }
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
