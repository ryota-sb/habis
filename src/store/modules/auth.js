import axios    from 'axios'
import cookie   from 'vue-cookies'
import router   from '../../router/index'
import RestAPI  from '../../plugins/rest_api'

const auth = {
  namespaced: true,
  state: {
    user: null,
    auth: null
  },
  getters: {
    user: state => state.user,
    auth: state => state.auth
  },
  mutations: {
    user(state, value) {
      state.user = value
    },
    auth(state, value) {
      state.auth = value
    },
    logout(state) {
      state.auth = null
    }
  },
  actions: {
    async signUp({ dispatch }, params) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.post('api/auth', params).then(response => {
        dispatch('signIn', params)
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    async signIn({ commit }, params) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.post('api/auth/sign_in', params).then(response => {
        const token = {
          "access-token": response.headers['access-token'],
          "client": response.headers['client'],
          "uid": response.headers['uid'],
          "expiry": response.headers['expiry']
        }
        commit('user', response.data.data)
        commit('auth', token)
        // cookieへ書き込み
        const contents = {
          tokens: token,
          user: response.data.data
        }
        cookie.set('session', JSON.stringify(contents), { expire: '14D' })
        router.push({ name: 'about' })
      }).catch(error => {
        console.log(error)
      })
    },
    async signOut({ commit }, params) {
      const instance = axios.create({
        baseURL: RestAPI.url()
      })
      await instance.delete('api/auth/sign_out', { headers: params }).then(response => {
        commit('logout')
        router.push({ name: 'signin' })
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

export default auth
