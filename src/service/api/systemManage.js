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

}

export default new SystemManage()

