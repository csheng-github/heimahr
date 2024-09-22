const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  /* 自定义全局变量 */
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  avatar: state => state.user.userInfo.staffPhoto,
  name: state => state.user.userInfo.username,
  routes: state => state.user.routes
}
export default getters
