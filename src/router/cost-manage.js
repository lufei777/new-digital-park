import CostManageIndex from '../pages/costManage/index'
import CostDeclare from '../pages/costManage/costDeclare'
import BudgetManage from '../pages/costManage/budgetManage'
import InvoiceManage from '../pages/costManage/invoiceManage'

export default [{
    path: '/',
    redirect: '/cleaningRecord',
    meta: { title: '费用管理' },
    component: CostManageIndex,
    children: [{
        path: '/costDeclare',
        name: 'CostDeclare',
        meta: { title: '费用申报' },
        component: CostDeclare,
    },{
        path: '/budgetManage',
        name: 'BudgetManage',
        meta: { title: '预算管理' },
        component: BudgetManage,
    },{
        path: '/invoiceManage',
        name: 'InvoiceManage',
        meta: { title: '发票管理' },
        component: InvoiceManage,
    }]
}]
