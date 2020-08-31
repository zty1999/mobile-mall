import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder1.png'),
  attempt: 3  // 下载图片时错误重连次数
})

Vue.config.productionTip = false

//事件总线  默认情况下$bus没有值，所以新建一个vue实例，将实例赋值给$bus
Vue.prototype.$bus = new Vue();

//定义一个格式化时间的全局过滤器
Vue.filter('dataFormat',function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m =  (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + '').padStart(2,'0')
  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
