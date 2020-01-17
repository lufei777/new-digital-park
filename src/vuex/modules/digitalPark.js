const state = {
  dragFlag:true,
  menuIsCollapse:false,
  updateUserInfo:false,
  stockInApplyTab:'0',
  stockInReApplyId:''
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
  stockInApplyTab(state,data){
    state.stockInApplyTab = data
  },
  stockInReApplyId(state,data){
    state.stockInReApplyId = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
