import Cookies from 'js-cookie'
import CommonApi from "../../service/api/common";
import moment from "./analysis";
const state = {
  dragFlag:true,
  menuIsCollapse:false,
  updateUserInfo:false,
  stockInApplyTab:'0',
  stockInReApplyId:'',
  activeMenuIndex:Cookies.get("activeMenuIndex"),
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
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
