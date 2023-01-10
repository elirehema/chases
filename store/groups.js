const state = () => ({
  groups: null
})

const mutations = {
  'GET_GROUPS' (state) {
    state.showLoader = true
  },
  'GET_GROUPS_FAILED' (state) {
    state.showLoader = false
  },
  'GET_GROUPS_ERROR' (state) {
    state.showLoader = false
  },
  'GET_GROUPS_SUCCESS' (state, payload) {
    state.showLoader = false
    state.groups = payload
  }
}

const actions = {
  async _fetchgroups ({ commit }, requestbody) {
    commit('GET_GROUPS')
    await this.$axios
      .$post('/api/groups', requestbody)
      .then((response) => {
        commit('GET_GROUPS_SUCCESS', response)
      })
      .catch(() => {
        commit('GET_GROUPS_ERROR')
      })
  },

  async _addgroupservicename ({ commit }, requestbody) {
    await this.$axios
      .$post('/api/group/service', requestbody)
      .then((response) => {
      })
      .catch(() => {
      })
  },
  async _editgroupservicename ({ commit }, requestbody) {
    await this.$axios
      .$put('/api/group/service', requestbody)
      .then((response) => {
      })
      .catch(() => {
      })
  },
  async _addbankaccount ({ comit }, body) {
    await this.$axios
      .$post('/api/group/account', body)
      .then((response) => {
      })
      .catch(() => {
      })
  },
  async _addgroupleader ({ comit }, body) {
    await this.$axios
      .$post('/api/group/leader', body)
      .then((response) => {
      })
      .catch(() => {
      })
  },
  async _deletegroupleader ({ dispatch }, body) {
    await this.$axios
      .$delete('/api/group/leader', body)
      .then((response) => {
      })
      .catch(() => {
      })
  },
  async _updatepaymentreference ({ dispatch }, body) {
    await await this.$axios
      .$put('/api/group/ref', body)
      .then((response) => {})
      .catch(() => {
      })
  }
}

const getters = {
  groups: (state) => {
    return state.groups
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
