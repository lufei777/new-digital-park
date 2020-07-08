import {get, post, put, url,} from '../axios/ApiDecorator'

class SystemManage {
  //部门树
  @url('/oaApi/dept/tree')
  @get
  getDepartmentTree() {}

  //人员列表
  @url("/oaApi/user/listBy")
  @get
  listBy() {}

  //获取当前登录用户
  @url("/oaApi/user/getNowUser")
  @get
  getUserInfo() {}

  //登录
  @url('/oaApi/user/mobileLogin')
  @post
  login() {}

  //修改密码
  @url('/oaApi/user/password')
  @put
  modifyPwd() {}

  //修改用户信息
  @url('/oaApi/user')
  @put
  editPersonInformation() {}

  //退出登录
  @url('/oaApi/user/logout')
  @get
  logOut() {}

  //获取部门+人员
  @url("/oaApi/dept/treeUser")
  @get
  getDeptUserTree() {}

  @url("/user-service/role/list")
  @get
  getRoleList() {}

  @url("/user-service/role/addRole")
  @post
  addRole(){}

  @url("/user-service/role/editRole")
  @post
  editRole(){}

  @url("/user-service/role/removeRole")
  @get
  deleteRole(){}

  @url("/user-service/role/assignRole")
  @post
  assignRole(){}

  @url("/user-service/role/details")
  @get
  getRoleDetail(){}

  @url("/user-service/user/listInfo")
  @get
  getUserList(){}

  @url("/user-service/user/addUser")
  @post
  addUser(){}

  @url("/user-service/user/updateUser")
  @post
  updateUser(){}

  @url("/user-service/user/userDetail")
  @get
  getUserDetail(){}

  @url("/user-service/user/removeUser")
  @get
  deleteUser(){}

  @url("/user-service/dept/addDept")
  @post
  addDept(){}

  @url("/user-service/dept/editDept")
  @post
  editDept(){}

  @url("/user-service/dept")
  @get
  getDeptDetail(){}

  @url("/user-service/dept/lists")
  @get
  getDeptList(){}

  @url("/user-service/dept/removeDept")
  @get
  deleteDept(){}

  @url("/user-service/menu/menuList")
  @get
  getMenuList(){}

  @url("/user-service/menu/addMenu")
  @post
  addMenu(){}

  @url("/user-service/menu/menuDetail")
  @get
  getMenuDetail(){}

  @url("/user-service/menu/editMenu")
  @post
  editMenu(){}

  @url("/user-service/permission/permissionList")
  @get
  getPermissionList(){}
}

export default new SystemManage()

