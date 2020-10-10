import Vue       from 'vue'
import App       from './App.vue'
import axios     from 'axios'
import store     from '@/store/index'
import router    from '@/router/index'
import vuetify   from '@/plugins/vuetify'
import cookie    from 'vue-cookies'
import { pick }  from 'lodash'

Vue.prototype.$axios = axios.create()

// リクエストを送る前にユーザーを認証する
Vue.prototype.$axios.interceptors.response.use(response => {
  if(response.headers['access-token']) {
    const authHeaders = pick(response.headers, ["access-token", "client", "uid", "expiry", "token-type"])
    console.log(authHeaders)
    store.commit('auth', authHeaders)

    let session = cookie.get('session')
    if(session) {
      let session = JSON.parse(session)
      session['tokens'] = authHeaders
      cookie.set('session', JSON.stringify(session), { expires: '14D' })
    }
  }
  return response
}, (error) => {
  if(router.currentRoute.name !== 'signin') {
    store.commit('user', null)
    router.push({ name: 'signin' })
  }
  return Promise.reject(error)
})

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
