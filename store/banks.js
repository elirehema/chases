const state = () => ({
  banks: null
})

const mutations = {
  'GET_BANKS' (state) {
    state.showLoader = true
  },
  'GET_BANKS_FAILED' (state) {
    state.showLoader = false
  },
  'GET_BANKS_ERROR' (state) {
    state.showLoader = false
  },
  'GET_BANKS_SUCCESS' (state, payload) {
    state.showLoader = false
    state.banks = payload.banks == null ? [] : payload.banks
  }
}

const actions = {
  async _fetchbanks ({ commit }, requestbody) {
    commit('GET_BANKS')
    await this.$axios
      .$post('/api/banks', requestbody)
      .then((response) => {
        commit('GET_BANKS_SUCCESS', response)
      })
      .catch(() => {
        commit('GET_BANKS_ERROR')
      })
  }
}

const getters = {
  banks: (state) => {
    return state.banks
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
