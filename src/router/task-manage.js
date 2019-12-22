import TaskManageIndex from '../pages/taskManage/index'
import TaskOverview from '../pages/taskManage/taskOverview'
import NewTask from '../pages/taskManage/newTask'
import WaitTask from '../pages/taskManage/waitTask'
import AlreadyTask from '../pages/taskManage/alreadyTask'
export default [{
    path: '/',
    redirect: '/warehouseManage',
    meta: { title: '任务管理' },
    component: TaskManageIndex,
    children: [{
        path: '/taskOverview',
        name: 'TaskOverview',
        meta: { title: '任务概览' },
        component: TaskOverview,
    },{
        path: '/newTask',
        name: 'NewTask',
        meta: { title: '新建任务' },
        component: NewTask,
    },{
        path: '/waitTask',
        name: 'WaitTask',
        meta: { title: '待办任务' },
        component: WaitTask,
    },{
        path: '/alreadyTask',
        name: 'AlreadyTask',
        meta: { title: '已办任务' },
        component: AlreadyTask,
    }]
}]