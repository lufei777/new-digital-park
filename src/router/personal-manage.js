export default [{
    path: '/personalmanage',
    name: 'personalmanage',
    meta: { title: '人事管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    // component: () => import('@/pages/personalManage'),
    redirect: '/personalmanageinfo',
    children: [
        {
            path: '/personalmanageinfo',
            name: 'personalmanageinfo',
            meta: { title: '人员信息' },
            component: () => import('@/pages/personalManage/personalManage')
        },
        {
            path: '/addpersonal',
            name: 'addpersonal',
            meta: { title: '人员维护' },
            component: () => import('@/pages/personalManage/addPersonal')
        }
    ],
}]
