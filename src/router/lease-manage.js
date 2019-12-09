export default [{
    path: '/leasemanage',
    name: 'leasemanage',
    meta: { title: '租赁管理' },
    component: () => import('@/pages/leaseManage'),
    redirect: '/leasemanage/housepropertymanage',
    children: [{
        path: 'housepropertymanage',
        name: 'housepropertymanage',
        meta: { title: '房产管理' },
        component: () => import('@/pages/leaseManage/housePropertyManage')
    }, {
        path: 'addhouseproperty',
        name: 'addhouseproperty',
        meta: { title: '添加房产' },
        component: () => import('@/pages/leaseManage/addHouseProperty'),
    },{
        path: 'tenantManage',
        name: 'tenantManage',
        meta: { title: '租户管理' },
        component: () => import('@/pages/leaseManage/tenantManage'),
    },{
        path: '/addTenantManage',
        name: 'addTenantManage',
        meta: { title: '编辑租户' },
        component: () => import('@/pages/leaseManage/addTenantManage'),
    }],
}]