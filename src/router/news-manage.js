export default [
    {
        path: '/news',
        name: 'news',
        component: () => import('@/pages/commonProject/coms/commonIndex'),
        // component: () => import('@/pages/newsManage'),
        children: [
            {
                // 预警报警列表
                path: 'warningalarmlist',
                name: 'warningAlarmList',
                component: () => import('@/pages/newsManage/warningAlarmList')
            }
        ]
    }
]