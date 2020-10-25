import Vue       from 'vue'
import App       from './App.vue'
import store     from '@/store'
import router    from '@/router'
import vuetify   from '@/plugins/vuetify'
import axios     from 'axios'

Vue.config.productionTip = false

const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? "https://route-api-1.herokuapp.com" : "http://localhost:3000"
axios.defaults.baseURL = baseUrl

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
