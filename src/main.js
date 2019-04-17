import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
import Loading from '@/components/Loading'

Vue.config.productionTip = false
Vue.prototype.axios = axios

//全局filter
Vue.filter('imgSetWH', (url, arg)=>{
    return url.replace(/w\.h/, arg)
})

//注册全局组件
Vue.component('Loading', Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
