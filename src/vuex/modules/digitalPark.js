const state = {
  dragFlag:true,
  menuIsCollapse:false,
  updateUserInfo:false,
  stockInApplyTab:'0',
  stockInReApplyId:'',
  todoTab:'0',
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
  },
  todoTab(state,data){
    state.todoTab = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
