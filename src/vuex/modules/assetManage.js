const state = {
  assetBreadcrumb:[{name:'资产管理',path:'/assetManage'}]
}

const mutations={
  assetBreadcrumb(state,data){
    state.assetBreadcrumb=data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
