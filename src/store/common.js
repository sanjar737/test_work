export default {
  state: {
    loading: false,
    message: null,
    error: null
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    clearMessage (state) {
      state.message = null
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
    setMessage ({ commit }, payload) {
      commit('setMessage', payload)
    },
    clearMessage ({ commit }) {
      commit('clearMessage')
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    message (state) {
      return state.message
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
}
