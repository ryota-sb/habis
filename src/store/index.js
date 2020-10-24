import Vue   from 'vue'
import Vuex  from 'vuex'
import createPersistedState from "vuex-persistedstate"

import auth from './modules/auth'
import tasks from './modules/task'
import flashMessage from './modules/flash'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    tasks,
    flashMessage
  },
  // stateの状態をリロードしても保持する
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});