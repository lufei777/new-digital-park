// import PurchaseManageIndex from '../pages/purchaseManage/index'
import PurchaseApplication from '../pages/purchaseManage/purchaseApplication'
import PurchaseOrder from '../pages/purchaseManage/purchaseOrder'
import PurchaseReturns from '../pages/purchaseManage/purchaseReturns'

export default [{
    path: '/',
    redirect: '/purchaseApplication',
    meta: { title: '收支管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    children: [{
        path: '/purchaseApplication',
        name: 'PurchaseApplication',
        meta: { title: '采购申请' },
        component: PurchaseApplication,
    }, {
        path: '/purchaseOrder',
        name: 'PurchaseOrder',
        meta: { title: '采购订货' },
        component: PurchaseOrder,
    }, {
        path: '/purchaseReturns',
        name: 'PurchaseReturns',
        meta: { title: '采购退货' },
        component: PurchaseReturns,
    }]
}]
