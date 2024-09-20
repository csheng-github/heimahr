import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
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
  },

  logout({ commit }) {
    commit('removeToken')
    commit('setUserInfo', {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
