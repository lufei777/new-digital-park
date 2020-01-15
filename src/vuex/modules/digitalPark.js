const state = {
  dragFlag:true,
  menuIsCollapse:false,
  updateUserInfo:false,
  stockTabChange:0
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
  },
  stockTabChange(state,data){
    state.stockTabChange = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
