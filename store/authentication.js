const state = () => ({
  showLoader: Boolean,
  msisdn: null,
  account: null,
  password: null,
  authenticated: false

})

const mutations = {
  'AUTHENTICATE' (state) {
    state.showLoader = true
  },
  'AUTHENTICATE_FAILED' (state) {
    state.showLoader = false
  },
  'AUTHENTICATE_ERROR' (state) {
    state.showLoader = false
  },
  'AUTHENTICATE_SUCCESS' (state, payload) {
    state.showLoader = false
    if (payload.access_token) {
      state.account = payload
      state.authenticated = true
      this.$router.push('/')
    }
  },
  'LOGOUT_SESSION' (state) {
    window.localStorage.clear()
    sessionStorage.clear()
    this.$router.push('/signin')
    state.msisdn = null
    state.authenticated = false
    // window.location.reload(true)
  },

  'UPDATPASSWORD' (state, password) {
    state.showLoader = true
    state.password = password
    localStorage.setItem('password', password)
  },
  'UPDATPASSWORD_SUCCESS' (state, payload) {
    state.showLoader = false
    state.authenticated = true
    if (payload.responseCode === 0) {
      this.$router.push('/')
    }
  },
  'UPDATPASSWORD_ERROR' (state) {
    state.showLoader = false
  }
}
const actions = {
  async _authenticate ({ commit }, requestbody) {
    commit('AUTHENTICATE')
    await this.$api
      .$post('/auth-api/signin', requestbody)
      .then((response) => {
        commit('AUTHENTICATE_SUCCESS', response)
      })
      .catch(() => {
        commit('AUTHENTICATE_ERROR')
      })
  },

  async _updatepassword ({ commit }, requestbody) {
    commit('UPDATPASSWORD', requestbody.newPassword)
    await this.$api
      .$put('/auth', requestbody)
      .then((response) => {
        commit('UPDATPASSWORD_SUCCESS', response)
      })
      .catch(() => {
        commit('UPDATPASSWORD_ERROR')
      })
  },

  async _logoutsession ({ commit }) {
    await commit('LOGOUT_SESSION')
  }
}
const getters = {
  msisdn: function (state) {
    return state.msisdn
  },
  password: function (state) { return state.password },
  isAuthenticated: function (state) {
    return state.password !== null
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
