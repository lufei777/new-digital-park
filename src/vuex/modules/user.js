import SystemManageApi from "@/service/api/systemManage";
import { setToken, getToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from '@/utils/auth';

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
  login({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      SystemManageApi.login(payload).then(token => {
        if (token) {
          // 设置token
          setToken(token);
          commit('setToken', token);
          resolve(token);
        } else {
          reject(token)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  getUserInfo({ commit }) {
    return new Promise(async (resolve, reject) => {
      let userInfo = await SystemManageApi.getUserInfo();
      commit('setUserInfo', userInfo);
      setUserInfo(userInfo);
      resolve();
    })
  },
  logout({ commit }) {
    return new Promise(async (resolve, reject) => {
      await SystemManageApi.logOut();
      commit('setToken', '');
      commit('setUserInfo', {});
      removeToken();
      removeUserInfo();
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
