import ContractManageIndex from '../pages/contractManage/index'
import ContractStatistics from '../pages/contractManage/contractStatistics'
import SignatureManage from '../pages/contractManage/signatureManage'
import TemplateManage from '../pages/contractManage/templateManage'
import ApprovalManage from '../pages/contractManage/approvalManage'
export default [{
    path: '/',
    redirect: '/contractStatistics',
    meta: { title: '合同管理' },
    component: ContractManageIndex,
    children: [{
        path: '/contractStatistics',
        name: 'ContractStatistics',
        meta: { title: '签章统计' },
        component: ContractStatistics,
    },{
        path: '/signatureManage',
        name: 'SignatureManage',
        meta: { title: '签章管理' },
        component: SignatureManage,
    },{
        path: '/templateManage',
        name: 'TemplateManage',
        meta: { title: '模板管理' },
        component: TemplateManage,
    },{
        path: '/approvalManage',
        name: 'ApprovalManage',
        meta: { title: '审批管理' },
        component: ApprovalManage,
    }]
}]
