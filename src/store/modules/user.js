import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { constantRoutes, resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {},
  routes: constantRoutes
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },

  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },

  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  async login({ commit }, data) {
    const token = await login(data)
    commit('setToken', token)
  },

  async getUserInfo({ commit }) {
    const result = await getUserInfo()
    commit('setUserInfo', result)
    return result
  },

  logout({ commit }) {
    commit('removeToken')
    commit('setUserInfo', {})
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
