import { get, post, url } from '../axios/ApiDecorator'

class SystemManage {
    //部门树
    @url('/oaApi/dept/tree')
    @get
    getDepartmentTree() { }

    //人员列表
    @url("/oaApi/user/listBy")
    @get
    listBy() { }

    //获取当前登录用户
    @url("/oaApi/user/getNowUser")
    @get
    getUserInfo() { }

    //登录
    @url('/oaApi/user/mobileLogin')
    @post
    login() { }

    //修改密码
    @url('/oaApi/user/password')
    @put
    modifyPwd() { }

    //修改用户信息
    @url('/oaApi/user')
    @put
    editPersonInformation() { }

    //退出登录
    @url('/oaApi/user/logout')
    @get
    logOut() { }

}

export default new SystemManage()

