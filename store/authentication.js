const state = () => ({
  showLoader: Boolean,
  msisdn: null,
  account: null

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
    if (payload.responseCode === 0) {
      state.msisdn = payload.msisdn
      state.account = payload
      localStorage.setItem('msisdn', payload.msisdn)
      if (payload.status === 'INACTIVE') {
        this.$router.push('/password')
      } else {
        this.$router.push('/')
      }
    } else {
      // window.location.reload(true)
    }
  },
  'LOGOUT_SESSION' (state) {
    window.localStorage.clear()
    sessionStorage.clear()
    this.$router.push('/signin')
    state.msisdn = null
    // window.location.reload(true)
  },

  'UPDATPASSWORD' (state, password) {
    state.showLoader = true
    localStorage.setItem('password', password)
  },
  'UPDATPASSWORD_SUCCESS' (state, payload) {
    state.showLoader = false
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
    commit('UPDATPASSWORD', requestbody.password)
    await this.$api
      .$post('/auth', requestbody)
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
  isAuthenticated: function (state) {
    return state.msisdn != null
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
