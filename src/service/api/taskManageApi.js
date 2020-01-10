import { get, post, url } from '../axios/ApiDecorator'

class taskManageApi {

    @url("/oaApi/task/add")
    @post
    taskAdd() { }
    
    @url("/oaApi/task/list")
    @get
    taskList() { }

    @url('/oaApi/task/transferDept')
    @get
    transferDept(){}

    @url('/oaApi/task/homeTaskCount')
    @get
    homeTaskCount(){}

    @url("/oaApi/dept/tree")
    @get
    deptTreeList() { }

    @url("/oaApi/user/getNowUser")
    @get
    getNowUser() { }

    @url("/oaApi/user/listBy")
    @get
    listBy() { }

    @url("/oaApi/task/close")
    @get
    closeTask() { }

    @url("/oaApi/task/detail")
    @get
    detailTask() { }

}

export default new taskManageApi()
