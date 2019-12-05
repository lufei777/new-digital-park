export default [{
    path: '/leasemange',
    name: 'leasemange',
    meta: { title: '租赁管理' },
    component: () => import('@/pages/leaseManage'),
    redirect: '/leasemanage/housepropertymanage',
    children: [{
        path: '/leasemanage/housepropertymanage',
        name: 'housepropertymanage',
        meta: { title: '房产管理' },
        component: () => import('@/pages/leaseManage/housePropertyManage')
    }]
}]