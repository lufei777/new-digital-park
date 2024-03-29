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
    transferDept() { }

    @url('/oaApi/task/homeTaskCount')
    @get
    homeTaskCount() { }

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
    @post
    closeTask() { }

    @url("/oaApi/task/detail")
    @get
    detailTask() { }

    //接单、退单、转派、撤回工单
    @url("/oaApi/task/dealTask")
    @post
    dealTask() { }

    //完成
    @url("/oaApi/task/completeTask")
    @post
    completeTask() { }

    //工单流转情况记录查询
    @url("/oaApi/task/operateLogList")
    @get
    operateLogList() { }

    @url("/oaApi/task/addTempTask")
    @post
    addTempTask() { }

    @url("/oaApi/task/findTempTask")
    @get
    findTempTask() { }

    @url("/oaApi/taskStatistics/taskNumber")
    @get
    getTaskNumber() { }

    @url("/oaApi/taskStatistics/taskTypeStatistics")
    @get
    getTaskTypeStatistics() { }

    @url("/oaApi/taskStatistics/deptTask")
    @get
    getdeptTaskStatistics() { }

    @url("/oaApi/taskStatistics/taskStatus")
    @get
    getTaskStatus() { }

    @url("/oaApi/taskStatistics/taskNumRanking")
    @get
    getTaskNumRanking() { }

    @url("/oaApi/taskStatistics/taskNumbers")
    @get
    getPersonalTaskRanking() { }

    @url("/vibe-web/spacemodel/findDevice")
    @get
    getFindDevice() { }

    @url('/oaApi/task/taskTypeList')
    @get
    getTaskTypeList() { }

    @url('/oaApi/taskStatistics/taskLinkRatio')
    @get
    getTaskLinkRatio() { }

    @url('/oaApi/task/cancelHold')
    @post
    getCancelHold() { }

    @url('/oaApi/task/dispatch')
    @post
    taskDispatch() { }
}

export default new taskManageApi()
