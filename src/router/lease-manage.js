export default [{
    path: '/leasemanage',
    name: 'leasemanage',
    meta: { title: '租赁管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    redirect: '/housepropertymanage',
    children: [{
        path: '/housepropertymanage',
        name: 'housepropertymanage',
        meta: { title: '房产管理' },
        component: () => import('@/pages/leaseManage/houseManage/housePropertyManage')
    }, {
        path: '/bulkimporthouseproperty',
        name: 'bulkimporthouseproperty',
        meta: { title: '导入房产' },
        component: () => import('@/pages/leaseManage/houseManage/bulkImportHouseProperty'),
    }, {
        path: '/editHouseProperty',
        name: 'editHouseProperty',
        meta: { title: '房产维护' },
        component: () => import('@/pages/leaseManage/houseManage/editHouseProperty'),
    }, {
        path: '/tenantManage',
        name: 'tenantManage',
        meta: { title: '租户管理' },
        component: () => import('@/pages/leaseManage/`tenantManage`/tenantList'),
    }, {
        path: '/addTenantManage',
        name: 'addTenantManage',
        meta: { title: '编辑租户' },
        component: () => import('@/pages/leaseManage/tenantManage/addTenant'),
    }, {
        path: '/leaseContract',
        name: 'leaseContract',
        meta: { title: '租赁合同' },
        component: () => import('@/pages/leaseManage/leaseContract/leaseContract'), 
    }, {
        path: '/billManage',
        name: 'billManage',
        meta: { title: '账单管理' },
        component: () => import('@/pages/leaseManage/billManage/billManage'),
    }],
}]
