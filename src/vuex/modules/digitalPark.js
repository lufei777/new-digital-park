import Cookies from 'js-cookie';
import DigitalParkApi from "@/service/api/digitalPark";
import { setMenuTree, getMenuTree } from "utils/project";
import { setRoles, setPageRoles, getPageRoles } from 'utils/permission';

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
  pageRoles: getPageRoles() || {},
  homeKeepAliveFlag: true,   //控制瀑布流页的缓存/刷新
  permissionIdsList:[]  //所选角色的权限列表
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
}

const getters = {
  getMenuList(state) {
    return state.menuList
  }
}

const actions = {
  getMenus: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      DigitalParkApi.getMenuTree({
        language: Cookies.get("lang")
      }).then(menuTree => {
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
  setPageRoles({ commit }, { routeAddress: path }) {
    /* setTimeout(() => {
      commit('pageRoles', { path, roles: ['admin'] });
    }, 5000); */
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
