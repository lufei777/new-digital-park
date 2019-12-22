import CleaningManageIndex from '../pages/cleaningManage/index'
import CleaningRecord from '../pages/cleaningManage/cleaningRecord'
import TaskSet from '../pages/cleaningManage/taskSet'
import RegionSet from '../pages/cleaningManage/regionSet'
import AssessmentManage from '../pages/cleaningManage/assessmentManage'
import AeportManage from '../pages/cleaningManage/reportManage'
export default [{
    path: '/',
    redirect: '/cleaningRecord',
    meta: { title: '保洁管理' },
    component: CleaningManageIndex,
    children: [{
        path: '/cleaningRecord',
        name: 'CleaningRecord',
        meta: { title: '保洁记录' },
        component: CleaningRecord,
    },{
        path: '/taskSet',
        name: 'TaskSet',
        meta: { title: '任务设定' },
        component: TaskSet,
    },{
        path: '/regionSet',
        name: 'RegionSet',
        meta: { title: '区域设定' },
        component: RegionSet,
    },{
        path: '/assessmentManage',
        name: 'AssessmentManage',
        meta: { title: '考核管理' },
        component: AssessmentManage,
    },{
        path: '/aeportManage',
        name: 'AeportManage',
        meta: { title: '报表管理' },
        component: AeportManage,
    }]
}]
