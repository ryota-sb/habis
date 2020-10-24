const flashMessage = {
  namespaced: true,
  state: {
    message: null
  },
  mutations: {
    setFlashMessage (state, { message, sec = 3000 }) {
      state.message = message
      setTimeout(() => (state.message = null), sec)
    }
  }
}

export default flashMessage