export default [{
    path: '/revenueExpendManage',
    name: 'revenueExpendManage',
    meta: { title: '收支管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    redirect: '/incomeRecord?budgetType=0',
    children: [
        {
            path: '/incomeRecord',
            name: 'incomeRecord',
            meta: { title: '收入记录', budgetType: 0 },
            component: () => import('@/pages/revenueExpendManage/revenueRecord/revenuerecord')
        },
        {
            path: '/launchcharge',
            name: 'launchcharge',
            meta: { title: '发起记录' },
            component: () => import('@/pages/revenueExpendManage/revenueRecord/launchcharge')
        },
        {
            path: '/chargeManage',
            name: 'chargeManage',
            meta: { title: '收费管理' },
            component: () => import('@/pages/revenueExpendManage/expendRecord/chargeManage')
        },
        {
            path: '/expenditureRecord',
            name: 'expenditureRecord',
            meta: { title: '支出记录', budgetType: 1 },
            component: () => import('@/pages/revenueExpendManage/revenueRecord/revenuerecord')
            // component: () => import('@/pages/revenueExpendManage/expendRecord/expendrecord')
        },
        {
            path: '/expensesBudget',
            name: 'expensesBudget',
            meta: { title: '支出预算' },
            component: () => import('@/pages/revenueExpendManage/budgetManage/budgetmanage')
        },
        {
            path: '/statisticanalysis',
            name: 'statisticanalysis',
            meta: { title: '统计分析' },
            component: () => import('@/pages/revenueExpendManage/statisticAnalysis/statisticanalysis')
        },
        {
            path: '/reportManage',
            name: 'reportManage',
            meta: { title: '统计分析' },
            component: () => import('@/pages/revenueExpendManage/statisticAnalysis/reportManage')
        }
    ],
}]
