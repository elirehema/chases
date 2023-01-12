const state = () => ({
  users: null
})

const mutations = {
  'GET_USERS' (state) {
    state.showLoader = true
  },
  'GET_USERS_FAILED' (state) {
    state.showLoader = false
  },
  'GET_USERS_ERROR' (state) {
    state.showLoader = false
  },
  'GET_USERS_SUCCESS' (state, payload) {
    state.showLoader = false
    state.users = payload
  }
}

const actions = {
  async _fetchgroupusers ({ commit }, requestbody) {
    commit('GET_USERS')
    await this.$axios
      .$post('/api/users', requestbody)
      .then((response) => {
        commit('GET_USERS_SUCCESS', response)
      })
      .catch(() => {
        commit('GET_USERS_ERROR')
      })
  },
  async _addgroupuser ({ dispatch }, requestbody) {
    await this.$axios
      .$post('/api/users', requestbody)
      .then((response) => {
        dispatch('_fetchgroupusers', null, { root: true })
      })
      .catch(() => {
      })
  },
  async _editgroupuser ({ dispatch }, requestbody) {
    await this.$axios
      .$put('/api/users', requestbody)
      .then((response) => {
        dispatch('_fetchgroupusers', null, { root: true })
      })
      .catch(() => {
      })
  },
  async _deletegroupuser ({ dispatch }, requestbody) {
    await this.$axios
      .$post('/api/users', requestbody)
      .then((response) => {
        dispatch('_fetchgroupusers', null, { root: true })
      })
      .catch(() => {
      })
  }
}

const getters = {
  users: (state) => {
    return state.users
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
