import SystemManageApi from "@/service/api/systemManage";
import { removeMenuTree } from 'utils/project';
import { setToken, getToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from '@/utils/auth';
import store from '@/vuex/store';
const state = {
  token: getToken(),
  userInfo: getUserInfo() || {}
}

const mutations = {
  setToken: (state, payload) => {
    state.token = payload
  },
  setUserInfo: (state, payload) => {
    state.userInfo = payload
  }
}

const actions = {
  // 登录
  login({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      SystemManageApi.login(payload).then(token => {
        if (token) {
          // 设置token
          setToken(token);
          commit('setToken', token);
          // 将token返回
          resolve(token);
        } else {
          reject(token)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取用户信息
  getUserInfo({ commit }) {
    return new Promise(async (resolve, reject) => {
      let userInfo = await SystemManageApi.getUserInfo().catch(err => reject(err));
      commit('setUserInfo', userInfo);
      store.commit("digitalPark/roles", userInfo.rlist)
      setUserInfo(userInfo);
      // 将信息返回
      resolve(userInfo);
    })
  },
  // 退出登录
  logout({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      await SystemManageApi.logOut().then(_ => {
        // 清空用户信息、token、权限
        dispatch('resetToken');
        // 清空菜单树
        removeMenuTree();

        resolve();
      }).catch(err => reject(err));
    })
  },
  // 重置token和用户信息
  resetToken({ commit }) {
    return new Promise((resolve, reject) => {
      commit('setToken', '');
      commit('setUserInfo', {});
      removeToken();
      removeUserInfo();

      commit('digitalPark/resetPageRoles', {}, { root: true });
      commit('digitalPark/resetRoles', [], { root: true });

      resolve();
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
