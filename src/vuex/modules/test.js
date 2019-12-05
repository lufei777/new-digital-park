const state = {
  count:0,
  articleNew:false
}

const mutations={
  count(state,data){
    state.count=data
  },
  articleNew(state,data){
    state.articleNew=data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
