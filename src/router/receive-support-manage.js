// import ReceiveSupportManageIndex from '../pages/receiveSupportManage/index'
import IncomeRecord from '../pages/receiveSupportManage/IncomeRecord'
import ChargeManage from '../pages/receiveSupportManage/chargeManage'
import ExpensesBudget from '../pages/receiveSupportManage/expensesBudget'
import PayApplication from '../pages/receiveSupportManage/payApplication'
import ExpenditureRecord from '../pages/receiveSupportManage/expenditureRecord'
import ReportManage from '../pages/receiveSupportManage/reportManage'

export default [{
    path: '/',
    redirect: '/cleaningRecord',
    meta: { title: '收支管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    children: [{
        path: '/incomeRecord',
        name: 'IncomeRecord',
        meta: { title: '收入记录' },
        component: IncomeRecord,
    }, {
        path: '/chargeManage',
        name: 'ChargeManage',
        meta: { title: '收费管理' },
        component: ChargeManage,
    }, {
        path: '/expensesBudget',
        name: 'ExpensesBudget',
        meta: { title: '支出预算' },
        component: ExpensesBudget,
    }, {
        path: '/payApplication',
        name: 'PayApplication',
        meta: { title: '支付申请' },
        component: PayApplication,
    }, {
        path: '/expenditureRecord',
        name: 'ExpenditureRecord',
        meta: { title: '支出记录' },
        component: ExpenditureRecord,
    }, {
        path: '/reportManage',
        name: 'ReportManage',
        meta: { title: '报表管理' },
        component: ReportManage,
    }]
}]
