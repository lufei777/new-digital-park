export default [{
    path: '/personalmanage',
    name: 'personalmanage',
    meta: { title: '人事管理' },
    // component: () => import('@/pages/commonProject/coms/commonIndex'),
    component: () => import('@/pages/personalManage'),
    redirect: '/addpersonal',
    children: [
        {
            path: '/addpersonal',
            name: 'addpersonal',
            meta: { title: '添加人员' },
            component: () => import('@/pages/personalManage/addPersonal')
        }
    ],
}]
