import axios    from 'axios'
import cookie   from 'vue-cookies'
import router   from '../../router/index'

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
      state.user = null
    }
  },
  actions: {
    async signUp({ commit, dispatch }, params) {
      await axios.post('api/auth', params).then(response => {
        commit('user', response.data.data)
        dispatch('signIn', params)
      }).catch(error => {
        console.log(error)
      })
    },
    async signIn({ commit, dispatch }, params) {
      await axios.post('api/auth/sign_in', params).then(response => {
        const token = {
          "access-token": response.headers['access-token'],
          "client": response.headers['client'],
          "uid": response.headers['uid'],
          "expiry": response.headers['expiry']
        }
        console.log(response.data.data.id)
        commit('user', response.data.data)
        commit('auth', token)
        // cookieへ書き込み
        const contents = {
          tokens: token,
          user: response.data.data
        }
        cookie.set('session', JSON.stringify(contents), { expire: '14D' })
        // dispatch('accountLink', response.data.data.id)
        router.push({ name: 'about' })
      }).catch(error => {
        console.log(error)
      })
    },
    async signOut({ commit }, params) {
      await axios.delete('api/auth/sign_out', { headers: params }).then(response => {
        commit('logout')
        router.push({ name: 'signin' })
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    // async accountLink(params) {
    //   await axios.post('account_link', params).then(response => {
    //     console.log(response)
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // }
  }
}

export default auth
