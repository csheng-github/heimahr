import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { constantRoutes, resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {},
  routes: constantRoutes
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  REMOVE_TOKEN(state) {
    state.token = null
    removeToken()
  },

  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },

  SET_ROUTES(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  async login({ commit }, data) {
    const token = await login(data)
    commit('SET_TOKEN', token)
  },

  async getUserInfo({ commit }) {
    const result = await getUserInfo()
    commit('SET_USER_INFO', result)
    return result
  },

  logout({ commit }) {
    commit('REMOVE_TOKEN')
    commit('SET_USER_INFO', {})
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
