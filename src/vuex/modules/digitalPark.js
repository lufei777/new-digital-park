const state = {
  dragFlag:true,
  menuIsCollapse:false,
  updateUserInfo:false
}

const mutations={
  dragFlag(state,data) {
    state.dragFlag = data
  },
  menuIsCollapse(state,data) {
    state.menuIsCollapse = data
  },
  updateUserInfo(state,data) {
    state.updateUserInfo = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
