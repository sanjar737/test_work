export default {
  state: {
    token: localStorage.getItem('session'),
    user: null
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async loginUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')

      try {
        let response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(payload)
        })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        let body = await response.json()
        let token = body['token']

        localStorage.setItem('session', token)
        commit('setToken', token)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async registerUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearMessage')
      commit('clearError')

      try {
        let response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(payload)
        })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        let body = await response.json()
        let message = body['message']
        commit('setMessage', message)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    logoutUser ({ commit }) {
      localStorage.removeItem('session')
      commit('setUser', null)
      commit('setToken', null)
    },
    async aboutUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      try {
        let response = await fetch('http://localhost:8080/about', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${payload}`
          }
        })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        let body = await response.json()
        let user = body['data']

        commit('setUser', user)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    user (state) {
      return state.user
    },
    isLogged (state) {
      return state.token !== null
    }
  }
}
