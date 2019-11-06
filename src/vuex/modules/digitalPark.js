const state = {
  oldProjectHome: "http://192.168.1.69:9002/html/index.html",
  userProModuleList: []
}

const mutations = {
  userProModuleList(state, data) {
    state.userProModuleList = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
