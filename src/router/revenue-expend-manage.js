export default [{
    path: '/revenueExpendManage',
    name: 'revenueExpendManage',
    meta: { title: '收支管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    redirect: '/incomeRecord',
    children: [
        {
            path: '/incomeRecord',
            name: 'incomeRecord',
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
            path: '/chargeManage',
            name: 'ChargeManage',
            meta: { title: '收费管理' },
            component: () => import('@/pages/revenueExpendManage/chargeManage')
        },
        {
            path: '/expenditureRecord',
            name: 'expenditureRecord',
            meta: { title: '支出记录' },
            component: () => import('@/pages/revenueExpendManage/expendrecord')
        },
        {
            path: '/expensesBudget',
            name: 'expensesBudget',
            meta: { title: '支出预算' },
            component: () => import('@/pages/revenueExpendManage/budgetmanage')
        },
        {
            path: '/statisticanalysis',
            name: 'statisticanalysis',
            meta: { title: '统计分析' },
            component: () => import('@/pages/revenueExpendManage/statisticanalysis')
        },
        {
            path: '/reportManage',
            name: 'reportManage',
            meta: { title: '统计分析' },
            component: () => import('@/pages/revenueExpendManage/reportManage')
        }
    ],
}]
