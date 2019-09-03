const state = {
    energySaveFlag:1
  }
  
  const mutations={
    energySaveFlag(state,data){
      state.energySaveFlag = data
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations
  }
  