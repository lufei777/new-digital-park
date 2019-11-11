const state = {
  dragFlag:true,
  oldProjectHome: "http://192.168.1.69:9002/html/index.html",
  tmpBreadcrumb:[]
}

const mutations={
  dragFlag(state,data) {
    state.dragFlag = data
  },
  oldProjectHome(state,data){
    state.oldProjectHome = data
  },
  tmpBreadcrumb(state,data){
    state.tmpBreadcrumb = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
