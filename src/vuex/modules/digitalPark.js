const state = {
  dragFlag:true
}

const mutations={
  dragFlag(state,data) {
    state.dragFlag = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
