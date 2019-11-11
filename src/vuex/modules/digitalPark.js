const state = {
  dragFlag:true,
  tmpBreadcrumb:[]
}

const mutations={
  dragFlag(state,data) {
    state.dragFlag = data
  },
  tmpBreadcrumb(state,data) {
    state.tmpBreadcrumb = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
