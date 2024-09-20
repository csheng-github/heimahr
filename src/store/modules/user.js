import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken()
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}

const actions = {
  async login({ commit }, data) {
    const token = await login(data)
    commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
