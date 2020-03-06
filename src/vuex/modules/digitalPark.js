import Cookies from 'js-cookie'
const state = {
  dragFlag:true,
  menuIsCollapse:false,
  updateUserInfo:false,
  stockInApplyTab:'0',
  stockInReApplyId:'',
  activeMenuIndex:Cookies.get("activeMenuIndex"),
  menuList:JSON.parse(localStorage.getItem("menuList"))
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
  activeMenuIndex(state,data){
    state.activeMenuIndex = data
    Cookies.set("activeMenuIndex",data)
  },
  menuList(state,data){
    state.menuList = data
    localStorage.setItem("menuList",JSON.stringify(data))
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
