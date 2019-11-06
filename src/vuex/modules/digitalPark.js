const state = {
  dragFlag:true,
  oldProjectHome: "http://192.168.1.69:9002/html/index.html",
}

const mutations={
  dragFlag(state,data) {
    state.dragFlag = data
  },
  oldProjectHome(state,data){
    state.oldProjectHome = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
