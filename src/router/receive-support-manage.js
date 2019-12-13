import ReceiveSupportManageIndex from '../pages/receiveSupportManage/index'
import IncomeRecord from '../pages/receiveSupportManage/IncomeRecord'
import ChargeManage from '../pages/receiveSupportManage/chargeManage'
import ExpensesBudget from '../pages/receiveSupportManage/expensesBudget'

export default [{
    path: '/',
    redirect: '/cleaningRecord',
    meta: { title: '收支管理' },
    component: ReceiveSupportManageIndex,
    children: [{
        path: '/incomeRecord',
        name: 'IncomeRecord',
        meta: { title: '收入记录' },
        component: IncomeRecord,
    },{
        path: '/chargeManage',
        name: 'ChargeManage',
        meta: { title: '收费管理' },
        component: ChargeManage,
    },{
        path: '/expensesBudget',
        name: 'ExpensesBudget',
        meta: { title: '支出预算' },
        component: ExpensesBudget,
    }]
}]
