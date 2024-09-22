const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  /* 登录标识 */
  token: state => state.user.token,
  /* 用户信息 */
  userId: state => state.user.userInfo.userId,
  avatar: state => state.user.userInfo.staffPhoto,
  name: state => state.user.userInfo.username,
  company: state => state.user.userInfo.company,
  departmentName: state => state.user.userInfo.departmentName,
  /* 路由 */
  routes: state => state.user.routes
}
export default getters
