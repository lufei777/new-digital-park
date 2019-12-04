const state = {
  dragFlag:true,
  menuIsCollapse:false
}

const mutations={
  dragFlag(state,data) {
    state.dragFlag = data
  },
  menuIsCollapse(state,data) {
    state.menuIsCollapse = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
