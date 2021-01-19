export default {
  namespaced: true,
  state: {
    cates: []
  },
  mutations: {
    updateCates(state, payload) {
      state.cates = payload
    }
  },
  actions: {}
}
