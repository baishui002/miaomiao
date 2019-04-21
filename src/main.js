import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'


Vue.config.productionTip = false
Vue.prototype.axios = axios

//全局filter
Vue.filter('imgSetWH', (url, arg)=>{
    return url.replace(/w\.h/, arg)
})

//注册全局组件
import Loading from '@/components/Loading'
import BScroller from '@/components/BScroller'

Vue.component('Loading', Loading)
Vue.component('BScroller', BScroller)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
