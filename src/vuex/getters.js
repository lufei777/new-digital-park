export default {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  menuTree: state => state.digitalPark.menuTree,  // 总菜单
  roles: state => state.digitalPark.roles,  // 用户权限
  pageRoles: state => state.digitalPark.pageRoles,  // 用户当前页面权限
  privateRouters: state => state.digitalPark.privateRouters   // 私有路由
}
