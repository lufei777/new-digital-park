const state = {
  userProModuleList:[]
}

const mutations={
  userProModuleList(state,data){
    state.userProModuleList=data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
