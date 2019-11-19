const state = {
  dragFlag:true,
  tmpBreadcrumb:[],
  menuIsCollapse:false
}

const mutations={
  dragFlag(state,data) {
    state.dragFlag = data
  },
  tmpBreadcrumb(state,data) {
    state.tmpBreadcrumb = data
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
