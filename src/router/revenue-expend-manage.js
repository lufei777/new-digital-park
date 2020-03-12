export default [{
    path: '/revenueExpendManage',
    name: 'revenueExpendManage',
    meta: { title: '收支管理' },
    // component: () => import('@/pages/commonProject/coms/commonIndex'),
    component: () => import('@/pages/revenueExpendManage'),
    redirect: '/revenuerecord',
    children: [
        {
            path: '/revenuerecord',
            name: 'revenuerecord',
            meta: { title: '收入记录' },
            component: () => import('@/pages/revenueExpendManage/revenuerecord')
        },
        {
            path: '/launchcharge',
            name: 'launchcharge',
            meta: { title: '发起收费' },
            component: () => import('@/pages/revenueExpendManage/launchcharge')
        },
        {
            path: '/expendrecord',
            name: 'expendrecord',
            meta: { title: '支出记录' },
            component: () => import('@/pages/revenueExpendManage/expendrecord')
        },
        {
            path: '/budgetmanage',
            name: 'budgetmanage',
            meta: { title: '预算管理' },
            component: () => import('@/pages/revenueExpendManage/budgetmanage')
        },
        {
            path: '/statisticanalysis',
            name: 'statisticanalysis',
            meta: { title: '统计分析' },
            component: () => import('@/pages/revenueExpendManage/statisticanalysis')
        }
    ],
}]
