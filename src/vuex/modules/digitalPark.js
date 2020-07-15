import Cookies from 'js-cookie';
import DigitalParkApi from "@/service/api/digitalPark";
import SystemManageApi from "@/service/api/systemManage";
import { setMenuTree, getMenuTree } from "utils/project";
import { setRoles, setPageRoles, getPageRoles } from 'utils/permission';
let repeatRouteList = ['defaultPage', 'digitalPark/dashboardHomePage', 'stockInApply']
const state = {
  dragFlag: true,
  menuIsCollapse: false,
  updateUserInfo: false,
  stockInApplyTab: '0',
  stockInReApplyId: '',
  activeMenuIndex: Cookies.get("activeMenuIndex"),
  menuList: JSON.parse(localStorage.getItem("menuList")), // 单个模块的菜单列表
  menuTree: getMenuTree() || [], // 数字园区整体菜单列表
  privateRouters: [],  // 模块列表
  largeScreenIframeSrc: '',
  contentHeight: '',
  roles: [],
  pageRoles: getPageRoles() || {}, //页面权限
  homeKeepAliveFlag: true,   //控制瀑布流页的缓存/刷新
  permissionIdsList:[],  //所选角色的权限列表
  repeatRouteList:repeatRouteList,  //重复路由
  moduleInfo:{}
}

const mutations = {
  dragFlag(state, data) {
    state.dragFlag = data
  },
  menuIsCollapse(state, data) {
    state.menuIsCollapse = data
  },
  updateUserInfo(state, data) {
    state.updateUserInfo = data
  },
  stockInApplyTab(state, data) {
    state.stockInApplyTab = data
  },
  stockInReApplyId(state, data) {
    state.stockInReApplyId = data
  },
  activeMenuIndex(state, data) {
    state.activeMenuIndex = data
    Cookies.set("activeMenuIndex", data)
  },
  menuList(state, data) {
    state.menuList = data
    localStorage.setItem("menuList", JSON.stringify(data))
  },
  largeScreenIframeSrc(state, data) {
    state.largeScreenIframeSrc = data
  },
  setContentHeight(state, payload) {
    state.contentHeight = payload;
  },
  setMenuTree(state, payload) {
    state.menuTree = payload;
  },
  setPrivateRouters(state, payload) {
    state.privateRouters = payload;
  },
  homeKeepAliveFlag(state, data) {
    state.homeKeepAliveFlag = data
  },
  roles(state, payload) {
    state.roles.length = 0;
    state.roles = state.roles.concat(payload);
    setRoles(state.roles);
  },
  pageRoles(state, { path, roles }) {
    state.pageRoles = Object.assign({}, state.pageRoles, { [path]: roles });
    setPageRoles(state.pageRoles);
  },
  permissionIdsList(state, data) {
    state.permissionIdsList = data
  },
  repeatRouteList(state, data) {
    state.repeatRouteList = data
  },
  moduleInfo(state, data){
    state.moduleInfo = data
    localStorage.setItem("moduleInfo", JSON.stringify(data))
  }
}

const getters = {
  getMenuList(state) {
    return state.menuList
  },

  getRepeatRouteList(state){
    return state.repeatRouteList
  }
}

const actions = {
  getMenus: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      DigitalParkApi.getMenuTree({
        language: Cookies.get("lang")
      }).then(menuTree => {
        menuTree[0].childNode[0].childNode[1].childNode[0].routeAddress='/digitalPark/defaultPage'

        commit('setMenuTree', menuTree);
        // 设置到localStorage
        setMenuTree(menuTree);
        // 返回
        resolve(menuTree)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setPageRoles({ commit }) {
    /* setTimeout(() => {
      commit('pageRoles', { path, roles: ['admin'] });
    }, 5000); */

    let path = state.moduleInfo.routeAddress
    state.repeatRouteList.map((item)=>{
      if(item.indexOf(path)!=-1){
        path = state.moduleInfo.id + path
      }
    })
    return new Promise((resolve, reject) => {
      SystemManageApi.getPermissionById({
        menuId : state.moduleInfo.id
      }).then(permissionList => {
        commit('pageRoles', {path,roles:permissionList});
        resolve(permissionList)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
